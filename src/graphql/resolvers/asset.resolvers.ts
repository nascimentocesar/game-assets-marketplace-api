import { ApplicationContext } from "../../infrastructure/graphql";
import { prismaClient } from "../../infrastructure/prisma";
import { CreateAsset } from "../../validation/schemas/asset.schemas";
import {
  MutationCreateAssetArgs,
  QueryAssetArgs,
  QueryAssetsArgs,
} from "../generated/resolvers-types";

const assetResolvers = {
  Query: {
    asset: async (
      _parent: any,
      { id }: QueryAssetArgs,
      { dataLoaders }: ApplicationContext,
    ) => dataLoaders.assets.load(id),
    assets: async (
      _parent: any,
      { ids }: QueryAssetsArgs,
      { dataLoaders }: ApplicationContext,
    ) =>
      ids ? dataLoaders.assets.loadMany(ids) : prismaClient.asset.findMany(),
  },
  Mutation: {
    createAsset: async (
      _parent: any,
      { input }: MutationCreateAssetArgs,
      { dataLoaders }: ApplicationContext,
    ) => {
      const parsedData = CreateAsset.parse(input);

      const asset = await prismaClient.asset.create({
        data: parsedData,
      });

      return dataLoaders.assets.load(asset.id);
    },
  },
  Asset: {
    game: async (asset: any, _args: any, { dataLoaders }: ApplicationContext) =>
      dataLoaders.games.load(asset.gameId),
    products: async (
      asset: any,
      _args: any,
      { dataLoaders }: ApplicationContext,
    ) => dataLoaders.productsByAsset.load(asset.id),
  },
};

export default assetResolvers;
