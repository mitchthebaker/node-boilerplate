# Node-boilerplate 

Welcome! This repository will get you set up with an asynchronous REST API written in Node.js which is setup to query against a PostgreSQL database. 

There is also a React frontend client which is setup to send basic GET/POST requests.

## Setup

### Clone the project locally 

`git clone git@github.com:mitchthebaker/node-boilerplate.git`



### Next, cd into ./api-gateway and create a .env file 

Inside .env, add the following variables:

```
  NODE_ENV=development
  PORT=3001

  PG_USER=admin
  PG_HOST=server_db
  PG_DB=db
  PG_PASSWORD=secret
  PG_PORT=5432
```

What's most important here is that the PG... variables are setup, otherwise the connection to PostgreSQL will be unsuccessful. 



### Next, we're going to be doing the same process but cd into ./client-app and create a .env file 

Inside .env, add the following variables: 

```
  NODE_ENV=development

  REACT_APP_API_GATEWAY_URI=http://localhost:3001
```



### Update environment variables in docker-compose.yml

Open up docker-compose.yml. Inside you'll see the configuration required to setup each container. 

`api-gateway` is the name of our REST API, 
`server-db` is our PostgreSQL database, 
`pgadmin` is a web-based GUI tool which makes it easier to manage Postgres databases and its services,
and `client-app` is our React frontend. 

If you take a look at the `pgadmin` service, we have a few environment variables declared. In particular, the PGADMIN_DEFAULT_EMAIL/PGADMIN_DEFAULT_PASSWORD are the credentials you use to initially log into pgadmin. Go ahead and set these to whichever values you like-- store them somewhere so you have them for future use. 

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

### Install docker-compose here

https://docs.docker.com/compose/install/


- run the command: docker-compose up

You now have a node app running on http://0.0.0.0:3001