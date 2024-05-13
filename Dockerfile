FROM node:22.1.0 as restore
COPY . /app
WORKDIR /app
RUN yarn
RUN yarn compile

FROM node:22.1.0-alpine
WORKDIR /app
COPY --from=restore /app/node_modules /app/node_modules
COPY --from=restore /app/package.json /app/package.json
COPY --from=restore /app/dist /app/dist

EXPOSE 4000

ENTRYPOINT ["yarn", "start"]
