import { z } from "zod";

export const CreateGame = z.object({
  name: z.string().nonempty(),
});

export const UpdateGame = CreateGame.extend({});
