import type { Metadata } from "next";

import { CafesView } from "@/features/cafes/components/cafes-view";

export const metadata: Metadata = {
  title: "Cafes",
  description:
    "Browse mock gaming cafe listings with availability, amenities, games, and details.",
};

export default function CafesPage() {
  return <CafesView />;
}
