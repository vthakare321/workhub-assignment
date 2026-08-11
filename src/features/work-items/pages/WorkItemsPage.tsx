import { useMemo } from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  Button,
  EmptyState,
  Loader,
  Pagination,
} from "@/shared/components";

import { ROUTES } from "@/shared/constants/routes";

import { WorkItemFilters } from "../components/WorkItemFilters";
import { WorkItemsTable } from "../components/WorkItemsTable";

import { useAssignees } from "../hooks/useAssignees";
import { useWorkItems } from "../hooks/useWorkItems";

import type { WorkItem } from "../models/work-item.model";
import type { WorkItemStatus } from "../types/work-item-list-params";

import { parseWorkItemListParams } from "../utils/parse-work-item-list-params";

import { useAuthStore } from "@/stores/auth.store";

import { usePreferencesStore } from "@/stores/preferences.store";

import {
  ROLE_PERMISSIONS,
} from "@/config/role-permissions";

import {
  PERMISSIONS,
} from "@/config/permissions";

export default function WorkItemsPage() {
  const navigate = useNavigate();


  const currentUser = useAuthStore(
  (state) => state.user
);

const canCreateWorkItem =
  currentUser !== null &&
  ROLE_PERMISSIONS[currentUser.role].includes(
    PERMISSIONS.WORK_ITEMS.CREATE
  );

const defaultPageSize = usePreferencesStore(
  (state) => state.defaultPageSize
);

const canFilterByAssignee =
  currentUser?.role === "admin" ||
  currentUser?.role === "manager";

  const [searchParams, setSearchParams] =
    useSearchParams();

  const params =
    parseWorkItemListParams(searchParams);

    const pageSize =
  searchParams.has("pageSize")
    ? params.pageSize
    : defaultPageSize;

  const {
    data,
  isLoading,
  isFetching,
  isError,
  refetch,
  } = useWorkItems();

  const {
    data: assignees = [],
  } = useAssignees();

  const workItems = useMemo(
  () => data?.workItems ?? [],
  [data?.workItems]
);

 const filteredWorkItems = useMemo(() => {
  const normalizedSearch =
    params.search.toLowerCase();

  return workItems.filter((workItem) => {
    const matchesSearch =
      normalizedSearch === "" ||
      workItem.title
        .toLowerCase()
        .includes(normalizedSearch);

    const matchesStatus =
      params.status === "all" ||
      (params.status === "completed" &&
        workItem.completed) ||
      (params.status === "pending" &&
        !workItem.completed);

    const matchesAssignee =
      !params.assigneeId ||
      workItem.userId === params.assigneeId;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesAssignee
    );
  });
}, [
  workItems,
  params.search,
  params.status,
  params.assigneeId,
]);

const handleAssigneeChange = (
  value: string
) => {
  const assigneeId = Number(value);

  updateSearchParams({
    assigneeId:
      value === "" ||
      !Number.isInteger(assigneeId) ||
      assigneeId < 1
        ? undefined
        : assigneeId,
    page: 1,
  });
};

  const totalPages = Math.max(
    1,
    Math.ceil(
  filteredWorkItems.length /
  pageSize
)
  );

  const currentPage = Math.min(
    params.page,
    totalPages
  );

const paginatedWorkItems =
  filteredWorkItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const updateSearchParams = (
    updates: Record<
      string,
      string | number | undefined
    >
  ) => {
    const nextParams =
      new URLSearchParams(searchParams);

    Object.entries(updates).forEach(
      ([key, value]) => {
        if (
          value === undefined ||
          value === ""
        ) {
          nextParams.delete(key);
        } else {
          nextParams.set(
            key,
            String(value)
          );
        }
      }
    );

    setSearchParams(nextParams);
  };

  const handleSearchChange = (
    search: string
  ) => {
    updateSearchParams({
      search: search.trim() || undefined,
      page: 1,
    });
  };

  const handleStatusChange = (
    status: WorkItemStatus
  ) => {
    updateSearchParams({
      status:
        status === "all"
          ? undefined
          : status,
      page: 1,
    });
  };

  const handlePageChange = (
    page: number
  ) => {
    updateSearchParams({
      page,
    });
  };

  const handleCreate = () => {
    navigate(ROUTES.CREATE_WORK_ITEM);
  };

  const handleEdit = (
    workItem: WorkItem
  ) => {
    navigate(
      ROUTES.EDIT_WORK_ITEM.replace(
        ":id",
        String(workItem.id)
      )
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-500">
          Failed to load work items.
        </p>

        <Button
          variant="outline"
          onClick={() => refetch()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Work Items
          </h1>

          <p className="text-sm text-gray-500">
            Manage and track work items.
          </p>
        </div>

        {canCreateWorkItem && (
  <Button onClick={handleCreate}>
    Create Work Item
  </Button>
)}
      </div>

      <WorkItemFilters
        search={params.search}
  status={params.status}
  assigneeId={params.assigneeId}
  assignees={assignees}
  showAssigneeFilter={canFilterByAssignee}
  onSearchChange={handleSearchChange}
  onStatusChange={handleStatusChange}
  onAssigneeChange={handleAssigneeChange}
      />

    {isFetching && !isLoading && (
  <p
    className="text-sm text-gray-500"
    aria-live="polite"
  >
    Refreshing work items...
  </p>
)}

     {workItems.length === 0 ? (
  <EmptyState
    title="No work items"
    description="There are no work items available."
  />
) : filteredWorkItems.length === 0 ? (
  <EmptyState
    title="No matching work items"
    description="No work items match the current search or filters."
  />
) : (
  <>
    <WorkItemsTable
      workItems={paginatedWorkItems}
      assignees={assignees}
      onEdit={handleEdit}
    />

    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  </>
)}
    </div>
  );
}