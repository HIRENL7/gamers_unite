import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/features/auth/components/auth-shell";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Request a mock password reset link.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot password"
      description="Enter your account email and stage a reset link without any backend request."
      footer={
        <Link
          href="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Back to login
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
