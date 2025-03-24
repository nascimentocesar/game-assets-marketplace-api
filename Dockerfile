FROM node:23-alpine AS base
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY ./prisma ./prisma
RUN pnpm exec prisma generate
COPY ./src ./src

FROM base AS development
CMD ["pnpm", "start:development"]

FROM base AS production
COPY tsconfig.json ./
RUN pnpm build
RUN pnpm install -P --frozen-lockfile \
  && rm -Rf ./src \
  && rm tsconfig.json
CMD ["pnpm", "start:production"]
