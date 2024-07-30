FROM node

WORKDIR /opt/app

COPY ./e2e-tests/package*.json ./
RUN npm install 
COPY . .

# Install Playwright browsers
RUN npx playwright install
RUN npx playwright install-deps

# Run tests
CMD ["npx", "playwright", "test"]
