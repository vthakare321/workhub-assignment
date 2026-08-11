import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { QUERY_KEYS } from "@/api";

import { workItemsService } from "../services/work-items.service";

import type { UpdateWorkItemRequestDto } from "../dto/update-work-item-request.dto";
import type { WorkItem } from "../models/work-item.model";

interface UpdateWorkItemVariables {
  id: number;
  payload: UpdateWorkItemRequestDto;
}

export function useUpdateWorkItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: UpdateWorkItemVariables) =>
      workItemsService.updateWorkItem(id, payload),

    onSuccess: (updatedWorkItem) => {
      // Update the detail cache immediately.
      queryClient.setQueryData<WorkItem>(
        QUERY_KEYS.WORK_ITEMS.DETAIL(
          updatedWorkItem.id
        ),
        updatedWorkItem
      );

      // Refresh all work-item queries.
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORK_ITEMS.ALL,
      });

      // Refresh contributor-specific work-item queries.
      queryClient.invalidateQueries({
        queryKey: ["work-items", "user"],
      });

      toast.success(
        "Work item updated successfully"
      );
    },

    onError: () => {
      toast.error(
        "Failed to update work item"
      );
    },
  });
}