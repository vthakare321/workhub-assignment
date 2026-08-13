import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
  Button,
  EmptyState,
  ErrorState,
  Loader,
  PageHeader,
  Pagination,
} from "@/shared/components";

import { useAuthStore } from "@/stores/auth.store";

import { UserFilters } from "../components/UserFilters";
import { UserTable } from "../components/UserTable";
import { useUsers } from "../hooks/useUsers";
import type { UserListParams } from "../types/user-list-params";
import { parseUserListParams } from "../utils/parse-user-list-params";
import { ROUTES } from "@/shared/constants/routes";

import { usePreferencesStore } from "@/stores/preferences.store";

export default function UserListPage() {
  const [searchParams, setSearchParams] =
    useSearchParams();

    const defaultPageSize = usePreferencesStore((state)=>state.defaultPageSize)

  const params = parseUserListParams(searchParams, defaultPageSize);

  const currentUser = useAuthStore(
    (state) => state.user
  );

  const [searchValue, setSearchValue] = useState(
    params.q
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const searchQuery = searchValue.trim();

      if (searchQuery === params.q) {
        return;
      }

      const nextParams = new URLSearchParams(
        searchParams
      );

      if (searchQuery) {
        nextParams.set("q", searchQuery);
      } else {
        nextParams.delete("q");
      }

      nextParams.set("page", "1");

      setSearchParams(nextParams);
    }, 500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    searchValue,
    params.q,
    searchParams,
    setSearchParams,
  ]);

  const updateParams = (
    updates: Partial<
      Record<keyof UserListParams, string>
    >
  ) => {
    const nextParams = new URLSearchParams(
      searchParams
    );

    Object.entries(updates).forEach(
      ([key, value]) => {
        if (value) {
          nextParams.set(key, value);
        } else {
          nextParams.delete(key);
        }
      }
    );

    nextParams.set("page", "1");

    setSearchParams(nextParams);
  };

  const handlePageChange = (page: number) => {
    const nextParams = new URLSearchParams(
      searchParams
    );

    nextParams.set("page", String(page));

    setSearchParams(nextParams);
  };

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useUsers(params);

  const totalPages = data
    ? Math.ceil(data.total / params.pageSize)
    : 0;

  const hasFilters =
    params.q.trim() !== "" ||
    params.role !== "all";

  if (isLoading) {
    return <Loader size="lg" />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load users"
        description={error.message}
        action={
          <Button onClick={() => refetch()}>
            Try Again
          </Button>
        }
      />
    );
  }

  if (!data) {
    return (
      <EmptyState
        title="No users found"
        description="There are no users available."
      />
    );
  }

  return (
  <div className="space-y-4 sm:space-y-6">
    <PageHeader
      title="Users"
      description="Manage and view application users."
      rightContent={
        currentUser?.role === "admin" ? (
          <Link to={ROUTES.CREATE_USER}>
            <Button className="w-full sm:w-auto">
              Create User
            </Button>
          </Link>
        ) : null
      }
    />

    <div className="overflow-x-auto">
      <UserFilters
        searchValue={searchValue}
        role={params.role}
        sortBy={params.sortBy}
        order={params.order}
        pageSize={params.pageSize}
        onSearchChange={setSearchValue}
        onRoleChange={(value) =>
          updateParams({ role: value })
        }
        onSortByChange={(value) =>
          updateParams({ sortBy: value })
        }
        onOrderChange={(value) =>
          updateParams({ order: value })
        }
        onPageSizeChange={(value) =>
          updateParams({ pageSize: value })
        }
      />
    </div>

    <p className="text-sm text-gray-500">
      Total users: {data.total}
    </p>

    {data.users.length === 0 ? (
      <EmptyState
        title={
          hasFilters
            ? "No matching users found"
            : "No users found"
        }
        description={
          hasFilters
            ? "Try changing your search or filter criteria."
            : "There are no users available."
        }
      />
    ) : (
      <>
        <div className="overflow-x-auto">
          <UserTable users={data.users} />
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={params.page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </>
    )}
  </div>
);
}