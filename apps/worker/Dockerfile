FROM node:bullseye-slim

# Create app directory
WORKDIR /usr/src/app

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY apps/worker/package.json ./apps/worker/package.json
COPY apps/worker/.env .

RUN npm install

# Bundle app source
COPY . .

CMD [ "node", "apps/worker/build/index.js" ]
