FROM node:23-alpine AS base
WORKDIR /app
RUN corepack enable 
COPY package.json pnpm-lock.yaml ./

FROM base AS dev
RUN pnpm install --frozen-lockfile
COPY . .
CMD ["pnpm", "start:dev"]

FROM base AS prd
RUN pnpm install -P --frozen-lockfile
COPY . .
RUN pnpm build && rm -Rf ./src
CMD ["pnpm", "start:prd"]

