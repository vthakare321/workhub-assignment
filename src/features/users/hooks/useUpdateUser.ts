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

      let cachedUser: User | undefined;

      for (const [, data] of cachedQueries) {
        const user = data?.users.find(
          (item) => item.id === id
        );

        if (user) {
          cachedUser = user;
          break;
        }
      }

      // Newly created users are not persisted by DummyJSON.
      // Update the local cached user instead of calling the API.
      if (cachedUser?.isLocal) {
        return {
          ...cachedUser,
          ...payload,
          fullName: `${payload.firstName} ${payload.lastName}`,
          isLocal: true,
        };
      }

      // Existing API user
      return usersService.updateUser(id, payload);
    },

    onSuccess: (updatedUser, { id }) => {
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