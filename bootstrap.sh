#!/bin/bash

echo -e "📦 Creating \e[32m.env\e[0m file..."
cp .env.example .env
echo -e "📦 Building \e[32mdocker containers\e[0m..."
docker compose --profile dev up -d --build
echo -e "📦 Running \e[32mdatabase migrations\e[0m..."
sleep 5
docker exec -it game-assets-marketplace-api-express-dev-1 pnpm prisma migrate dev
echo "✅ Build complete"
echo -e "🚀 Application is running at \e[32mhttp://localhost:3000\e[0m"
