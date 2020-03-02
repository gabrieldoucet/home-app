FROM node:12.13.1

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 80

CMD ["node", "server/server.js"]
