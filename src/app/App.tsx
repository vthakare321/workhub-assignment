import AppRouter from "@/router";

import AuthInitializer from "@/features/auth/components/AuthInitializer";

export default function App() {
  return (
    <AuthInitializer>
      <AppRouter />
    </AuthInitializer>
  );
}