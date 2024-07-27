FROM node

WORKDIR /opt/app

COPY ./client-app/package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD ./scripts/start.sh