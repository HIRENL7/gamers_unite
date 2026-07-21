import type { Cafe } from "@/features/cafes/types/cafe";

export function formatCafeLocation(cafe: Pick<Cafe, "neighborhood" | "city">) {
  return `${cafe.neighborhood}, ${cafe.city}`;
}

export function formatSeatAvailability(
  cafe: Pick<Cafe, "seatsAvailable" | "totalSeats">
) {
  return `${cafe.seatsAvailable}/${cafe.totalSeats} seats open`;
}

export function formatCafePrice(pricePerHour: number) {
  return `₹${pricePerHour}/hr`;
}
