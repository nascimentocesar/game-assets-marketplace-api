import { prismaClient } from "../../infrastructure/prisma";
import { gamesLoader } from "../../dataloaders/game.dataloaders";
import { Game } from "@prisma/client";
import { factoryGame } from "../factories";

jest.mock("../../infrastructure/prisma", () => ({
  prismaClient: {
    game: {
      findMany: jest.fn(),
    },
  },
}));

const mockGames: Game[] = [factoryGame(), factoryGame()];

describe("gamesLoader", () => {
  it("loads games by id", async () => {
    (prismaClient.game.findMany as jest.Mock).mockResolvedValue(mockGames);

    const loader = gamesLoader();
    const result = await loader.loadMany([mockGames[1].id]);

    expect(result).toEqual([mockGames[1]]);
  });
});
