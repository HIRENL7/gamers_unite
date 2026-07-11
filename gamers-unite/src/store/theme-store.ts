import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";

type ThemeState = {
  mode: ThemeMode;
};

type ThemeActions = {
  setMode: (mode: ThemeMode) => void;
  resetMode: () => void;
};

const initialState: ThemeState = {
  mode: "system",
};

export const useThemeStore = create<ThemeState & ThemeActions>()(
  persist(
    (set) => ({
      ...initialState,
      setMode: (mode) => set({ mode }),
      resetMode: () => set(initialState),
    }),
    {
      name: "gamers-unite-theme",
    },
  ),
);
