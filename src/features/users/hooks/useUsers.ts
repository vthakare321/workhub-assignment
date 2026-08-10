import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/api/queryKeys";

import { usersService } from "../services/users.service";
import type { UserListParams } from "../types/user-list-params";

export function useUsers(params: UserListParams) {
  return useQuery({
    queryKey: QUERY_KEYS.USERS.LIST(params),

    queryFn: () => usersService.getUsers(params),
  });
}