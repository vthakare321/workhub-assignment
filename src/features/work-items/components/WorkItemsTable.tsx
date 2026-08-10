import { DataTable } from "@/shared/components";

import { WorkItemActions } from "./WorkItemActions";

import type { User } from "@/features/users/models/user.model";
import type { WorkItem } from "../models/work-item.model";

interface WorkItemsTableProps {
  workItems: WorkItem[];
  assignees: User[];
  loading?: boolean;
  onEdit: (workItem: WorkItem) => void;
}

export function WorkItemsTable({
  workItems,
  assignees,
  loading = false,
   onEdit,
}: WorkItemsTableProps) {
  const columns = [
    {
      key: "title",
      title: "Description",
      render: (workItem: WorkItem) => (
        <span>{workItem.title}</span>
      ),
    },
    {
      key: "userId",
      title: "Assignee",
      render: (workItem: WorkItem) => {
        const assignee = assignees.find(
          (user) => user.id === workItem.userId
        );

        return (
          <span>
            {assignee?.fullName ?? "Unassigned"}
          </span>
        );
      },
    },
    {
      key: "completed",
      title: "Status",
      render: (workItem: WorkItem) => (
        <span>
          {workItem.completed
            ? "Completed"
            : "Pending"}
        </span>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (workItem: WorkItem) => (
        <WorkItemActions workItem={workItem}  onEdit={onEdit} />
      ),
    },
  ];

  return (
    <DataTable<WorkItem>
      columns={columns}
      data={workItems}
      rowKey="id"
      loading={loading}
      emptyTitle="No work items found"
      emptyDescription="There are no work items matching the current criteria."
    />
  );
}