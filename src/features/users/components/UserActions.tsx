import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/components";
import { ROUTES } from "@/shared/constants/routes";
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

          <Button variant="outline">
            Delete
          </Button>
        </>
      )}
    </div>
  );
}