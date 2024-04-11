FROM node:20.11.0-alpine


WORKDIR /usr/src/app

COPY package.json .

RUN npm install

ADD . /usr/src/app


CMD ["npm","run","run"]

EXPOSE 4006