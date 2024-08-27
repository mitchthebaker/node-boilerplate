#!/bin/bash

cd ../../
docker compose down 
docker compose pull
docker compose -f docker-compose.yml -f docker-compose.production.yml up -d api-gateway client-app server-db pgadmin
