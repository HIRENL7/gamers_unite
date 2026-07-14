import type {
  SearchRequest,
  SearchResponse,
  SearchResult,
} from "@/features/search/types/search";

const mockResults: SearchResult[] = [
  {
    id: "pixel-forge-arena",
    type: "cafe",
    title: "Pixel Forge Arena",
    subtitle: "Koramangala, Bengaluru",
    description:
      "Competitive PC arena with high-refresh setups, team bays, and weekday tactical shooter ladders.",
    rating: 4.9,
    location: "Koramangala",
    tags: ["Valorant", "Counter-Strike 2", "High-refresh PCs"],
    popularity: 98,
  },
  {
    id: "checkpoint-social",
    type: "cafe",
    title: "Checkpoint Social",
    subtitle: "Indiranagar, Bengaluru",
    description:
      "Console couches, co-op tables, and a calmer social floor for weekend party sessions.",
    rating: 4.8,
    location: "Indiranagar",
    tags: ["EA FC 26", "Tekken 8", "Console pods"],
    popularity: 91,
  },
  {
    id: "respawn-lounge",
    type: "cafe",
    title: "Respawn Lounge",
    subtitle: "HSR Layout, Bengaluru",
    description:
      "Private rooms, streamer booths, and reliable peripherals for quieter squad sessions.",
    rating: 4.7,
    location: "HSR Layout",
    tags: ["Dota 2", "Streaming booths", "Private rooms"],
    popularity: 87,
  },
  {
    id: "valorant",
    type: "game",
    title: "Valorant",
    subtitle: "Tactical FPS",
    description:
      "Fast local queues, tournament nights, and strong cafe availability across competitive PC venues.",
    rating: 4.8,
    tags: ["5v5", "Competitive", "PC"],
    popularity: 100,
  },
  {
    id: "tekken-8",
    type: "game",
    title: "Tekken 8",
    subtitle: "Fighting",
    description:
      "Popular for console pods, weekend brackets, and quick pickup matches with cafe regulars.",
    rating: 4.6,
    tags: ["Console", "Fighting", "Tournaments"],
    popularity: 84,
  },
  {
    id: "ea-fc-26",
    type: "game",
    title: "EA FC 26",
    subtitle: "Sports",
    description:
      "A favorite for groups looking for couch competition and relaxed cafe sessions.",
    rating: 4.4,
    tags: ["Console", "Sports", "Co-op"],
    popularity: 79,
  },
  {
    id: "review-pixel-forge-team-bay",
    type: "review",
    title: "Team bay booking was seamless",
    subtitle: "Review for Pixel Forge Arena",
    description:
      "The staff had our five-stack machines ready, and the peripherals were consistent across the bay.",
    rating: 5,
    location: "Koramangala",
    tags: ["Booking", "Valorant", "Peripherals"],
    popularity: 76,
  },
  {
    id: "review-checkpoint-console",
    type: "review",
    title: "Best console night this month",
    subtitle: "Review for Checkpoint Social",
    description:
      "Clean controllers, enough space for a group, and quick snacks between matches.",
    rating: 4.8,
    location: "Indiranagar",
    tags: ["Console pods", "Food service", "Tekken 8"],
    popularity: 71,
  },
  {
    id: "mana-bar",
    type: "cafe",
    title: "Mana Bar",
    subtitle: "Church Street, Bengaluru",
    description:
      "Downtown gaming cafe with balanced PC, console, and tabletop zones for mixed groups.",
    rating: 4.6,
    location: "Church Street",
    tags: ["Board games", "Rocket League", "Overwatch 2"],
    popularity: 74,
  },
  {
    id: "lag-free-lab",
    type: "cafe",
    title: "Lag Free Lab",
    subtitle: "Whitefield, Bengaluru",
    description:
      "Low-latency rigs, coaching support, and a practical layout for serious practice blocks.",
    rating: 4.8,
    location: "Whitefield",
    tags: ["Coaching desk", "Fortnite", "Counter-Strike 2"],
    popularity: 89,
  },
  {
    id: "street-fighter-6",
    type: "game",
    title: "Street Fighter 6",
    subtitle: "Fighting",
    description:
      "Strong fit for arcade-style cafes, quick sets, and casual tournament nights.",
    rating: 4.7,
    tags: ["Arcade", "Console", "Fighting"],
    popularity: 68,
  },
  {
    id: "review-respawn-private-room",
    type: "review",
    title: "Private room was worth it",
    subtitle: "Review for Respawn Lounge",
    description:
      "Quiet enough for calls between matches and the stream booth lighting made recording easy.",
    rating: 4.7,
    location: "HSR Layout",
    tags: ["Private rooms", "Streaming booths", "Dota 2"],
    popularity: 66,
  },
];

const MOCK_DELAY_MS = 300;

function waitForMockLatency() {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, MOCK_DELAY_MS);
  });
}

function getRelevanceScore(result: SearchResult, term: string) {
  const normalizedTerm = term.toLowerCase().trim();

  if (!normalizedTerm) {
    return result.popularity;
  }

  const haystack = [
    result.title,
    result.subtitle,
    result.description,
    result.location,
    ...result.tags,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (result.title.toLowerCase().includes(normalizedTerm)) {
    return 100 + result.popularity;
  }

  return haystack.includes(normalizedTerm) ? 50 + result.popularity : 0;
}

export async function searchMockResults({
  term,
  type,
  location,
  minRating,
  sort,
  direction,
  page,
  pageSize,
}: SearchRequest): Promise<SearchResponse> {
  await waitForMockLatency();

  const normalizedLocation = location.toLowerCase().trim();
  const scoredResults = mockResults
    .map((result) => ({
      result,
      relevance: getRelevanceScore(result, term),
    }))
    .filter(({ result, relevance }) => {
      const matchesTerm = term.trim() ? relevance > 0 : true;
      const matchesType = type === "all" ? true : result.type === type;
      const matchesLocation = normalizedLocation
        ? result.location?.toLowerCase().includes(normalizedLocation)
        : true;
      const matchesRating =
        minRating === null ? true : result.rating >= minRating;

      return matchesTerm && matchesType && matchesLocation && matchesRating;
    });

  scoredResults.sort((left, right) => {
    const modifier = direction === "asc" ? 1 : -1;

    if (sort === "name") {
      return left.result.title.localeCompare(right.result.title) * modifier;
    }

    if (sort === "rating") {
      return (left.result.rating - right.result.rating) * modifier;
    }

    if (sort === "popularity") {
      return (left.result.popularity - right.result.popularity) * modifier;
    }

    return (left.relevance - right.relevance) * modifier;
  });

  const totalItems = scoredResults.length;
  const totalPages = Math.max(Math.ceil(totalItems / pageSize), 1);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    results: scoredResults
      .slice(start, start + pageSize)
      .map(({ result }) => result),
    page: safePage,
    pageSize,
    totalItems,
    totalPages,
  };
}
