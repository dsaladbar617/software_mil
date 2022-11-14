FROM mongo

COPY ./init-db.d/mongo-init.js /docker-entrypoint-initdb.d

RUN chown -R 1000:1000 /docker-entrypoint-initdb.d

RUN chmod -R 777 /docker-entrypoint-initdb.d

EXPOSE 27017:27017