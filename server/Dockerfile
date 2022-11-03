FROM node:19

ENV NODE_ENV=production

RUN mkdir -p /app/software_mil-server

WORKDIR /app/software_mil-server

COPY package.json /app/software_mil-server

COPY package-lock.json /app/software_mil-server

RUN npm install

COPY . /app/software_mil-server

CMD [ "npm", "run", "start" ]