# Build Stage
FROM node:16-alpine AS builder

COPY . .

ARG NODE_ENV=production

RUN yarn install --production=false
RUN yarn run build \
&& rm -rf node_modules

# Runtime Stage
FROM node:16-alpine

ENV APP_HOME=/usr/app
WORKDIR $APP_HOME

COPY --from=builder server server
COPY --from=builder ssl ssl
# COPY --from=builder static static
COPY --from=builder route.js .
COPY --from=builder server.js .
COPY --from=builder package.json .
COPY --from=builder yarn.lock .
COPY --from=builder .npmrc .
COPY --from=builder dist dist

RUN yarn install --production=true

EXPOSE 8886
CMD ["yarn", "run", "start"]
