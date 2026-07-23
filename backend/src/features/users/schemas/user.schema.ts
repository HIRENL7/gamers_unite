import { z } from "zod";

export const userRoleSchema = z.enum(["user", "creator", "admin"]);

export const publicUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: userRoleSchema,
  avatarUrl: z.string().url().optional(),
});

export type PublicUser = z.infer<typeof publicUserSchema>;
