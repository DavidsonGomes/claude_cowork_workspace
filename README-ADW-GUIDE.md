# 🤖 Guia Prático: Criando ADWs com Claude Code CLI

> **"Código determinístico orquestrando agentes não-determinísticos — o maior ponto de alavancagem da engenharia agêntica."**
> — TAC Lição 14

**Baseado em:** Curso Tactical Agentic Coding (Lições 1-14)
**Autor:** Davidson Gomes
**Versão:** 1.0

---

## 📖 O Que É um ADW?

**ADW (AI Developer Workflow)** é um script programático (Python, Shell, TypeScript) que orquestra o Claude Code CLI para executar tarefas de desenvolvimento **sem intervenção humana**.

```
Você (1 toque) → ADW (Python) → Claude Code CLI → Agentes → Feature Completa
```

### Por Que ADWs São o Maior Ponto de Alavancagem?

| Abordagem | Toques | Produtividade | Paradigma |
|-----------|--------|---------------|-----------|
| **In-Loop** (terminal) | 10+ | 1x | Você conversa com o agente |
| **Out-Loop** (ADW) | 2 | 3-5x | Você dispara, agente trabalha, você revisa |
| **ZTE** (Webhook + ADW) | 1 | 10x+ | Issue → Feature pronta automaticamente |

**ADWs vivem na Classe 2 (Out-Loop)** — o ponto onde você sai do loop e deixa agentes trabalharem autonomamente.

---

## 🏗️ Arquitetura de um Projeto com ADW

```
meu-projeto/
├── .claude/
│   ├── commands/                # Slash Commands (prompts reutilizáveis)
│   │   └── drk/                 # Namespace de comandos
│   │       ├── drk-plan.md          # /drk:drk-plan — Agente de Planejamento
│   │       ├── drk-implement.md     # /drk:drk-implement — Agente de Implementação
│   │       ├── drk-verify.md        # /drk:drk-verify — Agente de Verificação
│   │       ├── drk-deploy.md        # /drk:drk-deploy — Agente de Deploy
│   │       ├── drk-test-cases.md    # /drk:drk-test-cases — Agente de Testes
│   │       ├── drk-discover.md      # /drk:drk-discover — Agente de Discovery
│   │       └── drk-orchestrator.md  # /drk:drk-orchestrator — Orquestrador
│   ├── skills/                  # Skills customizadas
│   │   └── linear/              # Exemplo: integração com Linear
│   │       ├── SKILL.md
│   │       ├── scripts/
│   │       └── metadata.json
│   └── CLAUDE.md                # Contexto global do projeto
├── ADWs/                        # AI Developer Workflows (scripts Python)
│   ├── sdk/
│   │   └── core_agent.py        # Wrapper do Claude SDK
│   ├── simple/
│   │   └── plan_build.py        # Workflow básico (Plan → Build)
│   ├── workflows/
│   │   ├── plan_build_review_fix.py  # Workflow production-ready
│   │   └── full_feature_pipeline.py  # Pipeline full-stack
│   ├── agents/
│   │   └── planner_agent.py     # Agente especializado
│   ├── utils/
│   │   └── validation.py        # Linting, testes, type check
│   └── webhooks/
│       └── github_webhook.py    # Trigger via GitHub events
├── specs/                       # Planos e specs geradas
├── docs/
│   ├── plans/                   # Design docs gerados
│   └── agenda/                  # Agendas de implementação
└── src/                         # Código-fonte do projeto
```

---

## 🧩 Os 3 Pilares: Commands, Skills e ADWs

### 1. Slash Commands (`.claude/commands/`)

**O que são:** Prompts Markdown reutilizáveis que definem o comportamento de agentes especializados.

**Como criar:**

```markdown
<!-- .claude/commands/meu-comando.md -->
---
name: meu-comando
description: Descrição do que o agente faz
arguments:
  - name: task
    description: A tarefa a executar
    required: true
---

# Título do Agente

Você é um agente especializado em [X]. Sua função é [Y].

## Input
$ARGUMENTS

## Instruções
1. Faça isso
2. Depois aquilo
3. Valide o resultado

## Regras
- FAÇA: [coisas que deve fazer]
- NÃO FAÇA: [coisas que não deve fazer]

## Output Format
```output
[formato esperado]
```​
```

**Como usar no CLI:**

```bash
# Interativo (no terminal do Claude Code)
/meu-comando Implementar autenticação OAuth

# Com namespace
/drk:drk-plan Criar dashboard de analytics
```

