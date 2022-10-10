FROM node

WORKDIR /opt/app

COPY ./client-app/package*.json ./

RUN npm install

EXPOSE 3000

CMD ./scripts/start.sh