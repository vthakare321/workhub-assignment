import { lazy } from "react";

export const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));

export const DashboardPage = lazy(() => import("@/features/dashboard/pages/DashboardPage"));

export const UserListPage = lazy(() => import("@/features/users/pages/UserListPage"));

export const UserDetailPage = lazy(() => import("@/features/users/pages/UserDetailPage"));

export const CreateUserPage = lazy(() => import("@/features/users/pages/CreateUserPage"));

export const EditUserPage = lazy(() => import("@/features/users/pages/EditUserPage"));

export const WorkItemsPage = lazy(() => import("@/features/work-items/pages/WorkItemsPage"));

export const ProfilePage = lazy(() => import("@/features/profile/pages/ProfilePage"));

export const SettingsPage = lazy(() => import("@/features/settings/pages/SettingPage"));

export const ForbiddenPage = lazy(() => import("@/shared/pages/ForbiddenPage"));

export const NotFoundPage = lazy(() => import("@/shared/pages/NotFoundPage"));