**Exemplo real do template DRK:**

| Comando | Propósito | Uso |
|---------|-----------|-----|
| `/drk:drk-plan` | Criar design doc + agenda de implementação | Planejamento profundo |
| `/drk:drk-implement` | Executar plano passo a passo com tracking | Implementação |
| `/drk:drk-verify` | Verificar changes (lint, types, tests, visual) | Validação |
| `/drk:drk-deploy` | Commit + push com mensagem auto-gerada | Deploy |
| `/drk:drk-test-cases` | Gerar test cases paranoicos | QA |
| `/drk:drk-orchestrator` | Coordenar todo o ciclo Plan→Build→Verify→Deploy | Orquestração |

---

### 2. Skills (`.claude/skills/`)

**O que são:** Capacidades mais complexas com scripts, referências e metadata — ferramentas que estendem o que o agente pode fazer.

**Estrutura:**

```
.claude/skills/
└── minha-skill/
    ├── SKILL.md           # Documentação e instruções
    ├── metadata.json      # Configuração da skill
    ├── reference.md       # Referência de API/uso
    ├── examples.md        # Exemplos de uso
    └── scripts/           # Scripts executáveis
        ├── create.ts
        ├── list.ts
        └── update.ts
```

**Exemplo — Skill de integração Linear:**

```json
// metadata.json
{
  "name": "linear",
  "description": "Gerencia issues, teams e workflows no Linear",
  "version": "1.0.0",
  "tools": ["issues", "comments", "labels", "status"]
}
```

```markdown
<!-- SKILL.md -->
# Linear Skill

Gerencia issues e workflows do Linear diretamente do Claude Code.

## Uso
- Criar issues: `skill:linear create-issue "título" --team ENG`
- Listar issues: `skill:linear list-issues --status "In Progress"`
- Atualizar status: `skill:linear update-status ISSUE-123 "Done"`
```

---

### 3. ADWs — AI Developer Workflows (`ADWs/`)

**O que são:** Scripts Python/Shell que chamam o Claude Code CLI programaticamente, orquestrando múltiplos agentes em sequência.

**O conceito central:**

```
Código Determinístico (Python)
    ├── Controle total do fluxo
    ├── Logging, retry, error handling
    ├── Validação entre etapas
    └── Orquestra agentes não-determinísticos (Claude)
```

---

## 🚀 Construindo Seu Primeiro ADW

### Nível 1: ADW Básico (Plan → Build)

O workflow mais simples — 2 passos.

```python
#!/usr/bin/env python3
"""
ADW Básico: Plan → Build
Classe 2, Grade 1 (TAC Lição 14)
"""

import subprocess
import os
import json
from datetime import datetime

class SimpleADW:
    def __init__(self, project_path: str):
        self.project_path = project_path
        self.logs_dir = os.path.join(project_path, "logs")
        os.makedirs(self.logs_dir, exist_ok=True)

    def run_claude(self, prompt: str, log_name: str = None) -> dict:
        """Executa Claude Code CLI programaticamente."""
        cmd = [
            "claude",
            "--print",              # Modo não-interativo, imprime resultado
            "--dangerously-skip-permissions",  # Sem prompts de permissão
            prompt
        ]

        timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")

        try:
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                cwd=self.project_path,
                timeout=300  # 5 min timeout
            )

            output = {
                "success": result.returncode == 0,
                "stdout": result.stdout,
                "stderr": result.stderr,
                "returncode": result.returncode
            }

            # Salva log
            if log_name:
                log_path = os.path.join(self.logs_dir, f"{timestamp}-{log_name}.log")
                with open(log_path, "w") as f:
                    f.write(f"TIMESTAMP: {timestamp}\n")
                    f.write(f"PROMPT: {prompt[:200]}...\n\n")
                    f.write(f"STDOUT:\n{result.stdout}\n\n")
                    f.write(f"STDERR:\n{result.stderr}\n")
                print(f"📝 Log salvo: {log_path}")

            return output

        except subprocess.TimeoutExpired:
            return {"success": False, "error": "Timeout após 5 minutos"}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def execute(self, task_description: str):
        """Executa workflow Plan → Build."""
        print(f"\n{'='*60}")
        print(f"🚀 ADW: Plan → Build")
        print(f"📋 Task: {task_description}")
        print(f"{'='*60}\n")

        # STEP 1: PLAN
        print("📐 Step 1: Planejamento...")
        plan_result = self.run_claude(
            prompt=f"""Analise a seguinte tarefa e crie um plano técnico detalhado
            de implementação em specs/plan.md:

            TASK: {task_description}

            O plano deve incluir:
            - Análise do contexto atual do projeto
            - Arquivos a criar/modificar
            - Dependências necessárias
            - Passos de implementação ordenados
            - Critérios de validação""",
            log_name="plan"
        )

        if not plan_result["success"]:
            print(f"❌ Planejamento falhou: {plan_result.get('error', plan_result.get('stderr'))}")
            return

        print("✅ Plano criado com sucesso!")

        # STEP 2: BUILD
        print("\n🔨 Step 2: Implementação...")
        build_result = self.run_claude(
            prompt=f"""Leia o plano em specs/plan.md e implemente TUDO que está descrito.

            Siga o plano exatamente:
            - Implemente cada passo na ordem
            - Crie todos os arquivos listados
            - Adicione testes para cada módulo
            - Valide que tudo compila/funciona""",
            log_name="build"
        )

        if build_result["success"]:
            print("✅ Implementação concluída!")
        else:
            print(f"❌ Implementação falhou: {build_result.get('error', build_result.get('stderr'))}")

        print(f"\n{'='*60}")
        print("📊 Workflow concluído!")
        print(f"{'='*60}")


# USO
if __name__ == "__main__":
    adw = SimpleADW(project_path="/caminho/do/projeto")
    adw.execute("Criar endpoint REST de autenticação com JWT")
```

