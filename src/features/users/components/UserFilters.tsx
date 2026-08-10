import { Input, Select } from "@/shared/components";

interface UserFiltersProps {
  searchValue: string;
  role: string;
  sortBy: string;
  order: string;
  pageSize: number;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onOrderChange: (value: string) => void;
  onPageSizeChange: (value: string) => void;
}

const ROLE_OPTIONS = [
  { label: "All Roles", value: "all" },
  { label: "Administrator", value: "admin" },
  { label: "Manager", value: "moderator" },
  { label: "Contributor", value: "user" },
];

const SORT_OPTIONS = [
  { label: "Name", value: "firstName" },
  { label: "Age", value: "age" },
];

const ORDER_OPTIONS = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

const PAGE_SIZE_OPTIONS = [
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "30", value: "30" },
];

export function UserFilters({
  searchValue,
  role,
  sortBy,
  order,
  pageSize,
  onSearchChange,
  onRoleChange,
  onSortByChange,
  onOrderChange,
  onPageSizeChange,
}: UserFiltersProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Input
        label="Search"
        placeholder="Search users..."
        value={searchValue}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
      />

      <Select
        label="Role"
        value={role}
        options={ROLE_OPTIONS}
        onChange={(event) =>
          onRoleChange(event.target.value)
        }
      />

      <Select
        label="Sort By"
        value={sortBy}
        options={SORT_OPTIONS}
        onChange={(event) =>
          onSortByChange(event.target.value)
        }
      />

      <Select
        label="Order"
        value={order}
        options={ORDER_OPTIONS}
        onChange={(event) =>
          onOrderChange(event.target.value)
        }
      />

      <Select
        label="Page Size"
        value={String(pageSize)}
        options={PAGE_SIZE_OPTIONS}
        onChange={(event) =>
          onPageSizeChange(event.target.value)
        }
      />
    </div>
  );
}