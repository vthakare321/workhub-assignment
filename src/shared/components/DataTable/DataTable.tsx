import EmptyState from "../EmptyState";
import Skeleton from "../Skeleton";

import type { DataTableProps } from "./DataTable.types";

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  loading = false,
  emptyTitle = "No Data Found",
  emptyDescription,
}: DataTableProps<T>) {
  if (loading) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (data.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="border-b px-4 py-3 text-left text-sm font-semibold"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
  key={String(row[rowKey])}
  className="border-b last:border-none"
>
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className="px-4 py-3"
                >
                  {column.render
                    ? column.render(row)
                    : String(
                        row[column.key as keyof T] ?? ""
                      )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}