---

### Nível 2: ADW Production-Ready (Plan → Build → Review → Fix)

Adiciona **loop de validação e auto-fix** — o agente testa e corrige até passar.

```python
#!/usr/bin/env python3
"""
ADW Production-Ready: Plan → Build → Review → Fix Loop
Classe 2, Grade 3 (TAC Lição 14)
"""

import subprocess
import os
from datetime import datetime


class ProductionADW:
    def __init__(self, project_path: str):
        self.project_path = project_path
        self.logs_dir = os.path.join(project_path, "logs")
        self.max_fix_rounds = 5
        os.makedirs(self.logs_dir, exist_ok=True)

    def run_claude(self, prompt: str, log_name: str = None, timeout: int = 300) -> dict:
        """Executa Claude Code CLI com logging."""
        cmd = ["claude", "--print", "--dangerously-skip-permissions", prompt]
        timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")

        try:
            result = subprocess.run(
                cmd, capture_output=True, text=True,
                cwd=self.project_path, timeout=timeout
            )
            output = {
                "success": result.returncode == 0,
                "stdout": result.stdout,
                "stderr": result.stderr
            }
            if log_name:
                log_path = os.path.join(self.logs_dir, f"{timestamp}-{log_name}.log")
                with open(log_path, "w") as f:
                    f.write(f"PROMPT: {prompt[:500]}\n\nSTDOUT:\n{result.stdout}\n\nSTDERR:\n{result.stderr}")
            return output
        except subprocess.TimeoutExpired:
            return {"success": False, "stdout": "", "stderr": "Timeout"}
        except Exception as e:
            return {"success": False, "stdout": "", "stderr": str(e)}

    def validate_build(self) -> dict:
        """Roda validações automatizadas (lint, types, tests)."""
        checks = {}
        commands = {
            "typecheck": "npx tsc --noEmit",
            "lint": "npx eslint src/ --quiet",
            "tests": "npx jest --passWithNoTests --ci"
        }
        for name, cmd in commands.items():
            try:
                result = subprocess.run(
                    cmd.split(), capture_output=True, text=True,
                    cwd=self.project_path, timeout=120
                )
                checks[name] = {
                    "passed": result.returncode == 0,
                    "output": result.stdout + result.stderr
                }
            except Exception as e:
                checks[name] = {"passed": False, "output": str(e)}

        all_passed = all(c["passed"] for c in checks.values())
        return {"compiled": all_passed, "results": checks}

    def execute(self, task_description: str):
        """Executa workflow completo com loop de fix."""
        print(f"\n{'='*60}")
        print(f"🚀 ADW Production: Plan → Build → Review → Fix")
        print(f"📋 Task: {task_description}")
        print(f"{'='*60}\n")

        # STEP 1: PLAN
        print("📐 [1/3] Planejamento...")
        self.run_claude(
            prompt=f"Crie um plano técnico detalhado em specs/plan.md para: {task_description}",
            log_name="plan"
        )

        # STEP 2: BUILD
        print("🔨 [2/3] Implementação...")
        self.run_claude(
            prompt="Leia specs/plan.md e implemente tudo. Crie testes para cada módulo.",
            log_name="build",
            timeout=600
        )

        # STEP 3: REVIEW + FIX LOOP
        print("🔍 [3/3] Verificação + Auto-fix...")
        for attempt in range(1, self.max_fix_rounds + 1):
            print(f"\n  🔄 Round {attempt}/{self.max_fix_rounds}...")
            validation = self.validate_build()

            if validation["compiled"]:
                print(f"  ✅ Todas as validações passaram no round {attempt}!")
                break

            # Identifica o que falhou
            failures = {k: v for k, v in validation["results"].items() if not v["passed"]}
            failure_report = "\n".join(
                f"- {name}: {info['output'][:300]}" for name, info in failures.items()
            )

            print(f"  ❌ Falhas encontradas: {', '.join(failures.keys())}")

            if attempt == self.max_fix_rounds:
                print(f"\n🚨 Máximo de tentativas atingido. Revisão manual necessária.")
                break

            # FIX automático
            self.run_claude(
                prompt=f"""As seguintes validações falharam. Corrija TODOS os erros:

{failure_report}

Regras:
- Corrija apenas o que está quebrado
- Não adicione features novas
- Mantenha os testes existentes passando
- Rode as validações mentalmente antes de terminar""",
                log_name=f"fix-round-{attempt}"
            )

        print(f"\n{'='*60}")
        print("📊 Workflow concluído!")
        print(f"{'='*60}")


if __name__ == "__main__":
    adw = ProductionADW(project_path="/caminho/do/projeto")
    adw.execute("Criar sistema de notificações com WebSocket")
```

