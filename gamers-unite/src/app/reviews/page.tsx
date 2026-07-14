import type { Metadata } from "next";

import { ReviewsView } from "@/features/reviews/components/reviews-view";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read mock player reviews and submit a locally validated mock review.",
};

export default function ReviewsPage() {
  return <ReviewsView />;
}
