FROM node:16.18.1-alpine

# Create app directory
WORKDIR /usr/src/app

# Install Yarn
# RUN npm install -g yarn

# Install app dependencies
COPY package*.json ./
RUN yarn install

# Bundle app source
COPY . .

# # Build the app
# RUN yarn build

EXPOSE 3000
