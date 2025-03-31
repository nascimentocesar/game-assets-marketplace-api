## Application stack

- Apollo Server
- Express
- GraphQL
- Jest
- nginx
- Node.js
- PostgreSQL
- Prisma

## Setup application

```sh
# creates docker containers and start the application
./bootstrap.sh
```

## Setup test environment

```sh
# creates .env.test file from .env.example
cp .env.example .env.test

# applies migrations to the test database
pnpm dotenvx run -f .env.test -- prisma migrate dev

# runs tests
pnpm test
```

## Frequently used commands

```sh
# applies migrations to the database
pnpm exec prisma migrate dev

# generates a new migration file after schema modifications
pnpm exec prisma migrate dev --name MIGRATION_NAME

# starts prisma studio to inspect the database
pnpm exec prisma studio

# generates GraphQL types after schema modifications
pnpm graphql-codegen
```
