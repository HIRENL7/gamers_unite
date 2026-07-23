export interface SearchResultDto {
  id: string;
  type: "cafe" | "game" | "review";
  title: string;
  subtitle: string;
  description: string;
  rating: number;
  location?: string;
  tags: string[];
  popularity: number;
}

function getRelevanceScore(result: SearchResultDto, term: string) {
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

export function sortSearchResults(
  results: SearchResultDto[],
  input: {
    term: string;
    sort: "relevance" | "rating" | "popularity" | "name";
    direction: "asc" | "desc";
  },
) {
  const modifier = input.direction === "asc" ? 1 : -1;

  return [...results].sort((left, right) => {
    if (input.sort === "name") {
      return left.title.localeCompare(right.title) * modifier;
    }

    if (input.sort === "rating") {
      return (left.rating - right.rating) * modifier;
    }

    if (input.sort === "popularity") {
      return (left.popularity - right.popularity) * modifier;
    }

    return (
      (getRelevanceScore(left, input.term) - getRelevanceScore(right, input.term)) *
      modifier
    );
  });
}

export function paginateResults<TItem>(
  items: TItem[],
  page: number,
  pageSize: number,
) {
  const totalItems = items.length;
  const totalPages = Math.max(Math.ceil(totalItems / pageSize), 1);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    pageSize,
    totalItems,
    totalPages,
  };
}
