import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { QUERY_KEYS } from "@/api";

import { usersService } from "../services/users.service";

import type { UpdateUserRequestDto } from "../dto/update-user-request.dto";
import type { User } from "../models/user.model";

type UsersListData = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

interface UpdateUserVariables {
  id: number;
  payload: UpdateUserRequestDto;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: UpdateUserVariables) =>
      usersService.updateUser(id, payload),

    onSuccess: (updatedUser, { id }) => {
      // Update every cached users-list query.
      queryClient.setQueriesData<UsersListData>(
        {
          queryKey: QUERY_KEYS.USERS.ALL,
        },
        (oldData) => {
          if (!oldData?.users) {
            return oldData;
          }

          return {
            ...oldData,
            users: oldData.users.map((user) =>
              user.id === id
                ? updatedUser
                : user
            ),
          };
        }
      );

      // Update the individual user-detail cache.
      queryClient.setQueryData<User>(
        QUERY_KEYS.USERS.DETAIL(id),
        updatedUser
      );

      toast.success("User updated successfully");
    },

    onError: () => {
      toast.error("Failed to update user");
    },
  });
}