FROM mongo

COPY ./init-db.d/seed.js /docker-entrypoint-initdb.d

RUN chmod -R 777 /

RUN mongosh -f /docker-entrypoint-initdb.d/seed.js

# CMD [ "mongosh", "-f", "/docker-entrypoint-initdb.d/seed.js" ]