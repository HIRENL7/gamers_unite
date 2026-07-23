import { z } from "zod";

export const cafeListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(6),
  city: z.string().trim().optional(),
});

export const cafeIdParamsSchema = z.object({
  id: z.string().min(1),
});
