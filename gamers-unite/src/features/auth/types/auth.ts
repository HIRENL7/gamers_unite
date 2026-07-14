import type { z } from "zod";

import type {
  forgotPasswordSchema,
  loginSchema,
  otpSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/features/auth/schemas/auth.schema";

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
