FROM node

WORKDIR /opt/app

COPY ./api-gateway/package*.json ./

RUN npm install

EXPOSE 3001

CMD ./scripts/start.sh