import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import DataLoader from "dataloader";
import { DateTimeResolver, JSONResolver } from "graphql-scalars";
import path from "path";
import {
  assetsByGameLoader as assetsByGameLoader,
  assetsLoader,
} from "../dataloaders/asset.dataloaders";
import { gamesLoader } from "../dataloaders/game.dataloaders";
import {
  productsByAssetLoader,
  productsLoader,
} from "../dataloaders/product.dataloaders";

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "../**/*.schema.graphql")),
);

const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "../**/*.resolvers.ts")),
);

export type ApplicationContext = {
  dataLoaders: {
    [key: string]: DataLoader<string, { id: string } | { id: string }[] | null>;
  };
};

export const applicationContext: ApplicationContext = {
  dataLoaders: {
    assets: assetsLoader(),
    assetsByGame: assetsByGameLoader(),
    games: gamesLoader(),
    products: productsLoader(),
    productsByAsset: productsByAssetLoader(),
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    ...resolvers,
    DateTime: DateTimeResolver,
    JSON: JSONResolver,
  },
});
