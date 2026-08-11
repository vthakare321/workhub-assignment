import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/api/queryKeys";

import { usersService } from "@/features/users/services/users.service";

import type { UserListParams } from "@/features/users/types/user-list-params";

const DASHBOARD_USERS_PARAMS: UserListParams = {
  page: 1,
  pageSize: 30,
  q: "",
  role: "all",
  sortBy: "firstName",
  order: "asc",
};

export function useDashboardUsers() {
  return useQuery({
    queryKey:
      QUERY_KEYS.USERS.LIST(
        DASHBOARD_USERS_PARAMS
      ),

    queryFn: () =>
      usersService.getUsers(
        DASHBOARD_USERS_PARAMS
      ),

    staleTime: 5 * 60 * 1000,
  });
}