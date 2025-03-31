import { execSync } from "child_process";
import { prismaClient } from "./src/infrastructure/prisma";

export default async () => {
  execSync("pnpm prisma migrate reset --force", {
    stdio: "inherit",
  });
  await prismaClient.$disconnect();
};
