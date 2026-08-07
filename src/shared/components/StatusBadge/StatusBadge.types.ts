import type { HTMLAttributes } from "react";

export type StatusBadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface StatusBadgeProps
  extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  variant?: StatusBadgeVariant;
}