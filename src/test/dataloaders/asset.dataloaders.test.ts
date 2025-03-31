import { prismaClient } from "../../infrastructure/prisma";
import {
  assetsByGameLoader,
  assetsLoader,
} from "../../dataloaders/asset.dataloaders";
import { Asset } from "@prisma/client";
import { factoryAsset } from "../factories";

jest.mock("../../infrastructure/prisma", () => ({
  prismaClient: {
    asset: {
      findMany: jest.fn(),
    },
  },
}));

const mockAssets: Asset[] = [factoryAsset(), factoryAsset()];

describe("assetsLoader", () => {
  it("loads assets by id", async () => {
    (prismaClient.asset.findMany as jest.Mock).mockResolvedValue(mockAssets);

    const loader = assetsLoader();
    const result = await loader.loadMany([mockAssets[1].id]);

    expect(result).toEqual([mockAssets[1]]);
  });
});

describe("assetsByGameLoader", () => {
  it("loads assets by gameId", async () => {
    (prismaClient.asset.findMany as jest.Mock).mockResolvedValue(mockAssets);

    const loader = assetsByGameLoader();
    const result = await loader.loadMany([
      mockAssets[0].gameId,
      mockAssets[1].gameId,
    ]);

    expect(result).toEqual([[mockAssets[0]], [mockAssets[1]]]);
  });
});
