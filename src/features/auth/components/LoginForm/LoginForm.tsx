import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input } from "@/shared/components";

import {
  loginSchema,
  type LoginFormValues,
} from "../../schemas/login.schema";

import type { LoginFormProps } from "./LoginForm.types";

export default function LoginForm({
  onSubmit,
  isLoading = false,
}: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        id="username"
        label="Username"
        placeholder="Enter your username"
        required
        error={errors.username?.message}
        {...register("username")}
      />

      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        required
        error={errors.password?.message}
        {...register("password")}
      />

      <Button
        type="submit"
        loading={isLoading}
        fullWidth
      >
        Login
      </Button>
    </form>
  );
}