import { create } from "zustand";

export type SortDirection = "asc" | "desc";

export type FilterState = {
  searchTerm: string;
  selectedCafeIds: string[];
  selectedGameIds: string[];
  rating: number | null;
  sortBy: string | null;
  sortDirection: SortDirection;
};

type FilterActions = {
  setSearchTerm: (searchTerm: string) => void;
  setSelectedCafeIds: (selectedCafeIds: string[]) => void;
  setSelectedGameIds: (selectedGameIds: string[]) => void;
  setRating: (rating: number | null) => void;
  setSort: (sortBy: string | null, sortDirection?: SortDirection) => void;
  resetFilters: () => void;
};

const initialState: FilterState = {
  searchTerm: "",
  selectedCafeIds: [],
  selectedGameIds: [],
  rating: null,
  sortBy: null,
  sortDirection: "desc",
};

export const useFilterStore = create<FilterState & FilterActions>()((set) => ({
  ...initialState,
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSelectedCafeIds: (selectedCafeIds) => set({ selectedCafeIds }),
  setSelectedGameIds: (selectedGameIds) => set({ selectedGameIds }),
  setRating: (rating) => set({ rating }),
  setSort: (sortBy, sortDirection = "desc") => set({ sortBy, sortDirection }),
  resetFilters: () => set(initialState),
}));
