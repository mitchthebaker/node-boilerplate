FROM node

WORKDIR /opt/app

COPY ./api-gateway/package*.json ./
RUN npm install
COPY . .

EXPOSE 3001

RUN curl -fsSL https://get.docker.com -o get-docker.sh
RUN sh get-docker.sh

CMD ./scripts/start.sh