---

### Nível 3: ADW com Orquestrador (Múltiplas Tasks)

Usa o padrão do **DRK Orchestrator** — lê uma agenda e executa cada task pelo ciclo completo.

```python
#!/usr/bin/env python3
"""
ADW Orchestrator: Agenda → [Plan → Build → Verify → Deploy] por task
Classe 2/3 (TAC Lição 14)
"""

import subprocess
import os
import json
from datetime import datetime


class OrchestratorADW:
    def __init__(self, project_path: str):
        self.project_path = project_path
        self.logs_dir = os.path.join(project_path, "logs")
        self.max_verify_rounds = 5
        self.max_retry_cycles = 3
        os.makedirs(self.logs_dir, exist_ok=True)

    def run_claude(self, prompt: str, log_name: str = None, timeout: int = 300) -> dict:
        cmd = ["claude", "--print", "--dangerously-skip-permissions", prompt]
        timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        try:
            result = subprocess.run(
                cmd, capture_output=True, text=True,
                cwd=self.project_path, timeout=timeout
            )
            output = {"success": result.returncode == 0, "stdout": result.stdout, "stderr": result.stderr}
            if log_name:
                with open(os.path.join(self.logs_dir, f"{timestamp}-{log_name}.log"), "w") as f:
                    f.write(f"PROMPT:\n{prompt}\n\nSTDOUT:\n{result.stdout}\n\nSTDERR:\n{result.stderr}")
            return output
        except Exception as e:
            return {"success": False, "stdout": "", "stderr": str(e)}

    def run_command(self, command_name: str, args: str = "", log_name: str = None) -> dict:
        """Executa um slash command do Claude Code via CLI."""
        prompt = f"Execute o comando /{command_name} {args}"
        return self.run_claude(prompt, log_name)

    def create_worktree(self, task_id: str) -> str:
        """Cria git worktree isolado para a task."""
        worktree_path = os.path.join(self.project_path, f"../{os.path.basename(self.project_path)}-wt-{task_id}")
        subprocess.run(
            ["git", "worktree", "add", worktree_path, "HEAD"],
            cwd=self.project_path, capture_output=True
        )
        return worktree_path

    def remove_worktree(self, worktree_path: str):
        """Remove git worktree após conclusão."""
        subprocess.run(
            ["git", "worktree", "remove", worktree_path, "--force"],
            cwd=self.project_path, capture_output=True
        )

    def execute_task(self, task: dict) -> dict:
        """Executa o ciclo completo para uma task."""
        task_id = task["id"]
        task_name = task["name"]
        result = {"task_id": task_id, "status": "failed", "retries": 0, "verify_rounds": 0}

        print(f"\n  {'─'*50}")
        print(f"  📌 Task {task_id}: {task_name}")
        print(f"  {'─'*50}")

        # 1. PLAN
        print(f"  📐 Plan...")
        self.run_claude(
            f"Crie um plano detalhado para: {task_name}. Salve em specs/plan-{task_id}.md",
            log_name=f"task-{task_id}-plan"
        )

        # 2. TEST CASES
        print(f"  🧪 Test Cases...")
        self.run_claude(
            f"Gere test cases abrangentes para: {task_name}. Salve em docs/test-cases/{task_id}.md",
            log_name=f"task-{task_id}-tests"
        )

        # 3. DISCOVERY + IMPLEMENT + VERIFY (com retry)
        for cycle in range(1, self.max_retry_cycles + 1):
            result["retries"] = cycle

            # DISCOVERY
            print(f"  🔍 Discovery (ciclo {cycle})...")
            self.run_claude(
                f"Leia specs/plan-{task_id}.md e identifique todo o contexto necessário para implementação.",
                log_name=f"task-{task_id}-discovery-{cycle}"
            )

            # IMPLEMENT
            print(f"  🔨 Implement (ciclo {cycle})...")
            self.run_claude(
                f"Leia specs/plan-{task_id}.md e implemente tudo. Crie testes para cada módulo.",
                log_name=f"task-{task_id}-implement-{cycle}",
                timeout=600
            )

            # VERIFY (5 rounds)
            all_passed = True
            for round_num in range(1, self.max_verify_rounds + 1):
                focus_areas = {
                    1: "TypeCheck + Lint + Tests",
                    2: "Erros de lógica + Edge cases",
                    3: "Vulnerabilidades de segurança",
                    4: "Problemas de performance",
                    5: "Integração + Revisão final"
                }
                print(f"  ✅ Verify round {round_num}/5: {focus_areas[round_num]}...")

                verify_result = self.run_claude(
                    f"""Verifique as mudanças recentes com foco em: {focus_areas[round_num]}

                    Execute: git diff, typecheck, lint, tests
                    Se encontrar problemas, corrija-os imediatamente.
                    Reporte: status de cada verificação.""",
                    log_name=f"task-{task_id}-verify-{cycle}-r{round_num}"
                )
                result["verify_rounds"] += 1

                if "❌" in verify_result.get("stdout", "") or "CRITICAL" in verify_result.get("stdout", ""):
                    all_passed = False
                    break

            if all_passed:
                result["status"] = "completed"
                break

            if cycle < self.max_retry_cycles:
                print(f"  🔄 Verificação falhou, voltando ao Discovery...")

        # 4. DEPLOY (se passou)
        if result["status"] == "completed":
            print(f"  🚀 Deploy...")
            self.run_claude(
                "Crie um commit com mensagem descritiva seguindo Conventional Commits. NÃO faça push.",
                log_name=f"task-{task_id}-deploy"
            )
            print(f"  ✅ Task {task_id} concluída com sucesso!")
        else:
            print(f"  🚨 Task {task_id} falhou após {self.max_retry_cycles} ciclos. Revisão manual necessária.")

        return result

    def execute(self, tasks: list[dict]):
        """Executa todas as tasks da agenda."""
        print(f"\n{'='*60}")
        print(f"🎯 ORCHESTRATOR ADW")
        print(f"📋 Tasks: {len(tasks)}")
        print(f"{'='*60}")

        results = []
        for task in tasks:
            result = self.execute_task(task)
            results.append(result)

        # RELATÓRIO FINAL
        completed = sum(1 for r in results if r["status"] == "completed")
        total_retries = sum(r["retries"] for r in results)
        total_verify = sum(r["verify_rounds"] for r in results)

        print(f"\n{'='*60}")
        print(f"📊 RELATÓRIO FINAL")
        print(f"{'='*60}")
        print(f"  Tasks concluídas: {completed}/{len(tasks)}")
        print(f"  Total retries: {total_retries}")
        print(f"  Total verify rounds: {total_verify}")
        for r in results:
            status = "✅" if r["status"] == "completed" else "❌"
            print(f"  {status} Task {r['task_id']}: {r['status']} (retries: {r['retries']}, verify: {r['verify_rounds']})")


if __name__ == "__main__":
    adw = OrchestratorADW(project_path="/caminho/do/projeto")
    adw.execute([
        {"id": "1.1", "name": "Setup do banco de dados com migrations"},
        {"id": "1.2", "name": "Criar endpoints REST de autenticação"},
        {"id": "2.1", "name": "Implementar frontend de login"},
    ])
```

