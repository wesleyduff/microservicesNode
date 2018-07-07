FROM node:carbon
WORKDIR /usr/news/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "start"]