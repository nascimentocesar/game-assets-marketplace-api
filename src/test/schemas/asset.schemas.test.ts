import { CreateAsset } from "../../schemas/asset.schemas";
import { ZodError } from "zod";
import { factoryAsset } from "../factories";

describe("CreateAsset", () => {
  it("successfully parses a valid schema", () => {
    const input = factoryAsset();
    expect(input).toMatchObject(CreateAsset.parse(input));
  });

  it("raises error", () => {
    expect(() => CreateAsset.parse({})).toThrow(ZodError);
  });
});
