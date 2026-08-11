import { create } from "zustand";
import {
  persist,
  createJSONStorage,
} from "zustand/middleware";

export type Theme =
  | "light"
  | "dark"
  | "system";

export type PageSize =
  | 10
  | 20
  | 30;

interface PreferencesState {
  theme: Theme;
  sidebarCollapsed: boolean;
  defaultPageSize: PageSize;

  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (
    collapsed: boolean
  ) => void;
  setDefaultPageSize: (
    size: PageSize
  ) => void;
}

export const usePreferencesStore =
  create<PreferencesState>()(
    persist(
      (set) => ({
        theme: "system",
        sidebarCollapsed: false,
        defaultPageSize: 10,

        setTheme: (theme) =>
          set({
            theme,
          }),

        toggleSidebar: () =>
          set((state) => ({
            sidebarCollapsed:
              !state.sidebarCollapsed,
          })),

        setSidebarCollapsed: (
          collapsed
        ) =>
          set({
            sidebarCollapsed: collapsed,
          }),

        setDefaultPageSize: (size) =>
          set({
            defaultPageSize: size,
          }),
      }),
      {
        name: "workhub-preferences",
        storage: createJSONStorage(
          () => localStorage
        ),
      }
    )
  );