FROM python

COPY requirements.txt /app/requirements.txt
WORKDIR /app

RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

COPY ./ /app

EXPOSE 8080
CMD ["sh", "-c", "PYTHONPATH=/app/server:$PYTHONPATH waitress-serve --listen=*:8080 main:app"]
