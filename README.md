## Setup project

```sh
# development environment
export NODE_ENV=development && docker compose -f compose.base.yaml -f "compose.${NODE_ENV}.yaml" up -d --build
```

```sh
# production environment
export NODE_ENV=production && docker compose -f compose.base.yaml -f "compose.${NODE_ENV}.yaml" up -d --build
```

## Manage database

```sh
# generates a new migration file
pnpm exec prisma migrate dev --name MIGRATION_NAME
```

```sh
# starts prisma studio to inspect the database
pnpm exec prisma studio
```
