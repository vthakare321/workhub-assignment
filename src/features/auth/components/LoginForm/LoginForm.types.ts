import type { LoginFormValues } from "../../schemas/login.schema";

export interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  isLoading?: boolean;
}