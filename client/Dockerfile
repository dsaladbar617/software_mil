FROM node:19

ENV NODE_ENV=production

WORKDIR /

COPY . client

WORKDIR /client

EXPOSE 3000

RUN npm install

RUN npm run build

RUN npm install -g serve

RUN serve -s build