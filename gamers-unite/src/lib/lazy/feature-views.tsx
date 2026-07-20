import dynamic from "next/dynamic";

import { CafeLoadingSkeleton } from "@/features/cafes/components/cafe-loading-skeleton";

const CafesView = dynamic(
  () =>
    import("@/features/cafes/components/cafes-view").then((module) => ({
      default: module.CafesView,
    })),
  { loading: () => <CafeLoadingSkeleton /> }
);

const SearchView = dynamic(
  () =>
    import("@/features/search/components/search-view").then((module) => ({
      default: module.SearchView,
    })),
  { loading: () => <SearchViewSkeleton /> }
);

const ReviewsView = dynamic(
  () =>
    import("@/features/reviews/components/reviews-view").then((module) => ({
      default: module.ReviewsView,
    })),
  { loading: () => <ReviewsViewSkeleton /> }
);

const LoginForm = dynamic(
  () =>
    import("@/features/auth/components/login-form").then((module) => ({
      default: module.LoginForm,
    })),
  { loading: () => <AuthFormSkeleton /> }
);

const RegisterForm = dynamic(
  () =>
    import("@/features/auth/components/register-form").then((module) => ({
      default: module.RegisterForm,
    })),
  { loading: () => <AuthFormSkeleton /> }
);

const ForgotPasswordForm = dynamic(
  () =>
    import("@/features/auth/components/forgot-password-form").then((module) => ({
      default: module.ForgotPasswordForm,
    })),
  { loading: () => <AuthFormSkeleton /> }
);

const ResetPasswordForm = dynamic(
  () =>
    import("@/features/auth/components/reset-password-form").then((module) => ({
      default: module.ResetPasswordForm,
    })),
  { loading: () => <AuthFormSkeleton /> }
);

const OtpVerificationForm = dynamic(
  () =>
    import("@/features/auth/components/otp-verification-form").then(
      (module) => ({
        default: module.OtpVerificationForm,
      })
    ),
  { loading: () => <AuthFormSkeleton /> }
);

function SearchViewSkeleton() {
  return (
    <div className="grid gap-4" aria-label="Loading search">
      <div className="h-12 max-w-3xl animate-pulse rounded-lg bg-muted" />
      <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <div className="h-72 animate-pulse rounded-lg bg-muted" />
        <div className="grid gap-4">
          <div className="h-16 animate-pulse rounded-lg bg-muted" />
          <div className="h-40 animate-pulse rounded-lg bg-muted" />
          <div className="h-40 animate-pulse rounded-lg bg-muted" />
        </div>
      </div>
    </div>
  );
}

function ReviewsViewSkeleton() {
  return (
    <div className="grid gap-4" aria-label="Loading reviews">
      <div className="h-10 w-64 animate-pulse rounded bg-muted" />
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-48 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  );
}

function AuthFormSkeleton() {
  return (
    <div className="grid gap-4" aria-label="Loading form">
      <div className="h-10 animate-pulse rounded bg-muted" />
      <div className="h-10 animate-pulse rounded bg-muted" />
      <div className="h-10 animate-pulse rounded bg-muted" />
    </div>
  );
}

export {
  CafesView,
  ForgotPasswordForm,
  LoginForm,
  OtpVerificationForm,
  RegisterForm,
  ResetPasswordForm,
  ReviewsView,
  SearchView,
};
