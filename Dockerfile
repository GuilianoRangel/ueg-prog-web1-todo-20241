# Comando Docker para criar imagem
# docker build --add-host [servername-api]:[IPAddress] -t servidorimagem/ueg/modelo-frontend-angular:1.0.0-SNAPSHOT --build-arg configuration="production" .
# docker build  -t servidorimagem/ueg/modelo-frontend-angular:1.0.0-SNAPSHOT --build-arg configuration="production" .
# docker run --add-host [serverprod]:[192.168.68.116]  servidorimagem/ueg/modelo-frontend-angular:1.0.0-SNAPSHOT

# stage 1
FROM node:alpine AS builder

ARG configuration=production

WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .

RUN npm run build-docker -- --configuration=${configuration} --base-href /

# stage 2
FROM nginx:alpine
#VOLUME [ "/var/cache/nginx" ]
COPY --from=builder /app/dist/* /usr/share/nginx/html/
COPY ./docker-conf /etc/nginx/conf.d/

EXPOSE 80
