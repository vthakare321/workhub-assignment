import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { ROUTES } from "@/shared/constants/routes";
import { useAuthStore } from "@/stores/auth.store";

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
}