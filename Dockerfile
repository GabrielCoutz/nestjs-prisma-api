FROM node:18-alpine

WORKDIR /usr/api/node-api-v1

COPY package.json ./

RUN npm install

RUN npm install -g prisma && apk add bash

EXPOSE 3000

COPY . .