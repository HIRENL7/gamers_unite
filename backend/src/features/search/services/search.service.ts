import { searchRepository } from "../repositories/search.repository.js";
import { paginateResults, sortSearchResults } from "../utils/search-utils.js";

export const searchService = {
  async search(input: {
    term: string;
    type: "all" | "cafe" | "game" | "review";
    location: string;
    minRating: number | null;
    sort: "relevance" | "rating" | "popularity" | "name";
    direction: "asc" | "desc";
    page: number;
    pageSize: number;
  }) {
    const [cafes, games, reviews] = await Promise.all([
      input.type === "all" || input.type === "cafe"
        ? searchRepository.findCafeResults(input.term)
        : Promise.resolve([]),
      input.type === "all" || input.type === "game"
        ? searchRepository.findGameResults(input.term)
        : Promise.resolve([]),
      input.type === "all" || input.type === "review"
        ? searchRepository.findReviewResults(input.term)
        : Promise.resolve([]),
    ]);

    const normalizedLocation = input.location.toLowerCase().trim();
    const normalizedTerm = input.term.toLowerCase().trim();
    const combined = [...cafes, ...games, ...reviews].filter((result) => {
      const matchesLocation = normalizedLocation
        ? result.location?.toLowerCase().includes(normalizedLocation)
        : true;
      const matchesRating =
        input.minRating === null ? true : result.rating >= input.minRating;
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
      const matchesTerm = normalizedTerm ? haystack.includes(normalizedTerm) : true;

      return matchesLocation && matchesRating && matchesTerm;
    });

    const sorted = sortSearchResults(combined, input);
    const paginated = paginateResults(sorted, input.page, input.pageSize);

    return {
      results: paginated.items,
      page: paginated.page,
      pageSize: paginated.pageSize,
      totalItems: paginated.totalItems,
      totalPages: paginated.totalPages,
    };
  },
};
