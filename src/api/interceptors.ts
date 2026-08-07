import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { ApiError } from "./errors";
import {
  clearSession,
  getAccessToken,
} from "@/shared/utils/auth";

export function onRequest(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

export function onRequestError(error: AxiosError) {
  return Promise.reject(error);
}

export function onResponse<T>(
  response: AxiosResponse<T>
): AxiosResponse<T> {
  return response;
}

export function onResponseError(error: AxiosError) {
  const status = error.response?.status;

  const message =
    (error.response?.data as { message?: string })?.message ??
    error.message ??
    "Something went wrong";

  if (status === 401) {
    clearSession();
  }

  return Promise.reject(new ApiError(message, status));
}