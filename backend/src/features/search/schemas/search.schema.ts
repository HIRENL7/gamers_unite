import { z } from "zod";

export const searchQuerySchema = z.object({
  term: z.string().default(""),
  type: z.enum(["all", "cafe", "game", "review"]).default("all"),
  location: z.string().default(""),
  minRating: z
    .union([z.coerce.number(), z.literal("null"), z.literal("")])
    .transform((value) => {
      if (value === "null" || value === "") {
        return null;
      }

      return value;
    })
    .nullable()
    .default(null),
  sort: z.enum(["relevance", "rating", "popularity", "name"]).default("relevance"),
  direction: z.enum(["asc", "desc"]).default("desc"),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(8),
});
