FROM node:23-alpine AS base
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS development
COPY . .
CMD ["pnpm", "start:development"]

FROM base AS production
COPY ./src ./src
COPY tsconfig.json ./
RUN pnpm build
RUN pnpm install -P --frozen-lockfile && rm -Rf ./src
CMD ["pnpm", "start:production"]

