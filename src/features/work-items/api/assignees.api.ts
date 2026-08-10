import { apiClient, ENDPOINTS } from "@/api";

import type { UsersListResponseDto } from "@/features/users/dto/users-list-response.dto";

export const assigneesApi = {
  getAssignees() {
    return apiClient.get<UsersListResponseDto>(
      ENDPOINTS.USERS.LIST,
      {
        params: {
          limit: 0,
        },
      }
    );
  },
};