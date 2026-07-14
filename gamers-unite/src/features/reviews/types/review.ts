export type ReviewCategory = "setup" | "staff" | "food" | "crowd";

export type Review = {
  id: string;
  cafeName: string;
  gameTitle: string;
  authorName: string;
  authorInitials: string;
  rating: number;
  category: ReviewCategory;
  title: string;
  comment: string;
  visitedAt: string;
  helpfulCount: number;
  tags: string[];
};

export type ReviewListParams = {
  page?: number;
  pageSize?: number;
};

export type ReviewListResponse = {
  reviews: Review[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type ReviewFormValues = {
  cafeName: string;
  gameTitle: string;
  authorName: string;
  rating: number;
  title: string;
  comment: string;
};

export type ReviewFormErrors = Partial<
  Record<keyof ReviewFormValues, string>
>;
