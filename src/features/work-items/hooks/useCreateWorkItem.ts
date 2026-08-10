import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { QUERY_KEYS } from "@/api";

import { workItemsService } from "../services/work-items.service";

import type { CreateWorkItemRequestDto } from "../dto/create-work-item-request.dto";
import type { WorkItem } from "../models/work-item.model";

type WorkItemsListData = {
  workItems: WorkItem[];
  total: number;
  skip: number;
  limit: number;
};

export function useCreateWorkItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      payload: CreateWorkItemRequestDto
    ) => workItemsService.createWorkItem(payload),

    onSuccess: (createdWorkItem, payload) => {
      const localWorkItem: WorkItem = {
        ...createdWorkItem,

        // Preserve submitted values because
        // DummyJSON mutations are simulated.
        title: payload.todo,
        completed: payload.completed,
        userId: payload.userId,
        isLocal: true,
      };

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

          return {
            ...oldData,
            workItems: [
              localWorkItem,
              ...oldData.workItems,
            ],
            total: oldData.total + 1,
          };
        }
      );

      // Also update contributor-specific cache
      queryClient.setQueriesData<WorkItemsListData>(
        {
          queryKey: QUERY_KEYS.WORK_ITEMS.BY_USER(
            payload.userId
          ),
        },
        (oldData) => {
          if (
            !oldData ||
            !Array.isArray(oldData.workItems)
          ) {
            return oldData;
          }

          return {
            ...oldData,
            workItems: [
              localWorkItem,
              ...oldData.workItems,
            ],
            total: oldData.total + 1,
          };
        }
      );

      // Store detail cache for the newly created item
      queryClient.setQueryData(
        QUERY_KEYS.WORK_ITEMS.DETAIL(
          localWorkItem.id
        ),
        localWorkItem
      );

      toast.success(
        "Work item created successfully"
      );
    },

    onError: () => {
      toast.error(
        "Failed to create work item"
      );
    },
  });
}