FROM python:3.8.13-alpine3.16

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

RUN chmod +x ./entrypoint_*.sh