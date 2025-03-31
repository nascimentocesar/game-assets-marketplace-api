import { prismaClient } from "../../infrastructure/prisma";
import {
  productsByAssetLoader,
  productsLoader,
} from "../../dataloaders/product.dataloaders";
import { Product } from "@prisma/client";
import { factoryProduct } from "../factories";

jest.mock("../../infrastructure/prisma", () => ({
  prismaClient: {
    product: {
      findMany: jest.fn(),
    },
  },
}));

const mockProducts: Product[] = [factoryProduct(), factoryProduct()];

describe("productsLoader", () => {
  it("loads products by id", async () => {
    (prismaClient.product.findMany as jest.Mock).mockResolvedValue(
      mockProducts,
    );

    const loader = productsLoader();
    const result = await loader.loadMany([mockProducts[1].id]);

    expect(result).toEqual([mockProducts[1]]);
  });
});

describe("productsByAssetLoader", () => {
  it("loads product by gameId", async () => {
    (prismaClient.product.findMany as jest.Mock).mockResolvedValue(
      mockProducts,
    );

    const loader = productsByAssetLoader();
    const result = await loader.loadMany([
      mockProducts[0].assetId,
      mockProducts[1].assetId,
    ]);

    expect(result).toEqual([[mockProducts[0]], [mockProducts[1]]]);
  });
});
