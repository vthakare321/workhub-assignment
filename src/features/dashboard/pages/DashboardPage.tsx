import {
  Button,
  ErrorState,
  Skeleton,
} from "@/shared/components";

import { ROLES } from "@/config/roles";
import { useAuthStore } from "@/stores/auth.store";

import { DashboardStatCard } from "../components/DashboardStatCard";
import { RecentWorkItems } from "../components/RecentWorkItems";
import { useDashboardStats } from "../hooks/useDashboardStats";

export default function DashboardPage() {
  const currentUser = useAuthStore(
    (state) => state.user
  );

  const {
    stats,
    isLoading,
    isError,
    refetch,
  } = useDashboardStats();

  const isContributor =
    currentUser?.role === ROLES.CONTRIBUTOR;

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-72" />
        </div>

        {/* User Summary Skeleton */}
        <section className="space-y-4">
          <Skeleton className="h-6 w-32" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
          </div>
        </section>

        {/* Work Item Summary Skeleton */}
        <section className="space-y-4">
          <Skeleton className="h-6 w-40" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
          </div>
        </section>

        {/* Recent Work Items Skeleton */}
        <section className="rounded-lg border bg-white">
          <div className="space-y-2 border-b p-5">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>

          <div className="divide-y">
            {Array.from({ length: 5 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 p-5"
                >
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-24" />
                  </div>

                  <Skeleton className="h-4 w-12" />
                </div>
              )
            )}
          </div>
        </section>
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load dashboard"
        description="We couldn't load the dashboard data. Please try again."
        action={
          <Button
            variant="outline"
            onClick={() => void refetch()}
          >
            Try Again
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Overview of users and work items.
        </p>
      </div>

      {/* User Summary */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          User Summary
        </h2>

        {isContributor ? (
          <div className="rounded-lg border bg-white p-5">
            <p className="text-sm text-gray-500">
              Account
            </p>

            <p className="mt-2 text-xl font-semibold">
              {currentUser?.fullName ?? "User"}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {currentUser?.email ?? ""}
            </p>

            <p className="mt-3 text-sm">
              Role: Contributor
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardStatCard
              label="Total Users"
              value={stats.totalUsers}
            />

            <DashboardStatCard
              label="Administrators"
              value={stats.admins}
            />

            <DashboardStatCard
              label="Managers"
              value={stats.managers}
            />

            <DashboardStatCard
              label="Contributors"
              value={stats.contributors}
            />
          </div>
        )}
      </section>

      {/* Work Item Summary */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          Work Item Summary
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardStatCard
            label="Total Work Items"
            value={stats.totalWorkItems}
          />

          <DashboardStatCard
            label="Completed"
            value={stats.completedWorkItems}
          />

          <DashboardStatCard
            label="Pending"
            value={stats.pendingWorkItems}
          />
        </div>
      </section>

      {/* Recent Work Items */}
      <section>
        <RecentWorkItems
          workItems={stats.recentWorkItems}
        />
      </section>
    </div>
  );
}