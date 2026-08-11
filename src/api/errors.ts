import axios from "axios";

export type AppErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION"
  | "CONFLICT"
  | "NETWORK"
  | "UNKNOWN";

export interface AppError {
  code: AppErrorCode;
  message: string;
  status?: number;
  fieldErrors?: Record<string, string>;
  retryable?: boolean;
  cause?: unknown;
}

interface ApiErrorResponse {
  message?: unknown;
  error?: unknown;
  errors?: unknown;
  fieldErrors?: unknown;
}

const DEFAULT_MESSAGES: Record<AppErrorCode, string> = {
  UNAUTHORIZED: "Your session has expired. Please sign in again.",
  FORBIDDEN: "You do not have permission to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION: "Please check the submitted information.",
  CONFLICT: "The request conflicts with the current state.",
  NETWORK: "Unable to connect to the server. Please try again.",
  UNKNOWN: "Something went wrong. Please try again.",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function extractFieldErrors(value: unknown): Record<string, string> | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const result: Record<string, string> = {};

  for (const [field, error] of Object.entries(value)) {
    if (typeof error === "string") {
      result[field] = error;
      continue;
    }

    if (Array.isArray(error) && typeof error[0] === "string") {
      result[field] = error[0];
    }
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

function getErrorCode(status?: number): AppErrorCode {
  switch (status) {
    case 401:
      return "UNAUTHORIZED";

    case 403:
      return "FORBIDDEN";

    case 404:
      return "NOT_FOUND";

    case 400:
    case 422:
      return "VALIDATION";

    case 409:
      return "CONFLICT";

    default:
      return "UNKNOWN";
  }
}

function getResponseMessage(data: unknown): string | undefined {
  if (!isRecord(data)) {
    return undefined;
  }

  const response = data as ApiErrorResponse;

  if (typeof response.message === "string") {
    return response.message;
  }

  if (typeof response.error === "string") {
    return response.error;
  }

  return undefined;
}

function getRetryable(code: AppErrorCode, status?: number): boolean {
  if (code === "NETWORK") {
    return true;
  }

  if (status !== undefined && status >= 500) {
    return true;
  }

  if (status === 429) {
    return true;
  }

  return false;
}

export function normalizeError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const responseData = error.response?.data as unknown;

    const code =
      status === undefined ? "NETWORK" : getErrorCode(status);

    const fieldErrors =
      isRecord(responseData) &&
      "fieldErrors" in responseData
        ? extractFieldErrors(responseData.fieldErrors)
        : isRecord(responseData) && "errors" in responseData
          ? extractFieldErrors(responseData.errors)
          : undefined;

    const message =
      getResponseMessage(responseData) ??
      (code === "NETWORK" && error.message
        ? "Unable to connect to the server. Please try again."
        : DEFAULT_MESSAGES[code]);

    return {
      code,
      message,
      status,
      fieldErrors,
      retryable: getRetryable(code, status),
      cause: error,
    };
  }

  if (error instanceof Error) {
    return {
      code: "UNKNOWN",
      message: DEFAULT_MESSAGES.UNKNOWN,
      retryable: false,
      cause: error,
    };
  }

  return {
    code: "UNKNOWN",
    message: DEFAULT_MESSAGES.UNKNOWN,
    retryable: false,
    cause: error,
  };
}

export function isAppError(error: unknown): error is AppError {
  if (!isRecord(error)) {
    return false;
  }

  const validCodes: AppErrorCode[] = [
    "UNAUTHORIZED",
    "FORBIDDEN",
    "NOT_FOUND",
    "VALIDATION",
    "CONFLICT",
    "NETWORK",
    "UNKNOWN",
  ];

  return (
    typeof error.code === "string" &&
    validCodes.includes(error.code as AppErrorCode) &&
    typeof error.message === "string"
  );
}