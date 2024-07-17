FROM node

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY ./api-gateway/package*.json /opt/app/
RUN npm install --include=dev
COPY . /opt/app

EXPOSE 3001

CMD ./scripts/start.sh