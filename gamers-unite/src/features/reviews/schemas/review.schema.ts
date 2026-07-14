import type {
  Review,
  ReviewFormErrors,
  ReviewFormValues,
  ReviewListResponse,
} from "@/features/reviews/types/review";

const reviewCategories = ["setup", "staff", "food", "crowd"] as const;

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isReview(value: unknown): value is Review {
  if (!value || typeof value !== "object") {
    return false;
  }

  const review = value as Record<string, unknown>;

  return (
    typeof review.id === "string" &&
    typeof review.cafeName === "string" &&
    typeof review.gameTitle === "string" &&
    typeof review.authorName === "string" &&
    typeof review.authorInitials === "string" &&
    typeof review.rating === "number" &&
    typeof review.category === "string" &&
    reviewCategories.includes(
      review.category as (typeof reviewCategories)[number]
    ) &&
    typeof review.title === "string" &&
    typeof review.comment === "string" &&
    typeof review.visitedAt === "string" &&
    typeof review.helpfulCount === "number" &&
    isStringArray(review.tags)
  );
}

export function parseReviewListResponse(value: unknown): ReviewListResponse {
  if (!value || typeof value !== "object") {
    throw new Error("Invalid review list response");
  }

  const response = value as Record<string, unknown>;

  if (
    !Array.isArray(response.reviews) ||
    !response.reviews.every(isReview) ||
    typeof response.page !== "number" ||
    typeof response.pageSize !== "number" ||
    typeof response.totalItems !== "number" ||
    typeof response.totalPages !== "number"
  ) {
    throw new Error("Invalid review list response");
  }

  return response as ReviewListResponse;
}

export function validateReviewForm(values: ReviewFormValues) {
  const errors: ReviewFormErrors = {};

  if (values.cafeName.trim().length < 2) {
    errors.cafeName = "Cafe name must be at least 2 characters.";
  }

  if (values.gameTitle.trim().length < 2) {
    errors.gameTitle = "Game title must be at least 2 characters.";
  }

  if (values.authorName.trim().length < 2) {
    errors.authorName = "Your name must be at least 2 characters.";
  }

  if (values.rating < 1 || values.rating > 5) {
    errors.rating = "Choose a rating from 1 to 5.";
  }

  if (values.title.trim().length < 4) {
    errors.title = "Title must be at least 4 characters.";
  }

  if (values.comment.trim().length < 20) {
    errors.comment = "Comment must be at least 20 characters.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}
