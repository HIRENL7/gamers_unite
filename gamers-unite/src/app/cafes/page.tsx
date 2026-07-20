import type { Metadata } from "next";

import { CafesView } from "@/lib/lazy/feature-views";
import { createMetadata } from "@/lib/seo/create-metadata";

export const metadata: Metadata = createMetadata({
  title: "Cafes",
  description:
    "Browse mock gaming cafe listings with availability, amenities, games, and details.",
  path: "/cafes",
  keywords: ["gaming cafe listings", "gaming cafe availability"],
});

export default function CafesPage() {
  return <CafesView />;
}
