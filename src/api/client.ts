import axios from "axios";

import { API_CONFIG } from "./config";

import {
  onRequest,
  onRequestError,
  onResponse,
  onResponseError,
} from "./interceptors";

export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

apiClient.interceptors.request.use(
  onRequest,
  onRequestError
);

apiClient.interceptors.response.use(
  onResponse,
  onResponseError
);