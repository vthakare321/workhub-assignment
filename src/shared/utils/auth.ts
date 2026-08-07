import { useAuthStore } from "@/stores/auth.store";

export const getAccessToken = () =>
  useAuthStore.getState().accessToken;

export const clearSession = () =>
  useAuthStore.getState().logout();

export const getCurrentUser = () =>
  useAuthStore.getState().user;

export const isAuthenticated = () =>
  useAuthStore.getState().isAuthenticated;