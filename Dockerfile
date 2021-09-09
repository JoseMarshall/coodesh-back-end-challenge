FROM node:14 as base

WORKDIR /user-corn

COPY package*.json ./
COPY tsconfig.json ./
COPY .env.* ./

RUN npm install

COPY src ./src
COPY docs ./docs

RUN npm run build


#ENV
ENV NODE_ENV production

EXPOSE 3333

CMD [ "node", "./built/src/main/server.js" ]