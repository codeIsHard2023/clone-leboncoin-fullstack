FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm i 

COPY tsconfig.json tsconfig.json
COPY src src

EXPOSE 3000

CMD npm start