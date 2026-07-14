import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/features/auth/components/auth-shell";
import { OtpVerificationForm } from "@/features/auth/components/otp-verification-form";

export const metadata: Metadata = {
  title: "OTP Verification",
  description: "Verify a mock one-time password code.",
};

export default function OtpVerificationPage() {
  return (
    <AuthShell
      title="OTP verification"
      description="Enter a 6 digit code to complete the mock verification step."
      footer={
        <Link
          href="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Use another account
        </Link>
      }
    >
      <OtpVerificationForm />
    </AuthShell>
  );
}
