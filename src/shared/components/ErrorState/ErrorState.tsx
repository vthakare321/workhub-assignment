import type { ErrorStateProps } from "./ErrorState.types";

export default function ErrorState({
  title = "Something went wrong",
  description,
  action,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-10 text-center">
      <h2 className="text-lg font-semibold text-red-600">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-sm text-red-500">
          {description}
        </p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}