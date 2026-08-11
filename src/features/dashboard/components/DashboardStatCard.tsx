interface DashboardStatCardProps {
  label: string;
  value: number;
}

export function DashboardStatCard({
  label,
  value,
}: DashboardStatCardProps) {
  return (
    <div className="rounded-lg border bg-white p-5">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-semibold">
        {value}
      </p>
    </div>
  );
}