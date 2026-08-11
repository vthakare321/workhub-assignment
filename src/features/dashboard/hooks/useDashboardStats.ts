import { useMemo } from "react";

import { useDashboardUsers } from "./useDashboardUsers";

import { useWorkItems } from "@/features/work-items/hooks/useWorkItems";

import { DASHBOARD_API_ROLES } from "../constants/dashboard.constants";

export function useDashboardStats() {
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
    refetch: refetchUsers,
  } = useDashboardUsers();

  const {
    data: workItemsData,
    isLoading: isWorkItemsLoading,
    isError: isWorkItemsError,
    refetch: refetchWorkItems,
  } = useWorkItems();

  const stats = useMemo(() => {
    const users = usersData?.users ?? [];
    const workItems =
      workItemsData?.workItems ?? [];

    const totalUsers =
      usersData?.total ?? users.length;

    const admins = users.filter(
      (user) =>
        user.role === DASHBOARD_API_ROLES.ADMIN
    ).length;

    const managers = users.filter(
      (user) =>
        user.role === DASHBOARD_API_ROLES.MANAGER
    ).length;

    const contributors = users.filter(
      (user) =>
        user.role ===
        DASHBOARD_API_ROLES.CONTRIBUTOR
    ).length;

    const totalWorkItems =
      workItemsData?.total ?? workItems.length;

    const completedWorkItems =
      workItems.filter(
        (workItem) => workItem.completed
      ).length;

    const pendingWorkItems =
      workItems.filter(
        (workItem) => !workItem.completed
      ).length;

    const recentWorkItems = [...workItems]
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);

    return {
      totalUsers,
      admins,
      managers,
      contributors,
      totalWorkItems,
      completedWorkItems,
      pendingWorkItems,
      recentWorkItems,
    };
  }, [usersData, workItemsData]);

  const isLoading =
    isUsersLoading || isWorkItemsLoading;

  const isError =
    isUsersError || isWorkItemsError;

  const refetch = () => {
    void refetchUsers();
    void refetchWorkItems();
  };

  return {
    stats,
    isLoading,
    isError,
    refetch,
  };
}