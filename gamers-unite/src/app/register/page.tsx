import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/features/auth/components/auth-shell";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a mock Gamers Unite account with local validation.",
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create account"
      description="Join the player community with an accessible mock registration flow."
      footer={
        <>
          Already registered?{" "}
          <Link
            href="/login"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Log in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
