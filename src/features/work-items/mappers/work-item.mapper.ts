import type { WorkItemResponseDto } from "../dto/work-item-response.dto";

import type { WorkItem } from "../models/work-item.model";

export function toWorkItem(
  dto: WorkItemResponseDto
): WorkItem {
  return {
    id: dto.id,
    title: dto.todo,
    completed: dto.completed,
    userId: dto.userId,
  };
}