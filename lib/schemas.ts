import { z } from "zod";

export const navigationSchema = z.object({
  url: z.string().max(1100),
  universe: z.string().max(2200),
});
