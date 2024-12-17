FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm i 

COPY public public
COPY tsconfig.app.json tsconfig.app.json
COPY tsconfig.json tsconfig.json
COPY tsconfig.node.json tsconfig.node.json
COPY vite.config.ts vite.config.ts
COPY index.html index.html
COPY codegen.ts codegen.ts
COPY src src 

