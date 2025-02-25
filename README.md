## Setup project

1. Copy the `env.example` file as `.env` in the root folder and fill the variables accordingly.

2. Build the containers for the desired environment.

```sh
# development environment
export NODE_ENV=development && docker compose -f compose.base.yaml -f "compose.${NODE_ENV}.yaml" up -d --build

# production environment
export NODE_ENV=production && docker compose -f compose.base.yaml -f "compose.${NODE_ENV}.yaml" up -d --build
```

3. Apply the migrations to the database

```sh
POSTGRES_HOST=localhost pnpm prisma migrate dev
```

## General commands

```sh
# generates a new migration file
POSTGRES_HOST=localhost prisma migrate dev --name MIGRATION_NAME
```

```sh
# starts prisma studio to inspect the database
POSTGRES_HOST=localhost pnpm exec prisma studio
```

## Project stack

- Node.js
- Express
- GraphQL
- PostgreSQL
- nginx
- Apollo server
- Prisma
