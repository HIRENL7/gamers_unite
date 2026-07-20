import type { Metadata } from "next";

import { ReviewsView } from "@/lib/lazy/feature-views";
import { createMetadata } from "@/lib/seo/create-metadata";

export const metadata: Metadata = createMetadata({
  title: "Reviews",
  description:
    "Read mock player reviews and submit a locally validated mock review.",
  path: "/reviews",
  keywords: ["player reviews", "gaming cafe reviews"],
});

export default function ReviewsPage() {
  return <ReviewsView />;
}
