FROM node:alpine

WORKDIR /app

RUN apk update && apk add bash

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
