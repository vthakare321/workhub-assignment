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
    mutationFn: async ({
      id,
      payload,
    }: UpdateWorkItemVariables) => {
      const cachedWorkItem =
        queryClient.getQueryData<WorkItem>(
          QUERY_KEYS.WORK_ITEMS.DETAIL(id)
        );

      if (cachedWorkItem?.isLocal) {
        return {
          ...cachedWorkItem,
          title: payload.todo,
          completed: payload.completed,
          userId: payload.userId,
          isLocal: true,
        };
      }

      return workItemsService.updateWorkItem(
        id,
        payload
      );
    },

    onSuccess: async (updatedWorkItem) => {
      // Update the detail cache immediately.
      queryClient.setQueryData(
        QUERY_KEYS.WORK_ITEMS.DETAIL(
          updatedWorkItem.id
        ),
        updatedWorkItem
      );

      // Refetch all-work-items cache.
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORK_ITEMS.ALL,
      });

      // Refetch contributor-specific caches.
      await queryClient.invalidateQueries({
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