FROM node:10.14.2-alpine

RUN mkdir -p /opt/app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /opt
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean
RUN yarn global add pm2
RUN pm2 install typescript
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . /opt/app

EXPOSE 3000

CMD [ "pm2-dev", "start", "src/bootstrap.ts" ]