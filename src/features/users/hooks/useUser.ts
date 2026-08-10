import { useQuery, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/api";

import { usersService } from "../services/users.service";

import type { User } from "../models/user.model";

type UsersListData = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

export function useUser(id: number) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: QUERY_KEYS.USERS.DETAIL(id),

    queryFn: async () => {
      const cachedQueries =
        queryClient.getQueriesData<UsersListData>({
          queryKey: QUERY_KEYS.USERS.ALL,
        });

      for (const [, data] of cachedQueries) {
        const cachedUser = data?.users.find(
          (user) => user.id === id
        );

        if (cachedUser) {
          return cachedUser;
        }
      }

      return usersService.getUserById(id);
    },

    enabled: Number.isFinite(id) && id > 0,
  });
}