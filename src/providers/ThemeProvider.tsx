import {
  useEffect,
  type ReactNode,
} from "react";

import { usePreferencesStore } from "@/stores/preferences.store";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const theme = usePreferencesStore(
    (state) => state.theme
  );

  useEffect(() => {
    const root = document.documentElement;

    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const applyTheme = () => {
      const shouldUseDark =
        theme === "dark" ||
        (theme === "system" &&
          mediaQuery.matches);

      root.classList.toggle(
        "dark",
        shouldUseDark
      );
    };

    applyTheme();

    if (theme !== "system") {
      return;
    }

    mediaQuery.addEventListener(
      "change",
      applyTheme
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        applyTheme
      );
    };
  }, [theme]);

  return <>{children}</>;
}