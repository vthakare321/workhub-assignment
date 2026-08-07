import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Theme = "light" | "dark";

interface PreferencesState {
  theme: Theme;
  sidebarCollapsed: boolean;
  defaultPageSize: number;

  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setDefaultPageSize: (size: number) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: "light",
      sidebarCollapsed: false,
      defaultPageSize: 10,

      setTheme: (theme) =>
        set({
          theme,
        }),

      toggleSidebar: () =>
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        })),

      setDefaultPageSize: (size) =>
        set({
          defaultPageSize: size,
        }),
    }),
    {
      name: "preferences-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
