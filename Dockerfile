FROM node:latest

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm i --silent

ADD . /app 

RUN npm run build 

CMD npm start