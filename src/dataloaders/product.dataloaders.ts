import DataLoader from "dataloader";
import { prismaClient } from "../infrastructure/prisma";
import { Product } from "@prisma/client";

export const productsLoader = () =>
  new DataLoader<string, Product | null>(async (ids: readonly string[]) => {
    const products = await prismaClient.product.findMany({
      where: { id: { in: ids as string[] } },
    });

    const productsMap = new Map(
      products.map((product) => [product.id, product]),
    );

    return ids.map((id) => productsMap.get(id) || null);
  });

export const productsByAssetLoader = () =>
  new DataLoader<string, Product[] | null>(
    async (assetIds: readonly string[]) => {
      const products = await prismaClient.product.findMany({
        where: { assetId: { in: assetIds as string[] } },
      });

      const productsMap = new Map<string, typeof products>();

      products.forEach((product) => {
        if (!productsMap.has(product.assetId)) {
          productsMap.set(product.assetId, []);
        }

        productsMap.get(product.assetId)!.push(product);
      });

      return assetIds.map((id) => productsMap.get(id) || []);
    },
  );
