import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/api";

import { workItemsService } from "../services/work-items.service";

export function useWorkItem(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.WORK_ITEMS.DETAIL(id),

    queryFn: () =>
      workItemsService.getWorkItemById(id),

    enabled: Number.isFinite(id) && id > 0,
  });
}