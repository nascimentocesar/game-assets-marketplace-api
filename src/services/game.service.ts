import { Game } from "@prisma/client";
import { prismaClient } from "../infrastructure/prisma";
import { CreateGameInput } from "../graphql/generated/resolvers-types";

export const createGame = async (input: CreateGameInput): Promise<Game> => {
  return prismaClient.game.create({ data: input });
};

export const findGame = async (id: string): Promise<Game> => {
  return prismaClient.game.findFirstOrThrow({ where: { id: id } });
};
