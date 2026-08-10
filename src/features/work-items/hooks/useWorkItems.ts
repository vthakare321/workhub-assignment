import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/api";
import { useAuthStore } from "@/stores/auth.store";

import { workItemsService } from "../services/work-items.service";

export function useWorkItems() {
  const currentUser = useAuthStore(
    (state) => state.user
  );

  const role = currentUser?.role;
  const userId = currentUser?.id;

  return useQuery({
    queryKey:
      role === "contributor" && userId
        ? QUERY_KEYS.WORK_ITEMS.BY_USER(userId)
        : QUERY_KEYS.WORK_ITEMS.ALL,

    queryFn: () => {
      if (role === "contributor" && userId) {
        return workItemsService.getWorkItemsByUser(
          userId
        );
      }

      return workItemsService.getAllWorkItems();
    },

    enabled: Boolean(currentUser),
  });
}