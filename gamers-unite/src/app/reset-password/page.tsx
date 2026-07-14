import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/features/auth/components/auth-shell";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset a password through a mock local-only form.",
};

export default function ResetPasswordPage() {
  return (
    <AuthShell
      title="Reset password"
      description="Set a new password with local validation for length, uppercase letters, and numbers."
      footer={
        <Link
          href="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Return to login
        </Link>
      }
    >
      <ResetPasswordForm />
    </AuthShell>
  );
}
