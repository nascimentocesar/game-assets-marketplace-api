import { ApplicationContext } from "../../infrastructure/graphql";
import { prismaClient } from "../../infrastructure/prisma";
import { CreateGame } from "../../validation/schemas/game.schemas";
import {
  MutationCreateGameArgs,
  QueryGameArgs,
  QueryGamesArgs,
} from "../generated/resolvers-types";

const gamesResolver = {
  Query: {
    game: async (
      _parent: any,
      { id }: QueryGameArgs,
      { dataLoaders }: ApplicationContext,
    ) => dataLoaders.games.load(id),
    games: async (
      _parent: any,
      { ids }: QueryGamesArgs,
      { dataLoaders }: ApplicationContext,
    ) => (ids ? dataLoaders.games.loadMany(ids) : prismaClient.game.findMany()),
  },
  Mutation: {
    createGame: async (
      _parent: any,
      { input }: MutationCreateGameArgs,
      { dataLoaders }: ApplicationContext,
    ) => {
      const parsedData = CreateGame.parse(input);

      const game = await prismaClient.game.create({
        data: parsedData,
      });

      return dataLoaders.games.load(game.id);
    },
  },
  Game: {
    assets: async (
      game: any,
      _args: any,
      { dataLoaders }: ApplicationContext,
    ) => dataLoaders.assetsByGame.load(game.id),
  },
};

export default gamesResolver;
