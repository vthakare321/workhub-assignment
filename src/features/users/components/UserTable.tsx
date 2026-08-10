import {
  DataTable,
  StatusBadge,
} from "@/shared/components";

import type { DataTableColumn } from "@/shared/components";

import type { User } from "../models/user.model";

import { UserActions } from "./UserActions";

interface UserTableProps {
  users: User[];
}

const ROLE_LABELS = {
  admin: "Administrator",
  moderator: "Manager",
  user: "Contributor",
} as const;

const columns: DataTableColumn<User>[] = [
  {
    key: "fullName",
    title: "User",
    render: (user) => (
      <div className="flex items-center gap-3">
        <img
          src={user.image}
          alt={user.fullName}
          className="h-10 w-10 rounded-full object-cover"
        />

        <p className="font-medium">
          {user.fullName}
        </p>
      </div>
    ),
  },
  {
    key: "email",
    title: "Email",
  },
  {
    key: "age",
    title: "Age",
  },
  {
    key: "role",
    title: "Role",
    render: (user) => (
      <StatusBadge
        label={ROLE_LABELS[user.role]}
        variant="info"
      />
    ),
  },
  {
    key: "actions",
    title: "Actions",
    render: (user) => (
      <UserActions user={user} />
    ),
  },
];

export function UserTable({
  users,
}: UserTableProps) {
  return (
    <DataTable<User>
      columns={columns}
      data={users}
      rowKey="id"
      emptyTitle="No users found"
      emptyDescription="There are no users matching the current criteria."
    />
  );
}