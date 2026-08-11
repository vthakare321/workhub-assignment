import { Link } from "react-router-dom";

import { EmptyState } from "@/shared/components";

import { PERMISSIONS } from "@/config/permissions";
import { ROLE_PERMISSIONS } from "@/config/role-permissions";
import { ROUTES } from "@/shared/constants/routes";

import { useAuthStore } from "@/stores/auth.store";

import type { WorkItem } from "@/features/work-items/models/work-item.model";

interface RecentWorkItemsProps {
  workItems: WorkItem[];
}

export function RecentWorkItems({
  workItems,
}: RecentWorkItemsProps) {
  const currentUser = useAuthStore(
    (state) => state.user
  );

  const canUpdateWorkItems =
    currentUser !== null &&
    ROLE_PERMISSIONS[currentUser.role].includes(
      PERMISSIONS.WORK_ITEMS.UPDATE
    );

  if (workItems.length === 0) {
    return (
      <EmptyState
        title="No recent work items"
        description="There are no work items to display."
      />
    );
  }

  return (
    <div className="rounded-lg border bg-white">
      <div className="border-b p-5">
        <h2 className="text-lg font-semibold">
          Recent Work Items
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          The five most recent work items.
        </p>
      </div>

      <div className="divide-y">
        {workItems.map((workItem) => (
          <div
            key={workItem.id}
            className="flex items-center justify-between gap-4 p-5"
          >
            <div className="min-w-0">
              <p className="truncate font-medium">
                {workItem.title}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {workItem.completed
                  ? "Completed"
                  : "Pending"}
              </p>
            </div>

            {canUpdateWorkItems ? (
              <Link
                to={ROUTES.EDIT_WORK_ITEM.replace(
                  ":id",
                  String(workItem.id)
                )}
                className="shrink-0 text-sm font-medium text-blue-600 hover:underline"
              >
                View
              </Link>
            ) : (
              <Link
                to={ROUTES.WORK_ITEMS}
                className="shrink-0 text-sm font-medium text-blue-600 hover:underline"
              >
                View
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}