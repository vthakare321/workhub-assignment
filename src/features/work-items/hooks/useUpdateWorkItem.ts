import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { QUERY_KEYS } from "@/api";

import { workItemsService } from "../services/work-items.service";

import type { UpdateWorkItemRequestDto } from "../dto/update-work-item-request.dto";
import type { WorkItem } from "../models/work-item.model";

type WorkItemsListData = {
  workItems: WorkItem[];
  total: number;
  skip: number;
  limit: number;
};

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

    onSuccess: (updatedWorkItem) => {
      queryClient.setQueryData(
        QUERY_KEYS.WORK_ITEMS.DETAIL(
          updatedWorkItem.id
        ),
        updatedWorkItem
      );

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
            workItems: oldData.workItems.map(
              (workItem) =>
                workItem.id === updatedWorkItem.id
                  ? {
                      ...updatedWorkItem,
                      isLocal:
                        workItem.isLocal ??
                        updatedWorkItem.isLocal,
                    }
                  : workItem
            ),
          };
        }
      );

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

          return {
            ...oldData,
            workItems: oldData.workItems.map(
              (workItem) =>
                workItem.id === updatedWorkItem.id
                  ? {
                      ...updatedWorkItem,
                      isLocal:
                        workItem.isLocal ??
                        updatedWorkItem.isLocal,
                    }
                  : workItem
            ),
          };
        }
      );

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