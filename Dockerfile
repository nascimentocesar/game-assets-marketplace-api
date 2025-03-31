FROM node:23-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml tsconfig.json ./
RUN pnpm install --frozen-lockfile
COPY ./prisma ./prisma
RUN pnpm exec prisma generate
COPY ./src ./src

FROM build AS dev
CMD ["pnpm", "start"]

FROM build AS prd
RUN pnpm build
RUN pnpm install -P --frozen-lockfile \
  && rm -Rf ./src \
  && rm tsconfig.json
CMD ["node", "./src/bin/www.ts"]
