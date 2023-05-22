FROM node:bullseye-slim

RUN npm install -g pnpm

# Create app directory
WORKDIR /usr/src/app

# Copy root package.json and lockfile
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY apps/worker/package.json ./apps/worker/package.json
COPY apps/worker/.env .

RUN pnpm install

# Bundle app source
COPY . .

CMD [ "node", "apps/worker/build/index.js" ]
