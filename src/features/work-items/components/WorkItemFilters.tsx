import {
  Input,
  Select,
} from "@/shared/components";

import type { User } from "@/features/users/models/user.model";

import type {
  WorkItemStatus,
} from "../types/work-item-list-params";

interface WorkItemFiltersProps {
  search: string;
  status: WorkItemStatus;

  assigneeId?: number;
  assignees: User[];
  showAssigneeFilter: boolean;

  onSearchChange: (value: string) => void;

  onStatusChange: (
    value: WorkItemStatus
  ) => void;

  onAssigneeChange: (
    value: string
  ) => void;
}

export function WorkItemFilters({
  search,
  status,
  assigneeId,
  assignees,
  showAssigneeFilter,
  onSearchChange,
  onStatusChange,
  onAssigneeChange,
}: WorkItemFiltersProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
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

      {showAssigneeFilter && (
        <Select
          label="Assignee"
          value={
            assigneeId
              ? String(assigneeId)
              : ""
          }
          onChange={(event) =>
            onAssigneeChange(event.target.value)
          }
          options={[
            {
              label: "All Assignees",
              value: "",
            },
            ...assignees.map((user) => ({
              label: user.fullName,
              value: String(user.id),
            })),
          ]}
        />
      )}
    </div>
  );
}