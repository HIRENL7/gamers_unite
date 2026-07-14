export type CafeAmenity =
  | "High-refresh PCs"
  | "Console pods"
  | "Private rooms"
  | "Food service"
  | "Tournament nights"
  | "Streaming booths"
  | "Board games"
  | "Coaching desk";

export type CafeCrowdLevel = "Quiet" | "Balanced" | "Busy";

export type Cafe = {
  id: string;
  name: string;
  neighborhood: string;
  city: string;
  address: string;
  description: string;
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  openUntil: string;
  seatsAvailable: number;
  totalSeats: number;
  featuredGames: string[];
  amenities: CafeAmenity[];
  crowdLevel: CafeCrowdLevel;
  heroTone: string;
};

export type CafeListParams = {
  page?: number;
  pageSize?: number;
};

export type CafeListResponse = {
  cafes: Cafe[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};
