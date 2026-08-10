import { useEffect } from "react";

import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Input,
  Select,
} from "@/shared/components";

import { useAuthStore } from "@/stores/auth.store";

import type { User } from "@/features/users/models/user.model";

import { workItemSchema } from "../schemas/work-item.schema";

import type { WorkItem } from "../models/work-item.model";
import type { WorkItemFormValues } from "../types/work-item-form.types";

import { ROLES } from "@/config/roles";

interface WorkItemFormProps {
  initialData?: WorkItem;
  assignees: User[];
  isSubmitting?: boolean;
  onSubmit: (
    values: WorkItemFormValues
  ) => void;
  onCancel: () => void;
}

export function WorkItemForm({
  initialData,
  assignees,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: WorkItemFormProps) {
  const currentUser = useAuthStore(
    (state) => state.user
  );

  const isContributor =
     currentUser?.role === ROLES.CONTRIBUTOR;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkItemFormValues>({
    resolver: zodResolver(workItemSchema),

    defaultValues: {
      title: "",
      completed: false,
      userId: currentUser?.id ?? 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        completed: initialData.completed,
        userId: isContributor
          ? (currentUser?.id ?? 0)
          : initialData.userId,
      });

      return;
    }

    reset({
      title: "",
      completed: false,
      userId: currentUser?.id ?? 0,
    });
  }, [
    initialData,
    currentUser?.id,
    isContributor,
    reset,
  ]);

  const handleFormSubmit: SubmitHandler<
    WorkItemFormValues
  > = (values) => {
    onSubmit({
      ...values,
      title: values.title.trim(),
      userId: isContributor
        ? (currentUser?.id ?? 0)
        : Number(values.userId),
    });
  };

  const assigneeOptions = assignees.map((user) => ({
    label: user.fullName,
    value: String(user.id),
  }));

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4"
    >
      <Input
        label="Work Item"
        placeholder="Enter work item description"
        error={errors.title?.message}
        required
        {...register("title")}
      />

      {isContributor ? (
        <Input
          label="Assignee"
          value={currentUser?.fullName ?? ""}
          disabled
        />
      ) : (
        <Select
          label="Assignee"
          error={errors.userId?.message}
          required
          {...register("userId", {
            valueAsNumber: true,
          })}
          options={[
            {
              label: "Select assignee",
              value: "",
            },
            ...assigneeOptions,
          ]}
        />
      )}

      <Select
        label="Status"
        {...register("completed", {
          setValueAs: (value) =>
            value === "true",
        })}
        options={[
          {
            label: "Pending",
            value: "false",
          },
          {
            label: "Completed",
            value: "true",
          },
        ]}
      />

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Update Work Item"
              : "Create Work Item"}
        </Button>
      </div>
    </form>
  );
}