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
    mutationFn: async ({
      id,
      payload,
    }: UpdateUserVariables) => {
      const cachedQueries =
        queryClient.getQueriesData<UsersListData>({
          queryKey: QUERY_KEYS.USERS.ALL,
        });

      for (const [, data] of cachedQueries) {
        const cachedUser = data?.users.find(
          (user) => user.id === id
        );

        if (cachedUser) {
          return {
            ...cachedUser,
            ...payload,
            fullName: `${payload.firstName} ${payload.lastName}`,
          };
        }
      }

      return usersService.updateUser(id, payload);
    },

    onSuccess: (updatedUser, { id }) => {
      queryClient.setQueriesData<UsersListData>(
        {
          queryKey: QUERY_KEYS.USERS.ALL,
        },
        (oldData) => {
          if (
            !oldData ||
            !Array.isArray(oldData.users)
          ) {
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