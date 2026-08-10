import { workItemsApi } from "../api/work-items.api";

import { toWorkItem } from "../mappers/work-item.mapper";

import type { CreateWorkItemRequestDto } from "../dto/create-work-item-request.dto";
import type { UpdateWorkItemRequestDto } from "../dto/update-work-item-request.dto";

export const workItemsService = {
  async getAllWorkItems() {
    const { data } =
      await workItemsApi.getAllWorkItems();

    return {
      workItems: data.todos.map(toWorkItem),
      total: data.total,
      skip: data.skip,
      limit: data.limit,
    };
  },

  async getWorkItemsByUser(userId: number) {
    const { data } =
      await workItemsApi.getWorkItemsByUser(userId);

    return {
      workItems: data.todos.map(toWorkItem),
      total: data.total,
      skip: data.skip,
      limit: data.limit,
    };
  },

  async getWorkItemById(id: number) {
    const { data } =
      await workItemsApi.getWorkItemById(id);

    return toWorkItem(data);
  },

  async createWorkItem(
    payload: CreateWorkItemRequestDto
  ) {
    const { data } =
      await workItemsApi.createWorkItem(payload);

    return toWorkItem(data);
  },

  async updateWorkItem(
    id: number,
    payload: UpdateWorkItemRequestDto
  ) {
    const { data } =
      await workItemsApi.updateWorkItem(
        id,
        payload
      );

    return toWorkItem(data);
  },

  async deleteWorkItem(id: number) {
    const { data } =
      await workItemsApi.deleteWorkItem(id);

    return data;
  },
};