---

## 📋 Flags Importantes do Claude Code CLI

```bash
# Modo não-interativo (ideal para ADWs)
claude --print "seu prompt aqui"

# Pular prompts de permissão (modo autônomo)
claude --dangerously-skip-permissions "prompt"

# Usar modelo específico
claude --model claude-sonnet-4-5 --print "prompt"

# Enviar com contexto de arquivo
cat specs/plan.md | claude --print "Implemente este plano:"

# Modo verbose para debug
claude --verbose --print "prompt"

# Continuar conversa anterior
claude --continue --print "agora faça a etapa 2"

# Executar slash command específico
claude --print "/drk:drk-plan Criar sistema de pagamentos"
```

---

## 🔧 Criando Slash Commands Especializados

### Anatomia de um Slash Command

Todo command vive em `.claude/commands/` e segue esta estrutura:

```markdown
---
name: nome-do-comando
description: O que o agente faz (aparece no autocomplete)
arguments:
  - name: task
    description: Descrição do argumento
    required: true
---

# Título do Agente

Você é um [papel]. Sua função é [objetivo].

## Input
$ARGUMENTS

## Instruções Detalhadas
[Passo a passo do que o agente deve fazer]

## Output Format
[Formato esperado da saída]

## Regras
### FAÇA:
- [regra positiva]

### NÃO FAÇA:
- [regra negativa]
```

