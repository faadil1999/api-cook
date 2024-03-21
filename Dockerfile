FROM node:lts-slim

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY src ./src

ENV DATABASE_URL file:../../../db.development.sqlite
RUN yarn db:generate
RUN yarn db:migrate

CMD [ "yarn", "serve" ]