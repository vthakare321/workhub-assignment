import type { UserResponseDto } from "./user-response.dto";

export interface UsersListResponseDto {
  users: UserResponseDto[];
  total: number;
  skip: number;
  limit: number;
}