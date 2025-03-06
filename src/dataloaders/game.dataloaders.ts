import DataLoader from "dataloader";
import { prismaClient } from "../infrastructure/prisma";
import { Game } from "@prisma/client";

export const gamesLoader = () =>
  new DataLoader<string, Game | null>(async (ids: readonly string[]) => {
    const games = await prismaClient.game.findMany({
      where: { id: { in: ids as string[] } },
    });

    const mappedGames = new Map(games.map((game) => [game.id, game]));

    return ids.map((id) => mappedGames.get(id) || null);
  });
