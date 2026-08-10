import { usersApi } from "../api/users.api";

import { toUser } from "../mappers/user.mapper";

import type { CreateUserRequestDto } from "../dto/create-user-request.dto";
import type { UpdateUserRequestDto } from "../dto/update-user-request.dto";

import type { UserListParams } from "../types/user-list-params";

export const usersService = {
 async getUsers(params: UserListParams) {
  const hasSearch = params.q.trim() !== "";
  const hasRoleFilter = params.role !== "all";

  const response = hasSearch
    ? await usersApi.searchUsers(params)
    : hasRoleFilter
      ? await usersApi.filterUsers(params)
      : await usersApi.getUsers(params);

  const { data } = response;

  let users = data.users.map(toUser);

  // When search is active, apply the selected role
  // to the search results.
  if (hasSearch && hasRoleFilter) {
    users = users.filter(
      (user) => user.role === params.role
    );
  }

  return {
    users,
    total: hasSearch && hasRoleFilter
      ? users.length
      : data.total,
    skip: data.skip,
    limit: data.limit,
  };
},
  async getUserById(id: number) {
    const { data } = await usersApi.getUserById(id);

    return toUser(data);
  },

  async createUser(payload: CreateUserRequestDto) {
    const { data } = await usersApi.createUser(payload);

    return toUser(data);
  },

  async updateUser(
    id: number,
    payload: UpdateUserRequestDto
  ) {
    const { data } = await usersApi.updateUser(id, payload);

    return toUser(data);
  },

  async deleteUser(id: number) {
    const { data } = await usersApi.deleteUser(id);

    return data;
  },
};