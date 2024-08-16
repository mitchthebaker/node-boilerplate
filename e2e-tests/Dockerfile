FROM node

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.46.0-jammy

WORKDIR /opt/app

COPY ./e2e-tests/package*.json ./
RUN npm install
COPY . .
