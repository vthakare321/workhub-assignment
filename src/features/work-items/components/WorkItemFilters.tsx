import {
  Input,
  Select,
} from "@/shared/components";

import type {
  WorkItemStatus,
} from "../types/work-item-list-params";

interface WorkItemFiltersProps {
  search: string;
  status: WorkItemStatus;
  onSearchChange: (value: string) => void;
  onStatusChange: (
    value: WorkItemStatus
  ) => void;
}

export function WorkItemFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: WorkItemFiltersProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Input
        label="Search"
        placeholder="Search work items..."
        value={search}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
      />

      <Select
        label="Status"
        value={status}
        onChange={(event) =>
          onStatusChange(
            event.target.value as WorkItemStatus
          )
        }
        options={[
          {
            label: "All",
            value: "all",
          },
          {
            label: "Pending",
            value: "pending",
          },
          {
            label: "Completed",
            value: "completed",
          },
        ]}
      />
    </div>
  );
}