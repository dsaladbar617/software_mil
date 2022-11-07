FROM mongo

COPY ./init-db.d/seed.js /docker-entrypoint-initdb.d



CMD [ "mongosh", "-f", "docker-entrypoint-initdb.d/seed.js" ]