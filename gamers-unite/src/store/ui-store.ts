import { create } from "zustand";

type ModalName = "auth" | "search" | "filters" | null;

type UIState = {
  activeModal: ModalName;
  isMobileNavigationOpen: boolean;
  isCommandMenuOpen: boolean;
  sidebarCollapsed: boolean;
};

type UIActions = {
  openModal: (modal: Exclude<ModalName, null>) => void;
  closeModal: () => void;
  setMobileNavigationOpen: (isMobileNavigationOpen: boolean) => void;
  setCommandMenuOpen: (isCommandMenuOpen: boolean) => void;
  toggleSidebar: () => void;
  resetUI: () => void;
};

const initialState: UIState = {
  activeModal: null,
  isMobileNavigationOpen: false,
  isCommandMenuOpen: false,
  sidebarCollapsed: false,
};

export const useUIStore = create<UIState & UIActions>()((set) => ({
  ...initialState,
  openModal: (activeModal) => set({ activeModal }),
  closeModal: () => set({ activeModal: null }),
  setMobileNavigationOpen: (isMobileNavigationOpen) =>
    set({ isMobileNavigationOpen }),
  setCommandMenuOpen: (isCommandMenuOpen) => set({ isCommandMenuOpen }),
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  resetUI: () => set(initialState),
}));
