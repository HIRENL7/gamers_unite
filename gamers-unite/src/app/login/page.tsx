import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/features/auth/components/auth-shell";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to Gamers Unite with a mock authentication form.",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Log in"
      description="Access your mock Gamers Unite account. This screen validates locally and does not call a backend."
      footer={
        <>
          New here?{" "}
          <Link
            href="/register"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
