import { z } from "zod";

export const reviewListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(4),
  cafeName: z.string().trim().optional(),
});

export const createReviewBodySchema = z.object({
  cafeName: z.string().min(2),
  gameTitle: z.string().min(2),
  rating: z.number().min(1).max(5),
  title: z.string().min(4),
  comment: z.string().min(20),
  category: z.enum(["setup", "staff", "food", "crowd"]).default("setup"),
  tags: z.array(z.string()).default([]),
});
