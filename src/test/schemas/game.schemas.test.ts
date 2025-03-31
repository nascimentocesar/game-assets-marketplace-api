import { CreateGame } from "../../schemas/game.schemas";
import { ZodError } from "zod";
import { factoryGame } from "../factories";

describe("CreateGame", () => {
  it("successfully parses a valid schema", () => {
    const input = factoryGame();
    expect(input).toMatchObject(CreateGame.parse(input));
  });

  it("raises error", () => {
    expect(() => CreateGame.parse({})).toThrow(ZodError);
  });
});
