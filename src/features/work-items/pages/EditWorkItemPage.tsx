import { useNavigate, useParams,  Navigate, } from "react-router-dom";

import {
  Button,
  Loader,
} from "@/shared/components";

import { ROUTES } from "@/shared/constants/routes";

import { WorkItemForm } from "../components/WorkItemForm";

import { useAssignees } from "../hooks/useAssignees";
import { useUpdateWorkItem } from "../hooks/useUpdateWorkItem";
import { useWorkItem } from "../hooks/useWorkItem";

import type { WorkItemFormValues } from "../types/work-item-form.types";

import {
  toUpdateWorkItemRequest,
} from "../mappers/work-item-form.mapper";

import { useAuthStore } from "@/stores/auth.store";

import { ROLES } from "@/config/roles";

export default function EditWorkItemPage() {
  const navigate = useNavigate();

  const currentUser = useAuthStore(
  (state) => state.user
);

  const { id } = useParams();

  const workItemId = Number(id);

  const {
    data: workItem,
    isLoading: isWorkItemLoading,
    isError: isWorkItemError,
    refetch,
  } = useWorkItem(workItemId);

  const {
    data: assignees = [],
    isLoading: isAssigneesLoading,
    isError: isAssigneesError,
  } = useAssignees();

  const {
    mutate: updateWorkItem,
    isPending,
  } = useUpdateWorkItem();

  const handleSubmit = (
    values: WorkItemFormValues
  ) => {
    updateWorkItem(
      {
        id: workItemId,
        payload: toUpdateWorkItemRequest(values),
      },
      {
        onSuccess: () => {
          navigate(ROUTES.WORK_ITEMS);
        },
      }
    );
  };

  const handleCancel = () => {
    navigate(ROUTES.WORK_ITEMS);
  };

  if (
    isWorkItemLoading ||
    isAssigneesLoading
  ) {
    return <Loader />;
  }

 

  if (
    isWorkItemError ||
    isAssigneesError ||
    !workItem
  ) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-500">
          Failed to load work item.
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

const isContributor =
  currentUser?.role === ROLES.CONTRIBUTOR;

const isOwner =
  currentUser?.id === workItem.userId;

if (isContributor && !isOwner) {
  return (
    <Navigate
      to={ROUTES.FORBIDDEN}
      replace
    />
  );
}

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Edit Work Item
        </h1>

        <p className="text-sm text-gray-500">
          Update the work item details.
        </p>
      </div>

      <WorkItemForm
        initialData={workItem}
        assignees={assignees}
        isSubmitting={isPending}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}