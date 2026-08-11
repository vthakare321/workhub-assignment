{protectedRoutes
  .filter((route) => route.navigation)
  .map((route) => {
    const navigation = route.navigation;

    if (!navigation) {
      return null;
    }

    const hasPermission =
      allowedPermissions.includes(
        navigation.permission
      );

    if (!hasPermission) {
      return null;
    }

    return (
      <NavLink
        key={route.path}
        to={route.path}
        end={route.path === "dashboard"}
        title={
          sidebarCollapsed
            ? navigation.label
            : undefined
        }
        className={({ isActive }) =>
          `relative rounded-lg px-4 py-3 font-medium transition ${
            isActive
              ? "bg-blue-600 font-semibold text-white before:absolute before:left-0 before:top-1/2 before:h-6 before:w-1 before:-translate-y-1/2 before:rounded-r"
              : "text-gray-700 hover:bg-gray-100"
          } ${
            sidebarCollapsed
              ? "text-center"
              : ""
          }`
        }
      >
        {sidebarCollapsed
          ? navigation.label.charAt(0)
          : navigation.label}
      </NavLink>
    );
  })}