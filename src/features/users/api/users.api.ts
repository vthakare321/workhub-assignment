import { apiClient, ENDPOINTS } from "@/api";

import type { UserResponseDto } from "../dto/user-response.dto";
import type { UsersListResponseDto } from "../dto/users-list-response.dto";
import type { CreateUserRequestDto } from "../dto/create-user-request.dto";
import type { UpdateUserRequestDto } from "../dto/update-user-request.dto";
import type { UserListParams } from "../types/user-list-params";

export const usersApi = {
  getUsers(params: UserListParams) {
    const skip = (params.page - 1) * params.pageSize;

    return apiClient.get<UsersListResponseDto>(
      ENDPOINTS.USERS.LIST,
      {
        params: {
          limit: params.pageSize,
          skip,
          sortBy: params.sortBy,
          order: params.order,
        },
      }
    );
  },

  searchUsers(params: UserListParams) {
    const skip = (params.page - 1) * params.pageSize;

    return apiClient.get<UsersListResponseDto>(
      ENDPOINTS.USERS.SEARCH,
      {
        params: {
          q: params.q,
          limit: params.pageSize,
          skip,
          sortBy: params.sortBy,
          order: params.order,
        },
      }
    );
  },


  filterUsers(params: UserListParams) {
  const skip = (params.page - 1) * params.pageSize;

  return apiClient.get<UsersListResponseDto>(
    ENDPOINTS.USERS.FILTER,
    {
      params: {
        key: "role",
        value: params.role,
        limit: params.pageSize,
        skip,
        sortBy: params.sortBy,
        order: params.order,
      },
    }
  );
},

  getUserById(id: number) {
    return apiClient.get<UserResponseDto>(
      ENDPOINTS.USERS.DETAIL(id)
    );
  },

  createUser(payload: CreateUserRequestDto) {
    return apiClient.post<UserResponseDto>(
      ENDPOINTS.USERS.CREATE,
      payload
    );
  },

  updateUser(
  id: number,
  payload: UpdateUserRequestDto
) {
  return apiClient.patch(
    ENDPOINTS.USERS.UPDATE(id),
    payload
  );
},

  deleteUser(id: number) {
    return apiClient.delete<UserResponseDto>(
      ENDPOINTS.USERS.DELETE(id)
    );
  },
};