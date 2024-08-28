#!/bin/bash

docker compose down 
docker compose pull
cd ../../../
ls
docker compose -f docker-compose.yml -f docker-compose.production.yml up -d api-gateway client-app server-db pgadmin
