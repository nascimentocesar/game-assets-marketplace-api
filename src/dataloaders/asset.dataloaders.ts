import DataLoader from "dataloader";
import { prismaClient } from "../infrastructure/prisma";
import { Asset } from "@prisma/client";

export const assetsLoader = () =>
  new DataLoader<string, Asset | null>(async (ids: readonly string[]) => {
    const assets = await prismaClient.asset.findMany({
      where: { id: { in: ids as string[] } },
    });

    const assetsMap = new Map(assets.map((asset) => [asset.id, asset]));

    return ids.map((id) => assetsMap.get(id) || null);
  });

export const assetsByGameLoader = () =>
  new DataLoader<string, Asset[] | null>(async (gameIds: readonly string[]) => {
    const assets = await prismaClient.asset.findMany({
      where: { gameId: { in: gameIds as string[] } },
    });

    const assetsMap = new Map<string, typeof assets>();

    assets.forEach((asset) => {
      if (!assetsMap.has(asset.gameId)) {
        assetsMap.set(asset.gameId, []);
      }

      assetsMap.get(asset.gameId)!.push(asset);
    });

    return gameIds.map((id) => assetsMap.get(id) || []);
  });