### Exemplos Práticos

**Agente de Code Review:**

```markdown
---
name: review
description: Revisa código buscando bugs, segurança e performance
---

# Code Review Agent

Você é um reviewer sênior. Analise as mudanças recentes.

## Processo
1. `git diff` para ver mudanças
2. Leia cada arquivo modificado completamente
3. Analise: bugs, segurança, performance, legibilidade
4. Reporte no formato: Critical 🔴 / Warning 🟡 / Suggestion 🔵

## Regras
- Seja específico (file:line)
- Dê fix, não apenas aponte problema
- Não reclame de estilo (isso é do linter)
```

**Agente de Documentação:**

```markdown
---
name: doc
description: Gera documentação técnica a partir do código
arguments:
  - name: path
    description: Caminho do arquivo ou diretório para documentar
    required: true
---

# Documentation Agent

Gere documentação técnica para: $ARGUMENTS

## Processo
1. Leia todo o código no path especificado
2. Identifique: funções públicas, tipos, fluxos
3. Gere docs em Markdown no diretório docs/

## Output
- README com visão geral
- Docs de API com exemplos
- Diagrama de arquitetura em ASCII
```

---

## 🔄 Framework PITER (Para Cada ADW)

Antes de construir qualquer ADW, responda estas 5 perguntas (Lição 4 - AFK Agents):

| Letra | Pergunta | Exemplo |
|-------|----------|---------|
| **P** — Prompt | Qual o prompt/comando do agente? | `/drk:drk-plan "Criar API REST"` |
| **I** — Input | Que dados/contexto o agente precisa? | Issue description, codebase context |
| **T** — Trigger | O que dispara a execução? | `python adw.py`, webhook, cron |
| **E** — Environment | Onde roda? (worktree, branch?) | Git worktree isolado |
| **R** — Review | Como validar o resultado? | Typecheck + lint + tests + 5 verify rounds |

---

## 🎯 Fluxo Completo do DRK Orchestrator

O template DRK (incluído neste repo em `00.extras/claude_templant/`) implementa o ciclo completo:

```
┌─────────────────────────────────────────────────────┐
│               DRK ORCHESTRATOR FLOW                  │
├─────────────────────────────────────────────────────┤
│                                                      │
│  1. /drk:drk-plan ──────────────────────────────►   │
│     └── Design doc + Agenda de implementação         │
│                                                      │
│  PARA CADA TASK DA AGENDA:                           │
│  ┌─────────────────────────────────────────────┐    │
│  │  2. Git Worktree (ambiente isolado)          │    │
│  │  3. /drk:drk-test-cases (gerar testes)       │    │
│  │  4. /drk:drk-discover (contexto)        ◄──┐│    │
│  │  5. /drk:drk-implement (executar)          ││    │
│  │  6. /drk:drk-verify (5 rounds)             ││    │
│  │     └── Se falhar → volta ao 4 ────────────┘│    │
│  │     └── Max 3 ciclos, depois escala          │    │
│  │  7. /drk:drk-deploy (commit + push)          │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
│  8. Relatório final com métricas                     │
└─────────────────────────────────────────────────────┘
```

