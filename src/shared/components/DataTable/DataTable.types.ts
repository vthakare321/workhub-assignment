import type { ReactNode } from "react";

export interface DataTableColumn<T> {
  key: keyof T | string;
  title: string;
  render?: (row: T) => ReactNode;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];

  data: T[];

   rowKey: keyof T;

  loading?: boolean;

  emptyTitle?: string;

  emptyDescription?: string;
}