FROM node:14 as base

WORKDIR /user-corn

COPY package*.json ./
RUN npm install
RUN npm build

COPY ./built .
COPY .env.production ./

#ENV
ENV NODE_ENV production

EXPOSE 3333

CMD [ "node", "./src/main/server.js" ]