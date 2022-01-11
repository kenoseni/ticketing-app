FROM node:16-alpine3.12

LABEL maintainer="kenolusola@gmail.com"

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
