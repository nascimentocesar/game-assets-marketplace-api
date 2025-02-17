## Setup project

```sh
# development environment
export NODE_ENV=development && docker compose -f compose.base.yaml -f "compose.${NODE_ENV}.yaml" up -d --build
```

```sh
# production environment
export NODE_ENV=production && docker compose -f compose.base.yaml -f "compose.${NODE_ENV}.yaml" up -d --build
```