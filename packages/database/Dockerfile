FROM node:8

ENV HOST 0.0.0.0

ENV PORT 8765

EXPOSE 8765

ENV ENV production
ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package.json ./
# COPY package-lock.json ./

# TODO: it seems dockerizing a package from a monorepo is not supported by yarn
# workspaces which also means we don't have access to the common packages, api
# etc either we need to either prebuild before publishing or publish the whole
# monorepo or create a minimal copy of the monorepo
# COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# RUN yarn start
CMD ["node", "dist/index.js"]
