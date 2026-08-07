export interface AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  role: string;
}