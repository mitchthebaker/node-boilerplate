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

### If you haven't already install docker-compose here

https://docs.docker.com/compose/install/

After you've installed docker compose, you can run the command: 

`docker-compose up` in the root directory /node-boilerplate. If you changed the project name, the root directory is the folder containing docker-compose.yml. 

It will take some time to spin up each service, so be patient while everything is setup. 

If you've setup the .env files in `api-gateway` correctly, you should see `api-gateway listening on 3001`.

You should also see `client-app` listen on port 3000.

However, we haven't set up pgadmin yet so there may be an error thrown when the `api-gateway` attempts to connect to the PostgreSQL database. 

### Therefore, the last step is to add a new server in pgadmin so we can perform queries against our database. 

Open up pgadmin by typing http://localhost:3201 in your browser. 

Login with the credentials you set for PGADMIN_DEFAULT_EMAIL/PGADMIN_DEFAULT_PASSWORD. 

Next, click on `Add New Server`:

[Image for Add New Server](https://imgur.com/CFD67lu)

In the modal that pops up, enter a name under the General tab. This name is not important so choose anything.

[Image for Name in General Tab](https://imgur.com/kqWAy8r)

This is the most important step. Click on the `Connection` tab.

For `Hostname/address`, set this to `server_db` which is the container_name for server-db in docker-compose.yml. 

Next, for the port input 5432 if it's not set to that already.

Then, update the `Username` to `admin`.

Then, update the `Password` to `secret`.

Lastly, click save. 

[Image for Updating Connection Tab](https://imgur.com/WNdLtwQ)

Now pgadmin is setup with our database information, which is all we have to do for `api-gateway` to begin performing queries against the database.

The last couple steps you need to do is just to simply quit docker-compose by typing `ctrl+C`.

Then, rerun `docker-compose up`.

You now have a Node.js REST API running on http://localhost:3001,
a React frontend running on http://localhost:3000, and pgadmin running on http://localhost:3201!