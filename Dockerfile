FROM node:23-alpine
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY ./prisma ./prisma
RUN pnpm exec prisma generate
COPY ./src ./src
CMD ["pnpm", "start"]
