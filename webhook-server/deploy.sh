#!/bin/bash

cd ../node-boilerplate/
ls
docker compose down 
docker compose pull
git pull --rebase origin main
docker compose build
docker compose -f docker-compose.yml -f docker-compose.production.yml up -d api-gateway client-app server-db pgadmin
