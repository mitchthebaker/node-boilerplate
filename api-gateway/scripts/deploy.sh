#!/bin/bash

cd ../../
ls
/usr/bin/docker compose down 
/usr/bin/docker compose pull
/usr/bin/docker compose -f docker-compose.yml -f docker-compose.production.yml up -d api-gateway client-app server-db pgadmin
