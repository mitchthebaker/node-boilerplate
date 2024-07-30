# Node-boilerplate 

This repository is set up with React, Node.js, PostgreSQL/pgadmin, and playwright for running e2e testing. 

## Setup

#### Clone the project

`git clone git@github.com:mitchthebaker/node-boilerplate.git`

#### Then create .env files for all services

In ./api-gateway/

```
  NODE_ENV=development
  PORT=3001

  PG_USER=admin
  PG_HOST=server_db
  PG_DB=db
  PG_PASSWORD=secret
  PG_PORT=5432
```


In ./client-app/

```
  NODE_ENV=development
  REACT_APP_API_GATEWAY_URI=http://localhost:3001
```

In ./e2e-tests/

```
PG_USER=admin
PG_HOST=localhost
PG_DB=db
PG_PASSWORD=secret
PG_PORT=3101
```

#### Update env variables in docker-compose.yml

```
  pgadmin:
    container_name: pgadmin
    image: dpage/pgadmin4
    environment: 
      PGADMIN_DEFAULT_EMAIL: admin@admin.com
      PGADMIN_DEFAULT_PASSWORD: secret
      PGADMIN_LISTEN_PORT: 80
    ports: 
      - "3201:80"
```

#### Next, add a new server in pgadmin so we can perform queries against the database. 

Open up pgadmin by typing http://localhost:3201 in your browser. 

Login with the credentials you set for PGADMIN_DEFAULT_EMAIL/PGADMIN_DEFAULT_PASSWORD. 

Next, click on `Add New Server`:

https://imgur.com/CFD67lu

In the modal that pops up, enter a name under the General tab. 

https://imgur.com/kqWAy8r

Click on the `Connection` tab.

For `Hostname/address`, set this to `server-db` which is the container_name for server-db in docker-compose.yml. 

Next, for the port input 5432

Then, update the `Username` to `admin`.

Then, update the `Password` to `secret`.

Lastly, click save. 

https://imgur.com/WNdLtwQ

#### If you haven't already install docker-compose here

https://docs.docker.com/compose/install/

start the app with `docker-compose up` 

react - http://localhost:3000
nodejs - http://localhost:3001
psql - http://localhost:3201
