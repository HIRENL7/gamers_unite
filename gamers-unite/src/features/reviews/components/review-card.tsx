import { MessageSquareText, ThumbsUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rating } from "@/features/reviews/components/rating";
import type { Review } from "@/features/reviews/types/review";
import { formatReviewDate } from "@/features/reviews/utils/review-utils";

type ReviewCardProps = {
  review: Review;
  index?: number;
};

function ReviewCard({ review, index = 0 }: ReviewCardProps) {
  return (
    <Card
      className="animate-enter rounded-lg"
      style={{ animationDelay: `${Math.min(index * 45, 180)}ms` }}
    >
      <CardHeader>
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
            {review.authorInitials}
          </span>
          <div className="min-w-0 flex-1">
            <CardTitle>{review.title}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              {review.authorName} reviewed {review.cafeName}
            </p>
          </div>
          <span className="hidden rounded-md bg-muted px-2 py-1 text-xs font-medium capitalize sm:inline-flex">
            {review.category}
          </span>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4">
        <Rating value={review.rating} label={`${review.cafeName} rating`} />
        <p className="text-sm leading-6 text-muted-foreground">
          {review.comment}
        </p>
        <div className="flex flex-wrap gap-2">
          {review.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border px-2 py-1 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="justify-between gap-3 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <MessageSquareText aria-hidden="true" className="size-4" />
          {review.gameTitle} - {formatReviewDate(review.visitedAt)}
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-foreground">
          <ThumbsUp aria-hidden="true" className="size-4" />
          {review.helpfulCount}
        </span>
      </CardFooter>
    </Card>
  );
}

export { ReviewCard };
