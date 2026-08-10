import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/api";

import { usersService } from "../services/users.service";

export function useUser(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.USERS.DETAIL(id),
    queryFn: () => usersService.getUserById(id),
    enabled: Number.isFinite(id) && id > 0,
  });
}