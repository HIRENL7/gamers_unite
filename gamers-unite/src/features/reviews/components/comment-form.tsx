"use client";

import { Send } from "lucide-react";
import * as React from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rating } from "@/features/reviews/components/rating";
import { createReview } from "@/features/reviews/services/review-service";
import { validateReviewForm } from "@/features/reviews/schemas/review.schema";
import type {
  ReviewFormErrors,
  ReviewFormValues,
} from "@/features/reviews/types/review";
import { queryKeys } from "@/services/query/keys";
import { ApiError } from "@/services/axios/error";
import { useAuthStore } from "@/store/auth-store";

const initialFormValues: ReviewFormValues = {
  cafeName: "",
  gameTitle: "",
  authorName: "",
  rating: 0,
  title: "",
  comment: "",
};

function CommentForm() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [values, setValues] = React.useState(initialFormValues);
  const [errors, setErrors] = React.useState<ReviewFormErrors>({});
  const [status, setStatus] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (user?.name) {
      setValues((current) => ({ ...current, authorName: user.name }));
    }
  }, [user?.name]);

  function updateField<TKey extends keyof ReviewFormValues>(
    key: TKey,
    value: ReviewFormValues[TKey],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setStatus(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isAuthenticated) {
      setStatus("Log in to publish a review.");
      return;
    }

    const validation = validateReviewForm(values);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setStatus("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await createReview(values);
      await queryClient.invalidateQueries({ queryKey: queryKeys.reviews.lists() });
      setStatus(`Review published for ${values.cafeName.trim()}.`);
      setValues({
        ...initialFormValues,
        authorName: user?.name ?? "",
      });
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Unable to publish your review right now.";
      setStatus(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="animate-fade-in rounded-lg">
      <CardHeader>
        <CardTitle>Write a review</CardTitle>
        <p className="text-sm text-muted-foreground">
          {isAuthenticated
            ? "Share your cafe experience with the community."
            : "Log in to publish a review to the live API."}
        </p>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="review-cafe"
              label="Cafe"
              value={values.cafeName}
              error={errors.cafeName}
              onChange={(value) => updateField("cafeName", value)}
            />
            <Field
              id="review-game"
              label="Game"
              value={values.gameTitle}
              error={errors.gameTitle}
              onChange={(value) => updateField("gameTitle", value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Field
              id="review-author"
              label="Your name" 
              value={values.authorName}
              error={errors.authorName}
              onChange={(value) => updateField("authorName", value)}
            />
            <Rating
              value={values.rating}
              label="Your rating"
              error={errors.rating}
              onChange={(rating) => updateField("rating", rating)}
            />
          </div>

          <Field
            id="review-title"
            label="Title"
            value={values.title}
            error={errors.title}
            onChange={(value) => updateField("title", value)}
          />

          <label className="grid gap-2" htmlFor="review-comment">
            <span className="text-sm font-medium">Comment</span>
            <textarea
              id="review-comment"
              value={values.comment}
              aria-invalid={Boolean(errors.comment)}
              aria-describedby={
                errors.comment ? "review-comment-error" : undefined
              }
              onChange={(event) => updateField("comment", event.target.value)}
              rows={5}
              placeholder="Share setup quality, staff notes, food, crowd level, or anything players should know."
              className="min-h-32 rounded-md border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20"
            />
            {errors.comment ? (
              <span
                id="review-comment-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {errors.comment}
              </span>
            ) : null}
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p
              className="text-sm text-muted-foreground"
              role="status"
              aria-live="polite"
            >
              {status ?? "Required fields are validated before publishing."}
            </p>
            <Button type="submit" disabled={isSubmitting}>
              <Send aria-hidden="true" />
              Publish review
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({
  error,
  id,
  label,
  onChange,
  value,
}: {
  error?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  const errorId = `${id}-error`;

  return (
    <label className="grid gap-2" htmlFor={id}>
      <span className="text-sm font-medium">{label}</span>
      <input
        id={id}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20"
      />
      {error ? (
        <span id={errorId} className="text-sm text-destructive" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export { CommentForm };
