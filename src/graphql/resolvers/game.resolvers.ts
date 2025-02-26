import { createGame, findGame } from "../../services/game.service";
import {
  Game,
  GameMutationResponse,
  MutationCreateGameArgs,
} from "../generated/resolvers-types";
import { CreateGameSchema } from "../../validation/game.schema";

const gameResolvers = {
  Query: {
    game: (id: string): Promise<Game> => findGame(id),
  },
  Mutation: {
    createGame: async (
      _: any,
      { input }: MutationCreateGameArgs,
    ): Promise<GameMutationResponse> => {
      return createGame(CreateGameSchema.parse(input));
    },
  },
};

export default gameResolvers;
