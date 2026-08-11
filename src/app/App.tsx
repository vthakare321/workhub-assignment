import AppRouter from "@/router";

import AuthInitializer from "@/features/auth/components/AuthInitializer";
import { ThemeProvider } from "@/providers/ThemeProvider";

export default function App() {
  return (
    <AuthInitializer>
       <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </AuthInitializer>
  );
}