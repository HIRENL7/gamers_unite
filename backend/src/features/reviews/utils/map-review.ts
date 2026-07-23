import type { ReviewDocument } from "../models/review.model.js";

export interface ReviewDto {
  id: string;
  cafeName: string;
  gameTitle: string;
  authorName: string;
  authorInitials: string;
  rating: number;
  category: string;
  title: string;
  comment: string;
  visitedAt: string;
  helpfulCount: number;
  tags: string[];
}

export function mapReviewToDto(review: ReviewDocument): ReviewDto {
  return {
    id: review.slug,
    cafeName: review.cafeName,
    gameTitle: review.gameTitle,
    authorName: review.authorName,
    authorInitials: review.authorInitials,
    rating: review.rating,
    category: review.category,
    title: review.title,
    comment: review.comment,
    visitedAt: review.visitedAt,
    helpfulCount: review.helpfulCount,
    tags: review.tags,
  };
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
