import { createBrowserRouter, Navigate } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import { ROUTES } from "@/shared/constants/routes";

import ProtectedRoute from "./ProtectedRoute";
import PermissionGuard from "./PermissionGuard";

import {
  publicRoutes,
  protectedRoutes,
  errorRoutes,
} from "./route.config";

export const router = createBrowserRouter([

  {
    path:"/",
    element:<Navigate to={ROUTES.LOGIN} replace />,
  },
  // Public routes
  {
    element: <AuthLayout />,
    children: publicRoutes.map((route) => ({
      path: route.path,
      element: <route.component />,
    })),
  },

  // Protected application boundary
  {
    path: ROUTES.APP,
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: (
              <Navigate
                to="dashboard"
                replace
              />
            ),
          },

          ...protectedRoutes.map((route) => ({
            path: route.path,
            element: route.permissions ? (
              <PermissionGuard permissions={route.permissions}>
                <route.component />
              </PermissionGuard>
            ) : (
              <route.component />
            ),
          })),
        ],
      },
    ],
  },

  // Error / fallback routes
  ...errorRoutes.map((route) => ({
    path: route.path,
    element: <route.component />,
  })),
]);