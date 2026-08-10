import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { QUERY_KEYS } from "@/api";

import { usersService } from "../services/users.service";

import type { CreateUserRequestDto } from "../dto/create-user-request.dto";

import type { User } from "../models/user.model";

type UsersListData = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserRequestDto) =>
      usersService.createUser(payload),

   onSuccess: (createdUser) => {
  queryClient.setQueriesData<UsersListData>(
    {
      queryKey: QUERY_KEYS.USERS.ALL,
    },
    (oldData) => {
      if (!oldData) {
        return oldData;
      }

      return {
        ...oldData,
        users: [createdUser, ...oldData.users],
        total: oldData.total + 1,
      };
    }
  );

  toast.success("User created successfully");
},

    onError: () => {
      toast.error("Failed to create user");
    },
  });
}