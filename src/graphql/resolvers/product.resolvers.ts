import { ApplicationContext } from "../../infrastructure/graphql";
import { prismaClient } from "../../infrastructure/prisma";
import {
  MutationCreateProductArgs,
  QueryProductArgs,
  QueryProductsArgs,
} from "../generated/resolvers-types";

const productResolvers = {
  Query: {
    product: async (
      _parent: any,
      { id }: QueryProductArgs,
      { dataLoaders }: ApplicationContext,
    ) => dataLoaders.products.load(id),
    products: async (
      _parent: any,
      { ids }: QueryProductsArgs,
      { dataLoaders }: ApplicationContext,
    ) =>
      ids
        ? dataLoaders.products.loadMany(ids)
        : prismaClient.product.findMany(),
  },
  Mutation: {
    createProduct: async (
      _parent: any,
      { input }: MutationCreateProductArgs,
      { dataLoaders }: ApplicationContext,
    ) => {
      const product = await prismaClient.product.create({
        data: input,
      });

      return dataLoaders.products.load(product.id);
    },
  },
  Product: {
    asset: async (
      product: any,
      _args: any,
      { dataLoaders }: ApplicationContext,
    ) => dataLoaders.assets.load(product.assetId),
  },
};

export default productResolvers;
