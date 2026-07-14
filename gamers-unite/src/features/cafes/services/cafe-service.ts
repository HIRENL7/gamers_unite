import {
  parseCafe,
  parseCafeListResponse,
} from "@/features/cafes/schemas/cafe.schema";
import type {
  Cafe,
  CafeListParams,
  CafeListResponse,
} from "@/features/cafes/types/cafe";
import { clampPage } from "@/features/cafes/utils/cafe-utils";

const mockCafes: Cafe[] = [
  {
    id: "pixel-forge-arena",
    name: "Pixel Forge Arena",
    neighborhood: "Koramangala",
    city: "Bengaluru",
    address: "5th Block, Koramangala, Bengaluru",
    description:
      "A competitive PC arena with high-refresh setups, team bays, and weekday tactical shooter ladders.",
    rating: 4.9,
    reviewCount: 386,
    pricePerHour: 180,
    openUntil: "1:00 AM",
    seatsAvailable: 12,
    totalSeats: 48,
    featuredGames: ["Valorant", "Counter-Strike 2", "Apex Legends"],
    amenities: ["High-refresh PCs", "Tournament nights", "Food service"],
    crowdLevel: "Busy",
    heroTone: "from-emerald-500 via-zinc-950 to-sky-500",
  },
  {
    id: "checkpoint-social",
    name: "Checkpoint Social",
    neighborhood: "Indiranagar",
    city: "Bengaluru",
    address: "100 Feet Road, Indiranagar, Bengaluru",
    description:
      "Console couches, co-op tables, and a calmer social floor for long weekend party sessions.",
    rating: 4.8,
    reviewCount: 271,
    pricePerHour: 150,
    openUntil: "12:30 AM",
    seatsAvailable: 9,
    totalSeats: 32,
    featuredGames: ["EA FC 26", "Tekken 8", "Mortal Kombat 1"],
    amenities: ["Console pods", "Board games", "Food service"],
    crowdLevel: "Balanced",
    heroTone: "from-sky-500 via-zinc-950 to-rose-500",
  },
  {
    id: "respawn-lounge",
    name: "Respawn Lounge",
    neighborhood: "HSR Layout",
    city: "Bengaluru",
    address: "Sector 6, HSR Layout, Bengaluru",
    description:
      "Private rooms, streamer booths, and reliable peripherals for squads that like a quieter setup.",
    rating: 4.7,
    reviewCount: 198,
    pricePerHour: 220,
    openUntil: "2:00 AM",
    seatsAvailable: 5,
    totalSeats: 28,
    featuredGames: ["Dota 2", "League of Legends", "Minecraft"],
    amenities: ["Private rooms", "Streaming booths", "High-refresh PCs"],
    crowdLevel: "Quiet",
    heroTone: "from-rose-500 via-zinc-950 to-amber-400",
  },
  {
    id: "mana-bar",
    name: "Mana Bar",
    neighborhood: "Church Street",
    city: "Bengaluru",
    address: "Church Street, Ashok Nagar, Bengaluru",
    description:
      "A downtown gaming cafe with balanced PC, console, and tabletop zones for mixed groups.",
    rating: 4.6,
    reviewCount: 154,
    pricePerHour: 170,
    openUntil: "11:45 PM",
    seatsAvailable: 16,
    totalSeats: 40,
    featuredGames: ["Overwatch 2", "Rocket League", "Catan"],
    amenities: ["Console pods", "Board games", "Food service"],
    crowdLevel: "Balanced",
    heroTone: "from-violet-500 via-zinc-950 to-emerald-500",
  },
  {
    id: "lag-free-lab",
    name: "Lag Free Lab",
    neighborhood: "Whitefield",
    city: "Bengaluru",
    address: "ITPL Main Road, Whitefield, Bengaluru",
    description:
      "Low-latency rigs, coaching support, and a practical layout for serious practice blocks.",
    rating: 4.8,
    reviewCount: 229,
    pricePerHour: 200,
    openUntil: "1:30 AM",
    seatsAvailable: 7,
    totalSeats: 36,
    featuredGames: ["Valorant", "Fortnite", "Counter-Strike 2"],
    amenities: ["High-refresh PCs", "Coaching desk", "Tournament nights"],
    crowdLevel: "Busy",
    heroTone: "from-cyan-500 via-zinc-950 to-lime-400",
  },
  {
    id: "arcade-atlas",
    name: "Arcade Atlas",
    neighborhood: "Jayanagar",
    city: "Bengaluru",
    address: "4th Block, Jayanagar, Bengaluru",
    description:
      "Retro arcade walls, current-gen consoles, and friendly staff for casual drop-in sessions.",
    rating: 4.5,
    reviewCount: 132,
    pricePerHour: 130,
    openUntil: "10:30 PM",
    seatsAvailable: 18,
    totalSeats: 30,
    featuredGames: ["Street Fighter 6", "Mario Kart", "Tekken 8"],
    amenities: ["Console pods", "Board games", "Food service"],
    crowdLevel: "Quiet",
    heroTone: "from-orange-500 via-zinc-950 to-fuchsia-500",
  },
];

const MOCK_DELAY_MS = 250;

function waitForMockLatency() {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, MOCK_DELAY_MS);
  });
}

export async function getCafes({
  page = 1,
  pageSize = 6,
}: CafeListParams = {}): Promise<CafeListResponse> {
  await waitForMockLatency();

  const totalItems = mockCafes.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const safePage = clampPage(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const response = {
    cafes: mockCafes.slice(start, start + pageSize),
    page: safePage,
    pageSize,
    totalItems,
    totalPages,
  };

  return parseCafeListResponse(response);
}

export async function getCafeById(id: string): Promise<Cafe> {
  await waitForMockLatency();

  const cafe = mockCafes.find((item) => item.id === id);

  if (!cafe) {
    throw new Error("Cafe not found");
  }

  return parseCafe(cafe);
}
