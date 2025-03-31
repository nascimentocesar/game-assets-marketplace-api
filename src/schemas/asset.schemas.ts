import { z } from "zod";

export const CreateAsset = z.object({
  expiresAt: z.date(),
  externalId: z.string().nonempty(),
  gameId: z.string().nonempty(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])),
  startsAt: z.date(),
});

export const UpdateAsset = CreateAsset.extend({});
