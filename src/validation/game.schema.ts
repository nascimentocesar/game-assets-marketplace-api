import z from "zod";

export const CreateGameSchema = z.object({
  name: z.string().min(1).max(255),
});
