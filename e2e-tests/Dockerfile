FROM node

WORKDIR /opt/app

COPY ./e2e-tests/package*.json ./
RUN npm install 
COPY . .

CMD ["npx", "playwright", "tests"]
