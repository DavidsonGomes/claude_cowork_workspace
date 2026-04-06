#!/usr/bin/env python3
"""
Servidor local do Dashboard Saúde.
Permite salvar check-ins e metas diretamente pelo navegador.

Uso:
    python3 server.py
    (ou double-click em start.sh)

Depois abra: http://localhost:8765/dashboard.html
"""
import json
import os
import re
import subprocess
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "data", "health-data.js")
CHECKINS_DIR = os.path.join(BASE_DIR, "data", "checkins")
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765


# ── Leitura / escrita do health-data.js ──────────────────────────────────────

def read_data():
    """
    Lê health-data.js usando Node.js — suporta sintaxe JS nativa
    (chaves sem aspas, comentários //, etc).
    Após o primeiro save, o arquivo fica em JSON puro e Python consegue ler direto.
    """
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        content = f.read()
    idx = content.index("const HEALTH_DATA")
    header = content[:idx]

    # Tenta primeiro com Python JSON (funciona após o primeiro save)
    try:
        js_body = content[idx:]
        match = re.search(r"const HEALTH_DATA\s*=\s*", js_body)
        json_str = js_body[match.end():].rstrip().rstrip(";")
        return json.loads(json_str), header
    except Exception:
        pass

    # Fallback: usa Node.js para parsear sintaxe JS nativa
    node_script = f"""
const fs = require('fs');
const code = fs.readFileSync({json.dumps(DATA_FILE)}, 'utf8');
const fn = new Function(code + '\\nreturn HEALTH_DATA;');
process.stdout.write(JSON.stringify(fn()));
"""
    result = subprocess.run(
        ["node", "-e", node_script],
        capture_output=True, text=True, cwd=BASE_DIR
    )
    if result.returncode != 0:
        raise RuntimeError(f"Node.js parse error: {result.stderr}")
    return json.loads(result.stdout), header


def write_data(data, header):
    """Escreve de volta como JSON válido — próximas leituras funcionam direto no Python."""
    body = json.dumps(data, indent=2, ensure_ascii=False)
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(header + "const HEALTH_DATA = " + body + ";\n")


# ── Handler HTTP ──────────────────────────────────────────────────────────────

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def log_message(self, fmt, *args):
        status = args[1] if len(args) > 1 else "?"
        path = args[0] if args else "?"
        print(f"  [{status}] {path}")

    def send_json(self, payload, code=200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def do_GET(self):
        if self.path == "/":
            self.send_response(301)
            self.send_header("Location", "/dashboard.html")
            self.end_headers()
            return
        super().do_GET()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        if self.path != "/api/save":
            self.send_response(404)
            self.end_headers()
            return

        try:
            length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(length).decode("utf-8"))
            data, header = read_data()
            action = body.get("_action", "")

            # ── Salvar check-in (novo ou atualização) ────────────────────────
            if action in ("update_checkin", "new_checkin"):
                date = body["date"]
                patch = {k: v for k, v in body.items() if not k.startswith("_")}

                existing_idx = next(
                    (i for i, c in enumerate(data["checkins"]) if c["date"] == date),
                    None
                )
                if existing_idx is not None:
                    data["checkins"][existing_idx] = patch
                else:
                    data["checkins"].append(patch)
                    data["checkins"].sort(key=lambda x: x["date"])

                # Também salva o arquivo individual do check-in
                os.makedirs(CHECKINS_DIR, exist_ok=True)
                ci_file = os.path.join(CHECKINS_DIR, f"{date}.json")
                with open(ci_file, "w", encoding="utf-8") as f:
                    json.dump(patch, f, indent=2, ensure_ascii=False)

                data["meta"]["updated"] = date
                print(f"  → Check-in {date} salvo ({action})")

            # ── Atualizar metas ───────────────────────────────────────────────
            elif action == "update_goals":
                pid = body["pessoa"]
                data["pessoas"][pid]["goals"]["fat_pct_target"] = body.get("fat_pct_target")
                data["pessoas"][pid]["goals"]["fat_pct_intermediate"] = body.get("fat_pct_intermediate")
                print(f"  → Metas de {pid} salvas")

            # ── Salvar novo exame ─────────────────────────────────────────────
            elif action == "new_exam":
                pid = body["person"]
                exam = body["exam"]
                if "exams" not in data:
                    data["exams"] = {}
                if pid not in data["exams"]:
                    data["exams"][pid] = []
                data["exams"][pid].append(exam)
                data["exams"][pid].sort(key=lambda x: x["date"])
                data["meta"]["updated"] = exam["date"]
                print(f"  → Exame '{exam['label']}' de {pid} salvo ({exam['date']})")

            # ── Atualizar exame existente ─────────────────────────────────────
            elif action == "update_exam":
                pid = body["person"]
                idx = body["exam_index"]
                exam = body["exam"]
                if "exams" not in data:
                    data["exams"] = {}
                if pid not in data["exams"] or idx >= len(data["exams"][pid]):
                    self.send_json({"ok": False, "error": f"Exame {idx} não encontrado para {pid}"}, 400)
                    return
                data["exams"][pid][idx] = exam
                data["exams"][pid].sort(key=lambda x: x["date"])
                data["meta"]["updated"] = exam["date"]
                print(f"  → Exame '{exam['label']}' de {pid} atualizado ({exam['date']})")

            # ── Atualizar próximos exames ─────────────────────────────────────
            elif action == "update_upcoming":
                pid = body["person"]
                if "upcoming_exams" not in data:
                    data["upcoming_exams"] = {}
                data["upcoming_exams"][pid] = body["upcoming_exams"]
                print(f"  → Próximos exames de {pid} atualizados ({len(body['upcoming_exams'])} itens)")

            # ── Atualizar alertas clínicos ────────────────────────────────────
            elif action == "update_alerts":
                pid = body["person"]
                if "clinical_alerts" not in data:
                    data["clinical_alerts"] = {}
                data["clinical_alerts"][pid] = body["clinical_alerts"]
                print(f"  → Alertas de {pid} atualizados ({len(body['clinical_alerts'])} itens)")

            # ── Atualizar prescrições ─────────────────────────────────────────
            elif action == "update_prescriptions":
                pid = body["person"]
                if "prescriptions" not in data:
                    data["prescriptions"] = {}
                data["prescriptions"][pid] = body["prescriptions"]
                print(f"  → Prescrições de {pid} atualizadas ({len(body['prescriptions'])} itens)")

            else:
                self.send_json({"ok": False, "error": f"Ação desconhecida: {action}"}, 400)
                return

            write_data(data, header)
            self.send_json({"ok": True, "action": action})

        except Exception as e:
            import traceback
            traceback.print_exc()
            self.send_json({"ok": False, "error": str(e)}, 500)


# ── Entrypoint ────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print(f"\n✅  Dashboard Saúde — servidor iniciado")
    print(f"    Abra no navegador: http://localhost:{PORT}/dashboard.html")
    print(f"    Ctrl+C para parar\n")
    try:
        host = os.environ.get("HOST", "localhost")
        HTTPServer((host, PORT), Handler).serve_forever()
    except KeyboardInterrupt:
        print("\n  Servidor encerrado.")
