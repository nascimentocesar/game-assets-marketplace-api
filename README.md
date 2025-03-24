## Setup project

1. Run the `bootstrap.sh` file and select the desired environment.
2. Access GraphQL API on http://localhost/ (running in port 80 via nginx)
3. _Optional_: For development purposes, install `node.js` locally in your machine and enable `pnpm` by running `corepack enable` at the project root directory.

## Code changes

Live reload is enabled by default when running the application inside a container using the _development_ environment, so most of the changes to the source code do not require a container rebuild except by a few situations:

- after modifying GraphQL schema
- after modifying Prisma schema
- after adding/removing libraries

## Container commands

```sh
# builds/rebuilds all docker containers for the application
pnpm container:up                     # defaults to development environment
NODE_ENV=production pnpm container:up # for production environment

# removes all docker containers and volumes created by container:up
pnpm container:down                     # defaults to development environment
NODE_ENV=production pnpm container:down # for production environment

# runs any sh command inside the express app container
# ex: pnpm container:exec /bin/sh
pnpm container:exec COMMAND
```

## General commands

> [!IMPORTANT]
>
> All commands can be executed inside the application container just by adding `pnpm container:exec` at the beginning. Ex: `pnpm container:exec pnpm exec prisma studio`

```sh
# generates a new migration file after schema modifications
# remove POSTGRES_HOST=localhost when running the command inside the container
POSTGRES_HOST=localhost pnpm exec prisma migrate dev --name MIGRATION_NAME

# starts prisma studio to inspect the database
# remove POSTGRES_HOST=localhost when running the command inside the container
POSTGRES_HOST=localhost pnpm exec prisma studio

# generates GraphQL types after schema modifications
pnpm graphql:generate
```

## Project stack

- Node.js
- Express
- GraphQL
- PostgreSQL
- nginx
- Apollo server
- Prisma
