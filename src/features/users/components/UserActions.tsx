import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/components";
import { useAuthStore } from "@/stores/auth.store";

import type { User } from "../models/user.model";

interface UserActionsProps {
  user: User;
}

export function UserActions({
  user,
}: UserActionsProps) {
  const navigate = useNavigate();

  const currentUser = useAuthStore(
    (state) => state.user
  );

  const isAdmin = currentUser?.role === "admin";

  const handleView = () => {
    navigate(`/app/users/${user.id}`);
  };

  const handleEdit = () => {
    navigate(`/app/users/${user.id}/edit`);
  };

  const handleDelete = () => {
    // Delete logic will be added later
  };

  return (
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
            onClick={handleDelete}
          >
            Delete
          </Button>
        </>
      )}
    </div>
  );
}