FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6080

ENV NODE_ENV=production

CMD ["npm", "start"]