---

## 🌊 Evolução: Do In-Loop ao ZTE

### Classe 1: In-Loop (Você no Terminal)

```bash
# Você conversa diretamente com Claude Code
claude

> Crie um endpoint de autenticação
> Agora adicione testes
> Corrija esse erro de tipos
> Faça o commit
```

**Toques: 10+** | **Produtividade: 1x**

---

### Classe 2: Out-Loop (ADW)

```bash
# Você dispara, vai tomar café, volta e revisa
python ADWs/workflows/plan_build_review_fix.py \
  --task "Criar endpoint de autenticação com JWT"
```

**Toques: 2** (disparar + revisar) | **Produtividade: 3-5x**

---

### Classe 3: ZTE — Zero-Touch Engineering (Webhook + ADW)

```python
# GitHub Webhook: issue aberta → ADW roda automaticamente
@app.post("/webhook/github")
async def handle_github_event(request: Request):
    payload = await request.json()

    if payload["action"] == "opened" and "issues" in payload:
        issue = payload["issue"]
        task = issue["title"]

        # Dispara ADW automaticamente
        adw = ProductionADW(project_path="/path/to/project")
        adw.execute(task)

        # Cria PR automaticamente
        # ...

    return {"status": "ok"}
```

**Toques: 1** (abrir a issue) | **Produtividade: 10x+**

---

## 📊 Checklist Diário do Engenheiro Agêntico

### Antes de Começar

- [ ] Meu `CLAUDE.md` está atualizado com contexto do projeto?
- [ ] Tenho slash commands para as tarefas mais comuns?
- [ ] Meus ADWs têm logging e retry?
- [ ] Tenho validação automatizada (lint, types, tests)?

### Durante o Trabalho

- [ ] Estou na **camada agêntica** (50%+ do tempo)?
- [ ] Estou **fora do loop** ou microgerenciando?
- [ ] Cada agente tem **um propósito claro**?
- [ ] Tenho **feedback loops** (validação em cada etapa)?

### Métricas

- [ ] **Toques por task:** Meta ≤ 2 (Out-Loop) ou = 1 (ZTE)
- [ ] **Success rate:** Meta 95%+
- [ ] **Context window:** Meta < 70% de uso
- [ ] **Tempo de entrega:** Melhorando semana a semana?

---

## 📚 Referências do Curso TAC

| Lição | Tópico | Conceito-Chave para ADWs |
|-------|--------|--------------------------|
| 1 | Hello Agentic Coding | Claude Code é programável e embeddable |
| 2 | 12 Leverage Points | ADWs são o leverage point #12 |
| 4 | AFK Agents | Framework PITER, ADWs, webhooks |
| 5 | Close The Loops | Todo workflow precisa de validação |
| 6 | Let Agents Focus | 1 agente = 1 responsabilidade |
| 7 | ZTE | Composable primitives, não SDLC |
| 8 | The Agentic Layer | 50%+ do tempo na camada agêntica |
| 11 | Domain-Specific Agents | Customizar Core Four (context, model, prompt, tools) |
| 12 | Multi-Agent Orchestration | O agente orquestrador (CRUD em agentes) |
| 14 | Building Agentic Layers | Framework completo: 3 Classes, 12 Grades |

---

## 🎯 Próximos Passos

1. **Copie o template** de `00.extras/claude_templant/` para seu projeto
2. **Adapte os commands** DRK para seu stack (troque `pnpm` por `npm`, `yarn`, etc.)
3. **Crie seu primeiro ADW** com o script Plan → Build (Nível 1)
4. **Adicione validação** com o loop Review → Fix (Nível 2)
5. **Escale** com worktrees paralelos e webhooks (Nível 3)
6. **Meça** toques, success rate e tempo — otimize continuamente

---

> **"A Singularidade do Codebase acontece quando seus agentes constroem melhor que você. ADWs são o caminho até lá."** 🚀

---

**Fonte:** Tactical Agentic Coding — Lições 1-14
**Template:** `00.extras/claude_templant/`
**Guias complementares:** `MELHORES-PRATICAS.md` | `ferramentas-praticas-agentic-coding.md`
