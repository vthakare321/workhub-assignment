import type { LoginResponseDto } from "../dto/login-response.dto";
import type { AuthUser } from "../models/auth-user.model";

export function toAuthUser(
  dto: LoginResponseDto
): AuthUser {
  return {
    id: dto.id,
    username: dto.username,
    email: dto.email,
    fullName: `${dto.firstName} ${dto.lastName}`,
    image: dto.image,
    role: dto.role,
  };
}