FROM node

WORKDIR /opt/app

COPY ./api-gateway/package*.json ./
RUN npm install
COPY . .

EXPOSE 3001

#RUN apt-get update
#RUN apt-get install ca-certificates curl
#RUN install -m 0755 -d /etc/apt/keyrings
#RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
#RUN chmod a+r /etc/apt/keyrings/docker.asc

#RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu noble stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
#RUN apt-get update

#RUN apt-get install docker-ce=5:27.2.0-1~ubuntu.24.04~noble docker-ce-cli=5:27.2.0-1~ubuntu.24.04~noble containerd.io docker-buildx-plugin docker-compose-plugin

CMD ./scripts/start.sh
