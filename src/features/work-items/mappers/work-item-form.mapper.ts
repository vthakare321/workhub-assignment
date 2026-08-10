import type { CreateWorkItemRequestDto } from "../dto/create-work-item-request.dto";
import type { UpdateWorkItemRequestDto } from "../dto/update-work-item-request.dto";

export interface WorkItemFormValues {
  title: string;
  completed: boolean;
  userId: number;
}

export function toCreateWorkItemRequest(
  values: WorkItemFormValues
): CreateWorkItemRequestDto {
  return {
    todo: values.title.trim(),
    completed: values.completed,
    userId: values.userId,
  };
}

export function toUpdateWorkItemRequest(
  values: WorkItemFormValues
): UpdateWorkItemRequestDto {
  return {
    todo: values.title.trim(),
    completed: values.completed,
    userId: values.userId,
  };
}