import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .regex(/[A-Z]/, "Password must include an uppercase letter.")
  .regex(/[0-9]/, "Password must include a number.");

export const registerBodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: passwordSchema,
});

export const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  remember: z.boolean().optional(),
});

export const forgotPasswordBodySchema = z.object({
  email: z.string().email(),
});

export const resetPasswordBodySchema = z.object({
  password: passwordSchema,
  token: z.string().min(1),
});

export const refreshBodySchema = z.object({
  refreshToken: z.string().min(1).optional(),
});
