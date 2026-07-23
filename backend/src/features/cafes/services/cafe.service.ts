import { getCachedJson, setCachedJson } from "../../../shared/database/redis.js";
import { ApiError } from "../../../shared/utils/api-error.js";
import { cafeRepository } from "../repositories/cafe.repository.js";
import { mapCafeToDto } from "../utils/map-cafe.js";

const CACHE_TTL_SECONDS = 300;

function buildListCacheKey(page: number, pageSize: number, city?: string) {
  return `cafes:list:${page}:${pageSize}:${city ?? "all"}`;
}

export const cafeService = {
  async listCafes(input: { page: number; pageSize: number; city?: string }) {
    const cacheKey = buildListCacheKey(input.page, input.pageSize, input.city);
    const cached = await getCachedJson<{
      cafes: ReturnType<typeof mapCafeToDto>[];
      page: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    }>(cacheKey);

    if (cached) {
      return cached;
    }

    const { items, totalItems } = await cafeRepository.findPaginated(input);
    const totalPages = Math.max(Math.ceil(totalItems / input.pageSize), 1);
    const page = Math.min(input.page, totalPages);
    const response = {
      cafes: items.map(mapCafeToDto),
      page,
      pageSize: input.pageSize,
      totalItems,
      totalPages,
    };

    await setCachedJson(cacheKey, response, CACHE_TTL_SECONDS);
    return response;
  },

  async getCafeById(id: string) {
    const cafe = await cafeRepository.findBySlug(id);

    if (!cafe) {
      throw new ApiError(404, "Cafe not found");
    }

    return mapCafeToDto(cafe);
  },
};
