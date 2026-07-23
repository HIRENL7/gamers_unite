import type { CafeDocument } from "../models/cafe.model.js";

export interface CafeDto {
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
  amenities: string[];
  crowdLevel: string;
  heroTone: string;
  imageUrl?: string;
}

export function mapCafeToDto(cafe: CafeDocument): CafeDto {
  return {
    id: cafe.slug,
    name: cafe.name,
    neighborhood: cafe.neighborhood,
    city: cafe.city,
    address: cafe.address,
    description: cafe.description,
    rating: cafe.rating,
    reviewCount: cafe.reviewCount,
    pricePerHour: cafe.pricePerHour,
    openUntil: cafe.openUntil,
    seatsAvailable: cafe.seatsAvailable,
    totalSeats: cafe.totalSeats,
    featuredGames: cafe.featuredGames,
    amenities: cafe.amenities,
    crowdLevel: cafe.crowdLevel,
    heroTone: cafe.heroTone,
    imageUrl: cafe.imageUrl,
  };
}
