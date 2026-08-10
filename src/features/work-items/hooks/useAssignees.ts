import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/api";

import { assigneesService } from "../services/assignees.service";

export function useAssignees() {
  return useQuery({
    queryKey: QUERY_KEYS.WORK_ITEMS.ASSIGNEES,

    queryFn: () =>
      assigneesService.getAssignees(),
  });
}