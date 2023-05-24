FROM node:bullseye-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY worker/package.json ./package.json
COPY worker/package-lock.json ./package-lock.json
COPY worker/.env .

RUN npm install

# Bundle worker app source
COPY worker/ ./

RUN npm run build

CMD [ "node", "build/index.js" ]
