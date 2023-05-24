FROM node:bullseye-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY worker/package.json ./worker/package.json
COPY worker/package-lock.json ./worker/package-lock.json
COPY worker/.env .

RUN cd worker && npm install

# Bundle worker app source
COPY worker/ ./worker

RUN cd worker && npm run build

CMD [ "node", "worker/build/index.js" ]
