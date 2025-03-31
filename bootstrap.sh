#!/bin/bash

echo -e "📦 Creating \e[32m.env\e[0m file..."
cp .env.example .env
echo -e "📦 Building \e[32mdocker containers\e[0m..."
docker compose up -d --build
echo -e "📦 Running \e[32mdatabase migrations\e[0m..."
sleep 5
docker exec -it $(docker ps -aqf name=game-assets-marketplace-api-express | head -n 1) pnpm exec prisma migrate dev
echo "✅ Build complete"
echo -e "🚀 Application is running at \e[32mhttp://localhost\e[0m"
