import { useNavigate } from "react-router-dom";

import { Loader } from "@/shared/components";
import { ROUTES } from "@/shared/constants/routes";

import { WorkItemForm } from "../components/WorkItemForm";

import { useAssignees } from "../hooks/useAssignees";
import { useCreateWorkItem } from "../hooks/useCreateWorkItem";

import type { WorkItemFormValues } from "../types/work-item-form.types";

import {
  toCreateWorkItemRequest,
} from "../mappers/work-item-form.mapper";

export default function CreateWorkItemPage() {
  const navigate = useNavigate();

  const {
    data: assignees = [],
    isLoading: isAssigneesLoading,
  } = useAssignees();

  const {
    mutate: createWorkItem,
    isPending,
  } = useCreateWorkItem();

  const handleSubmit = (
    values: WorkItemFormValues
  ) => {
    createWorkItem(
  toCreateWorkItemRequest(values),
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

  if (isAssigneesLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Create Work Item
        </h1>

        <p className="text-sm text-gray-500">
          Add a new work item and assign it to a user.
        </p>
      </div>

      <WorkItemForm
        assignees={assignees}
        isSubmitting={isPending}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}