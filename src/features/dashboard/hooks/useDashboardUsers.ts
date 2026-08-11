import { useQuery } from "@tanstack/react-query";

import { usersService } from "@/features/users/services/users.service";

export function useDashboardUsers() {
  return useQuery({
    queryKey: ["dashboard", "users"],
    queryFn: usersService.getAllUsers,
  });
}