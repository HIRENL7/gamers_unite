type QueryKeyPart = string | number | boolean | null | undefined;

function createQueryKey(...parts: QueryKeyPart[]) {
  return parts.filter((part) => part !== undefined) as Exclude<
    QueryKeyPart,
    undefined
  >[];
}

export const queryKeys = {
  all: ["gamers-unite"] as const,
  auth: {
    all: () => createQueryKey(...queryKeys.all, "auth"),
  },
  cafes: {
    all: () => createQueryKey(...queryKeys.all, "cafes"),
    lists: () => createQueryKey(...queryKeys.cafes.all(), "list"),
    list: (page: number, pageSize: number) =>
      createQueryKey(...queryKeys.cafes.lists(), page, pageSize),
    detail: (id: string) => createQueryKey(...queryKeys.cafes.all(), id),
  },
  games: {
    all: () => createQueryKey(...queryKeys.all, "games"),
    lists: () => createQueryKey(...queryKeys.games.all(), "list"),
    detail: (id: string) => createQueryKey(...queryKeys.games.all(), id),
  },
  profile: {
    all: () => createQueryKey(...queryKeys.all, "profile"),
  },
  reviews: {
    all: () => createQueryKey(...queryKeys.all, "reviews"),
    lists: () => createQueryKey(...queryKeys.reviews.all(), "list"),
    list: (page: number, pageSize: number) =>
      createQueryKey(...queryKeys.reviews.lists(), page, pageSize),
  },
  search: {
    all: () => createQueryKey(...queryKeys.all, "search"),
    results: (term: string) => createQueryKey(...queryKeys.search.all(), term),
    infinite: (filters: string) =>
      createQueryKey(...queryKeys.search.all(), "infinite", filters),
  },
} as const;
