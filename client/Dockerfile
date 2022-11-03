FROM node:19

ENV NODE_ENV=production

RUN mkdir -p /app/software_mil-client

WORKDIR /app/software_mil-client

COPY package.json /app/software_mil-client

COPY package-lock.json /app/software_mil-client

RUN npm install

COPY . /app/software_mil-client

CMD ["npm" ,"run", "start"]

# RUN npm install -g serve

# RUN serve -s build &