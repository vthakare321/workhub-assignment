import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { QUERY_KEYS } from "@/api";

import { usersService } from "../services/users.service";

import type { User } from "../models/user.model";

type UsersListData = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const cachedUser = queryClient.getQueryData<User>(
        QUERY_KEYS.USERS.DETAIL(id)
      );

      if (cachedUser?.isLocal) {
        return {
          id,
          isLocal: true,
        };
      }

      return usersService.deleteUser(id);
    },

    onSuccess: (_, id) => {
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

          const userExists = oldData.users.some(
            (user) => user.id === id
          );

          return {
            ...oldData,
            users: oldData.users.filter(
              (user) => user.id !== id
            ),
            total: userExists
              ? Math.max(0, oldData.total - 1)
              : oldData.total,
          };
        }
      );

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.USERS.DETAIL(id),
      });

      toast.success("User deleted successfully");
    },

    onError: () => {
      toast.error("Failed to delete user");
    },
  });
}