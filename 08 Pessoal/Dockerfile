FROM python:3.12-slim

WORKDIR /app

COPY dashboard.html .
COPY server.py .
COPY data/ data/

EXPOSE 8765

ENV HOST=0.0.0.0

CMD ["python3", "server.py"]
