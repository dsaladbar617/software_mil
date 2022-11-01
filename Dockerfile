FROM node:19 as clientBuilder

ENV NODE_ENV=production

WORKDIR /tmp

COPY client client

WORKDIR /tmp/client

RUN npm install

RUN npm run build

FROM node:19-slim

ENV NODE_ENV=production

WORKDIR /

COPY server server

WORKDIR /server

RUN npm install

COPY --from=clientBuilder /tmp/client/build /server/public

CMD npm run start

# FROM node:19-slim