import { ROUTES } from "@/shared/constants/routes";

interface LoginLocationState {
  from?: {
    pathname?: unknown;
    search?: unknown;
    hash?: unknown;
  };
}

function isRecord(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null
  );
}

function isLoginLocationState(
  value: unknown
): value is LoginLocationState {
  if (!isRecord(value)) {
    return false;
  }

  if (
    value.from !== undefined &&
    !isRecord(value.from)
  ) {
    return false;
  }

  if (!value.from) {
    return true;
  }

  return (
    (value.from.pathname === undefined ||
      typeof value.from.pathname === "string") &&
    (value.from.search === undefined ||
      typeof value.from.search === "string") &&
    (value.from.hash === undefined ||
      typeof value.from.hash === "string")
  );
}

export function getSafeReturnPath(
  state: unknown
): string {
  if (!isLoginLocationState(state)) {
    return ROUTES.DASHBOARD;
  }

  const pathname = state.from?.pathname;

  if (
    typeof pathname !== "string" ||
    !pathname.startsWith(ROUTES.APP)
  ) {
    return ROUTES.DASHBOARD;
  }

  const search =
    typeof state.from?.search === "string"
      ? state.from.search
      : "";

  const hash =
    typeof state.from?.hash === "string"
      ? state.from.hash
      : "";

  return `${pathname}${search}${hash}`;
}