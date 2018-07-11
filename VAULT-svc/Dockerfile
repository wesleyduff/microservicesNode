FROM node:carbon
WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3004

CMD ["npm", "start"]