import { useEffect } from "react";

import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Input,
  Select,
} from "@/shared/components";

import {
  userFormSchema,
  type UserFormValues,
} from "../schemas/user-form.schema";

interface UserFormProps {
  defaultValues?: Partial<UserFormValues>;
  submitLabel: string;
  isSubmitting?: boolean;
  onSubmit: SubmitHandler<UserFormValues>;
}

const ROLE_OPTIONS = [
  { label: "Administrator", value: "admin" },
  { label: "Manager", value: "moderator" },
  { label: "Contributor", value: "user" },
];

export function UserForm({
  defaultValues,
  submitLabel,
  isSubmitting = false,
  onSubmit,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: undefined,
      role: "user",
      department: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        age: undefined,
        role: "user",
        department: "",
        ...defaultValues,
      });
    }
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="First Name"
          required
          error={errors.firstName?.message}
          {...register("firstName")}
        />

        <Input
          label="Last Name"
          required
          error={errors.lastName?.message}
          {...register("lastName")}
        />

        <Input
          label="Email"
          type="email"
          required
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Phone"
          type="tel"
          required
          error={errors.phone?.message}
          {...register("phone")}
        />

        <Input
          label="Age"
          type="number"
          required
          error={errors.age?.message}
          {...register("age", {
            setValueAs: (value) =>
              value === "" ? undefined : Number(value),
          })}
        />

        <Select
          label="Role"
          required
          options={ROLE_OPTIONS}
          error={errors.role?.message}
          {...register("role")}
        />

        <Input
          label="Department"
          required
          error={errors.department?.message}
          {...register("department")}
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : submitLabel}
        </Button>
      </div>
    </form>
  );
}