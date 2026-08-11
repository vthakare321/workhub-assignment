import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { normalizeError } from "./errors";
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

export function onRequestError(error: AxiosError): Promise<never> {
  return Promise.reject(normalizeError(error));
}

export function onResponse<T>(
  response: AxiosResponse<T>
): AxiosResponse<T> {
  return response;
}

export function onResponseError(error: AxiosError): Promise<never> {
  const appError = normalizeError(error);

  if (appError.code === "UNAUTHORIZED") {
    clearSession();
  }

  return Promise.reject(appError);
}