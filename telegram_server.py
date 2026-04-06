"""
Telegram Bot Server — recebe mensagens e mostra no console.

Uso:
  1. Defina a variável de ambiente TELEGRAM_BOT_TOKEN com o token do seu bot
  2. Execute: uv run python telegram_server.py
"""

import os
import sys
from datetime import datetime

from telegram import Update
from telegram.ext import Application, MessageHandler, filters, CommandHandler, ContextTypes


TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")


async def on_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Loga qualquer mensagem recebida no console."""
    msg = update.message
    if not msg:
        return

    timestamp = datetime.now().strftime("%H:%M:%S")
    chat = msg.chat
    user = msg.from_user

    chat_info = f"[{chat.type}] {chat.title or chat.id}"
    user_info = f"{user.full_name} (@{user.username})" if user else "desconhecido"

    print(f"\n{'='*60}")
    print(f"  {timestamp} | {chat_info}")
    print(f"  De: {user_info}")
    print(f"  Chat ID: {chat.id} | Message ID: {msg.message_id}")

    if msg.text:
        print(f"  Texto: {msg.text}")
    elif msg.photo:
        print(f"  [Foto] caption: {msg.caption or '—'}")
    elif msg.document:
        print(f"  [Documento] {msg.document.file_name}")
    elif msg.voice:
        print(f"  [Áudio de voz] {msg.voice.duration}s")
    elif msg.sticker:
        print(f"  [Sticker] {msg.sticker.emoji}")
    else:
        print(f"  [Outro tipo de mensagem]")

    print(f"{'='*60}")


async def on_start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Responde ao comando /start."""
    await update.message.reply_text("Bot ativo! Envie qualquer mensagem e ela aparecerá no console.")


def main() -> None:
    if not TOKEN:
        print("Erro: defina TELEGRAM_BOT_TOKEN como variável de ambiente.")
        print("  export TELEGRAM_BOT_TOKEN='seu-token-aqui'")
        sys.exit(1)

    print("Iniciando Telegram Bot Server...")
    print("Aguardando mensagens (Ctrl+C para parar)\n")

    app = Application.builder().token(TOKEN).build()

    app.add_handler(CommandHandler("start", on_start))
    app.add_handler(MessageHandler(filters.ALL, on_message))

    app.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
