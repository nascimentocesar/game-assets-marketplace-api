import { CreateProduct } from "../../schemas/product.schemas";
import { ZodError } from "zod";
import { factoryProduct } from "../factories";

describe("CreateProduct", () => {
  it("successfully parses a valid schema", () => {
    const input = factoryProduct();
    expect(input).toMatchObject(CreateProduct.parse(input));
  });

  it("raises error", () => {
    expect(() => CreateProduct.parse({})).toThrow(ZodError);
  });
});
