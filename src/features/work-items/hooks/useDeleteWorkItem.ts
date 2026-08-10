import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { QUERY_KEYS } from "@/api";

import { workItemsService } from "../services/work-items.service";

import type { WorkItem } from "../models/work-item.model";

type WorkItemsListData = {
  workItems: WorkItem[];
  total: number;
  skip: number;
  limit: number;
};

export function useDeleteWorkItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const cachedWorkItem =
        queryClient.getQueryData<WorkItem>(
          QUERY_KEYS.WORK_ITEMS.DETAIL(id)
        );

      if (cachedWorkItem?.isLocal) {
        return {
          id,
          isLocal: true,
        };
      }

      return workItemsService.deleteWorkItem(id);
    },

    onSuccess: (_, id) => {
      // Update all work items cache.
      queryClient.setQueriesData<WorkItemsListData>(
        {
          queryKey: QUERY_KEYS.WORK_ITEMS.ALL,
        },
        (oldData) => {
          if (
            !oldData ||
            !Array.isArray(oldData.workItems)
          ) {
            return oldData;
          }

          const workItemExists =
            oldData.workItems.some(
              (workItem) => workItem.id === id
            );

          return {
            ...oldData,
            workItems: oldData.workItems.filter(
              (workItem) => workItem.id !== id
            ),
            total: workItemExists
              ? Math.max(
                  0,
                  oldData.total - 1
                )
              : oldData.total,
          };
        }
      );

      // Update contributor-specific work items caches.
      queryClient.setQueriesData<WorkItemsListData>(
        {
          queryKey: ["work-items", "user"],
        },
        (oldData) => {
          if (
            !oldData ||
            !Array.isArray(oldData.workItems)
          ) {
            return oldData;
          }

          const workItemExists =
            oldData.workItems.some(
              (workItem) => workItem.id === id
            );

          return {
            ...oldData,
            workItems: oldData.workItems.filter(
              (workItem) => workItem.id !== id
            ),
            total: workItemExists
              ? Math.max(
                  0,
                  oldData.total - 1
                )
              : oldData.total,
          };
        }
      );

      // Remove detail cache.
      queryClient.removeQueries({
        queryKey:
          QUERY_KEYS.WORK_ITEMS.DETAIL(id),
      });

      toast.success(
        "Work item deleted successfully"
      );
    },

    onError: () => {
      toast.error(
        "Failed to delete work item"
      );
    },
  });
}