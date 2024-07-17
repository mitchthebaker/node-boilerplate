FROM node

WORKDIR /opt/app

COPY ./api-gateway/package*.json ./

RUN npm install --dev --prefix /opt/app/

EXPOSE 3001

CMD ./scripts/start.sh