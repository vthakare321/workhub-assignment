import { useState } from "react";

import {
  Button,
  ConfirmDialog,
} from "@/shared/components";

import { useAuthStore } from "@/stores/auth.store";

import { useDeleteWorkItem } from "../hooks/useDeleteWorkItem";

import type { WorkItem } from "../models/work-item.model";

interface WorkItemActionsProps {
  workItem: WorkItem;
  onEdit: (workItem: WorkItem) => void;
}

export function WorkItemActions({
  workItem,
  onEdit,
}: WorkItemActionsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState(false);

  const currentUser = useAuthStore(
    (state) => state.user
  );

  const currentUserId = currentUser?.id;
  const currentUserRole = currentUser?.role;

  const isAdminOrManager =
    currentUserRole === "admin" ||
    currentUserRole === "manager";

  const isOwner =
    currentUserId === workItem.userId;

  const canEdit =
    isAdminOrManager || isOwner;

  const canDelete = isAdminOrManager;

  const {
    mutate: deleteWorkItem,
    isPending,
  } = useDeleteWorkItem();

  const handleDelete = () => {
    deleteWorkItem(workItem.id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
      },
    });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {canEdit && (
          <Button
            variant="outline"
            onClick={() => onEdit(workItem)}
          >
            Edit
          </Button>
        )}

        {canDelete && (
          <Button
            variant="outline"
            onClick={() =>
              setIsDeleteDialogOpen(true)
            }
          >
            Delete
          </Button>
        )}
      </div>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onCancel={() =>
          setIsDeleteDialogOpen(false)
        }
        onConfirm={handleDelete}
        title="Delete Work Item"
        description={`Are you sure you want to delete "${workItem.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isPending}
      />
    </>
  );
}