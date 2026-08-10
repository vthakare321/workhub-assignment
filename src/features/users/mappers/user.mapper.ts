import type { UserResponseDto } from "../dto/user-response.dto";
import type { User } from "../models/user.model";

export function toUser(dto: UserResponseDto): User {
  return {
    id: dto.id,

    firstName: dto.firstName,
    lastName: dto.lastName,
    fullName: `${dto.firstName} ${dto.lastName}`,

    email: dto.email,
    phone: dto.phone,

    age: dto.age,

    role: dto.role,

    image: dto.image,

    department: dto.company.department,
    companyName: dto.company.name,

    address: {
      address: dto.address.address,
      city: dto.address.city,
      state: dto.address.state,
      country: dto.address.country,
    },
  };
}