import { ROLES } from "@/config/roles";

import type { UserResponseDto } from "../dto/user-response.dto";
import type { AuthUser } from "../models/auth-user.model";

export function toAuthUser(
  dto: UserResponseDto
): AuthUser {
  return {
    id: dto.id,

    username: dto.username,

    email: dto.email,

    fullName: `${dto.firstName} ${dto.lastName}`,

    image: dto.image,

    role:
      dto.role === "admin"
        ? ROLES.ADMIN
        : dto.role === "moderator"
          ? ROLES.MANAGER
          : ROLES.CONTRIBUTOR,
  };
}