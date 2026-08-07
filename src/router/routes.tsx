import { createBrowserRouter, Navigate } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";

import ProtectedRoute from "./ProtectedRoute";
import PermissionGuard from "./PermissionGuard";

import {
  publicRoutes,
  protectedRoutes,
  errorRoutes,
} from "./route.config";

import { ROUTES } from "@/shared/constants/routes";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: publicRoutes.map((route) => ({
      path: route.path,
      element: <route.component />,
    })),
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Navigate replace to={ROUTES.DASHBOARD} />,
          },

          ...protectedRoutes.map((route) => ({
            path: route.path,
            element: (
              <PermissionGuard permissions={route.permissions}>
                <route.component />
              </PermissionGuard>
            ),
          })),
        ],
      },
    ],
  },

  ...errorRoutes.map((route) => ({
    path: route.path,
    element: <route.component />,
  })),
]);