import { assigneesApi } from "../api/assignees.api";

import { toUser } from "@/features/users/mappers/user.mapper";

export const assigneesService = {
  async getAssignees() {
    const { data } =
      await assigneesApi.getAssignees();

    return data.users.map(toUser);
  },
};