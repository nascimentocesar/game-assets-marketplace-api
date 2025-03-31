## Application stack

- Apollo Server
- Express
- GraphQL
- nginx
- Node.js
- PostgreSQL
- Prisma

## Setup application

```sh
# creates docker containers and start the application
./bootstrap.sh
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
