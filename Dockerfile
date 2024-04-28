FROM node:lts-slim

WORKDIR /app

RUN npm install -g prisma
RUN apt-get update -y
RUN apt-get install -y openssl

COPY package.json package-lock.json ./

RUN npm ci

COPY src ./src

ENV DATABASE_URL file:../../../db.development.sqlite
RUN npm run db:generate
RUN npm run db:migrate

CMD [ "npm", "run", "serve" ]
