import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  ConfirmDialog,
} from "@/shared/components";

import { ROUTES } from "@/shared/constants/routes";
import { useAuthStore } from "@/stores/auth.store";

import { useDeleteUser } from "../hooks/useDeleteUser";

import type { User } from "../models/user.model";

interface UserActionsProps {
  user: User;
}

export function UserActions({
  user,
}: UserActionsProps) {
  const navigate = useNavigate();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState(false);

  const currentUser = useAuthStore(
    (state) => state.user
  );

  const isAdmin = currentUser?.role === "admin";

  const {
    mutate: deleteUser,
    isPending,
  } = useDeleteUser();

  const handleView = () => {
    navigate(
      ROUTES.USER_DETAIL.replace(
        ":id",
        String(user.id)
      )
    );
  };

  const handleEdit = () => {
    navigate(
      ROUTES.EDIT_USER.replace(
        ":id",
        String(user.id)
      )
    );
  };

  const handleDelete = () => {
    deleteUser(user.id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
      },
    });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={handleView}
        >
          View
        </Button>

        {isAdmin && (
          <>
            <Button
              variant="outline"
              onClick={handleEdit}
            >
              Edit
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                setIsDeleteDialogOpen(true)
              }
            >
              Delete
            </Button>
          </>
        )}
      </div>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onCancel={() =>
          setIsDeleteDialogOpen(false)
        }
        onConfirm={handleDelete}
        title="Delete User"
        description={`Are you sure you want to delete ${user.fullName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isPending}
      />
    </>
  );
}