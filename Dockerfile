FROM node:22.1.0-alpine as restore
COPY . /app
WORKDIR /app
RUN yarn
RUN yarn build

EXPOSE 4000

ENTRYPOINT ["yarn", "start"]
