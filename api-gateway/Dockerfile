FROM node

WORKDIR /opt/app

COPY ./api-gateway/package.json .
RUN npm install
COPY . .

EXPOSE 3001

CMD ./scripts/start.sh