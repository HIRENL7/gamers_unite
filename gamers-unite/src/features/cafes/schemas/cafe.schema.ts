import type { Cafe, CafeListResponse } from "@/features/cafes/types/cafe";

const cafeCrowdLevels = ["Quiet", "Balanced", "Busy"] as const;

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isCafe(value: unknown): value is Cafe {
  if (!value || typeof value !== "object") {
    return false;
  }

  const cafe = value as Record<string, unknown>;

  return (
    typeof cafe.id === "string" &&
    typeof cafe.name === "string" &&
    typeof cafe.neighborhood === "string" &&
    typeof cafe.city === "string" &&
    typeof cafe.address === "string" &&
    typeof cafe.description === "string" &&
    typeof cafe.rating === "number" &&
    typeof cafe.reviewCount === "number" &&
    typeof cafe.pricePerHour === "number" &&
    typeof cafe.openUntil === "string" &&
    typeof cafe.seatsAvailable === "number" &&
    typeof cafe.totalSeats === "number" &&
    isStringArray(cafe.featuredGames) &&
    isStringArray(cafe.amenities) &&
    typeof cafe.crowdLevel === "string" &&
    cafeCrowdLevels.includes(
      cafe.crowdLevel as (typeof cafeCrowdLevels)[number]
    ) &&
    typeof cafe.heroTone === "string" &&
    (cafe.imageUrl === undefined || typeof cafe.imageUrl === "string")
  );
}

export function parseCafe(value: unknown): Cafe {
  if (!isCafe(value)) {
    throw new Error("Invalid cafe data");
  }

  return value;
}

export function parseCafeListResponse(value: unknown): CafeListResponse {
  if (!value || typeof value !== "object") {
    throw new Error("Invalid cafe list response");
  }

  const response = value as Record<string, unknown>;

  if (
    !Array.isArray(response.cafes) ||
    !response.cafes.every(isCafe) ||
    typeof response.page !== "number" ||
    typeof response.pageSize !== "number" ||
    typeof response.totalItems !== "number" ||
    typeof response.totalPages !== "number"
  ) {
    throw new Error("Invalid cafe list response");
  }

  return response as CafeListResponse;
}
