
FROM python:3.9


WORKDIR /app


COPY requirements.txt ./


RUN pip install --no-cache-dir --upgrade -r ./requirements.txt


COPY . .


CMD ["fastapi", "dev", "main.py", "--port", "${AGENT_PORT}", "--host", "0.0.0.0"]