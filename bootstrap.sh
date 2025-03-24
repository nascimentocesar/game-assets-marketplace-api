#!/bin/bash

echo "Select the environment:"
echo -e "1) \e[32mdevelopment\e[0m"
echo -e "2) \e[32mdevelopment + test\e[0m"
echo -e "3) \e[34mproduction\e[0m"
read -p "Enter your choice (1, 2 or 3) [default: development]: " choice

choice=${choice:-1}

if [[ "$choice" == "1" || "$choice" == "2" ]]; then
  node_env="development"
  color="\e[32m"
elif [[ "$choice" == "3" ]]; then
  node_env="production"
  color="\e[34m"
else
  echo "❌ Invalid option. Please select 1, 2 or 3."
  exit 1
fi

echo -e "📦 Building $color$node_env\e[0m environment..."
export NODE_ENV=${node_env}
cp .env.example .env
docker compose -f compose.base.yaml -f compose.${NODE_ENV}.yaml up -d --build

echo -e "📦 Running database migrations..."
docker exec -it $(docker ps -aqf name=game-assets-marketplace-api-express | head -n 1) pnpm db:migrate

echo "✅ Build complete"
echo "🚀 Application is running at http://localhost/"
