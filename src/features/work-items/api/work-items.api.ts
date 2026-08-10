import { apiClient, ENDPOINTS } from "@/api";

import type { WorkItemResponseDto } from "../dto/work-item-response.dto";
import type { WorkItemsListResponseDto } from "../dto/work-items-list-response.dto";

import type { CreateWorkItemRequestDto } from "../dto/create-work-item-request.dto";
import type { UpdateWorkItemRequestDto } from "../dto/update-work-item-request.dto";

export const workItemsApi = {
  getAllWorkItems() {
    return apiClient.get<WorkItemsListResponseDto>(
      ENDPOINTS.WORK_ITEMS.LIST,
      {
        params: {
          limit: 0,
        },
      }
    );
  },

  getWorkItemsByUser(userId: number) {
    return apiClient.get<WorkItemsListResponseDto>(
      ENDPOINTS.WORK_ITEMS.BY_USER(userId),
      {
        params: {
          limit: 0,
        },
      }
    );
  },

  getWorkItemById(id: number) {
    return apiClient.get<WorkItemResponseDto>(
      ENDPOINTS.WORK_ITEMS.DETAIL(id)
    );
  },

  createWorkItem(
    payload: CreateWorkItemRequestDto
  ) {
    return apiClient.post<WorkItemResponseDto>(
      ENDPOINTS.WORK_ITEMS.CREATE,
      payload
    );
  },

  updateWorkItem(
    id: number,
    payload: UpdateWorkItemRequestDto
  ) {
    return apiClient.put<WorkItemResponseDto>(
      ENDPOINTS.WORK_ITEMS.UPDATE(id),
      payload
    );
  },

  deleteWorkItem(id: number) {
    return apiClient.delete<WorkItemResponseDto>(
      ENDPOINTS.WORK_ITEMS.DELETE(id)
    );
  },
};