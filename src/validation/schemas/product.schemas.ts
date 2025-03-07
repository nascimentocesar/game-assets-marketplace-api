import { z } from "zod";

export const CreateProduct = z.object({
  assetId: z.string().nonempty(),
  price: z.number().positive(),
  title: z.string().nonempty(),
});
