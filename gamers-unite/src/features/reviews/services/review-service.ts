import { parseReviewListResponse } from "@/features/reviews/schemas/review.schema";
import type {
  Review,
  ReviewListParams,
  ReviewListResponse,
} from "@/features/reviews/types/review";
import { clampPage } from "@/lib/utils";

const mockReviews: Review[] = [
  {
    id: "pixel-forge-valorant-bay",
    cafeName: "Pixel Forge Arena",
    gameTitle: "Valorant",
    authorName: "Anika Rao",
    authorInitials: "AR",
    rating: 5,
    category: "setup",
    title: "Five-stack setup was ready on time",
    comment:
      "Every machine had matching peripherals, the monitors were tuned well, and the staff already knew our booking notes.",
    visitedAt: "2026-07-02",
    helpfulCount: 42,
    tags: ["High-refresh PCs", "Team bay", "Valorant"],
  },
  {
    id: "checkpoint-tekken-night",
    cafeName: "Checkpoint Social",
    gameTitle: "Tekken 8",
    authorName: "Dev Mehta",
    authorInitials: "DM",
    rating: 4.8,
    category: "crowd",
    title: "Great console crowd without chaos",
    comment:
      "The console pods were clean, matches rotated quickly, and the room stayed social without getting too loud.",
    visitedAt: "2026-06-24",
    helpfulCount: 31,
    tags: ["Console pods", "Tekken 8", "Balanced crowd"],
  },
  {
    id: "respawn-private-dota",
    cafeName: "Respawn Lounge",
    gameTitle: "Dota 2",
    authorName: "Nikhil Shah",
    authorInitials: "NS",
    rating: 4.7,
    category: "setup",
    title: "Private room made the session calmer",
    comment:
      "Good chairs, quieter audio, and enough privacy for team calls between games. The booth lighting was a bonus.",
    visitedAt: "2026-06-18",
    helpfulCount: 26,
    tags: ["Private rooms", "Dota 2", "Streaming booths"],
  },
  {
    id: "mana-bar-mixed-group",
    cafeName: "Mana Bar",
    gameTitle: "Rocket League",
    authorName: "Ira Sen",
    authorInitials: "IS",
    rating: 4.5,
    category: "food",
    title: "Easy pick for mixed groups",
    comment:
      "Half our group played Rocket League while the rest grabbed board games. Food came quickly and the staff managed both zones well.",
    visitedAt: "2026-06-08",
    helpfulCount: 19,
    tags: ["Board games", "Food service", "Rocket League"],
  },
  {
    id: "lag-free-lab-practice",
    cafeName: "Lag Free Lab",
    gameTitle: "Counter-Strike 2",
    authorName: "Kabir Jain",
    authorInitials: "KJ",
    rating: 4.9,
    category: "staff",
    title: "Practice block felt professionally run",
    comment:
      "The network was stable, staff helped swap a mouse immediately, and the coaching desk gave useful demo review notes.",
    visitedAt: "2026-05-30",
    helpfulCount: 37,
    tags: ["Low latency", "Coaching desk", "Counter-Strike 2"],
  },
  {
    id: "arcade-atlas-street-fighter",
    cafeName: "Arcade Atlas",
    gameTitle: "Street Fighter 6",
    authorName: "Maya Dsouza",
    authorInitials: "MD",
    rating: 4.4,
    category: "crowd",
    title: "Friendly brackets and clean controllers",
    comment:
      "The regulars were welcoming, the controllers were in good shape, and short brackets kept the night moving.",
    visitedAt: "2026-05-19",
    helpfulCount: 14,
    tags: ["Arcade", "Street Fighter 6", "Controllers"],
  },
  {
    id: "pixel-forge-apex",
    cafeName: "Pixel Forge Arena",
    gameTitle: "Apex Legends",
    authorName: "Rhea Kapoor",
    authorInitials: "RK",
    rating: 4.6,
    category: "setup",
    title: "Smooth frames during peak hours",
    comment:
      "We played during the busiest slot and still had smooth frames, quick staff help, and enough room for backpacks.",
    visitedAt: "2026-05-11",
    helpfulCount: 22,
    tags: ["Apex Legends", "Peak hours", "PC setup"],
  },
  {
    id: "checkpoint-ea-fc",
    cafeName: "Checkpoint Social",
    gameTitle: "EA FC 26",
    authorName: "Arjun Pillai",
    authorInitials: "AP",
    rating: 4.3,
    category: "food",
    title: "Solid couch session with quick snacks",
    comment:
      "Controllers were charged, snacks landed fast, and the screen placement worked well for a four-player session.",
    visitedAt: "2026-04-28",
    helpfulCount: 11,
    tags: ["EA FC 26", "Snacks", "Console pods"],
  },
];

const MOCK_DELAY_MS = 250;

function waitForMockLatency() {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, MOCK_DELAY_MS);
  });
}

export async function getReviews({
  page = 1,
  pageSize = 4,
}: ReviewListParams = {}): Promise<ReviewListResponse> {
  await waitForMockLatency();

  const totalItems = mockReviews.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const safePage = clampPage(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const response = {
    reviews: mockReviews.slice(start, start + pageSize),
    page: safePage,
    pageSize,
    totalItems,
    totalPages,
  };

  return parseReviewListResponse(response);
}
