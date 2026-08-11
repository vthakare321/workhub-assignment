import {
  Select,
} from "@/shared/components";

import {
  usePreferencesStore,
  type PageSize,
  type Theme,
} from "@/stores/preferences.store";

const THEME_OPTIONS = [
  {
    label: "System",
    value: "system",
  },
  {
    label: "Light",
    value: "light",
  },
  {
    label: "Dark",
    value: "dark",
  },
];

const PAGE_SIZE_OPTIONS = [
  {
    label: "10",
    value: "10",
  },
  {
    label: "20",
    value: "20",
  },
  {
    label: "30",
    value: "30",
  },
];

export default function SettingsPage() {
  const {
    theme,
    sidebarCollapsed,
    defaultPageSize,
    setTheme,
    toggleSidebar,
    setDefaultPageSize,
  } = usePreferencesStore();

  const handleThemeChange = (
    value: string
  ) => {
    if (
      value === "light" ||
      value === "dark" ||
      value === "system"
    ) {
      setTheme(value as Theme);
    }
  };

  const handlePageSizeChange = (
    value: string
  ) => {
    const pageSize = Number(value);

    if (
      pageSize === 10 ||
      pageSize === 20 ||
      pageSize === 30
    ) {
      setDefaultPageSize(
        pageSize as PageSize
      );
    }
  };

  return (
    <div className="space-y-6">

      <div className="rounded-lg bg-white p-6 text-black dark:bg-gray-900 dark:text-white">
  <h2 className="text-lg font-semibold">
    Theme Test
  </h2>

  <p className="mt-1">
    If Dark is selected, this box should become dark.
  </p>
</div>
      <div>
        <h1 className="text-2xl font-semibold">
          Settings
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your application preferences.
        </p>

          <div className="rounded-lg bg-white p-4 text-black dark:bg-gray-900 dark:text-white">
            Theme is working
         </div>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Theme */}
        <div className="rounded-lg border bg-white p-6">
          <h2 className="text-lg font-semibold">
            Appearance
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Choose your preferred application theme.
          </p>

          <div className="mt-4">
            <Select
              label="Theme"
              value={theme}
              options={THEME_OPTIONS}
              onChange={(event) =>
                handleThemeChange(
                  event.target.value
                )
              }
            />
          </div>
        </div>

        {/* Page Size */}
        <div className="rounded-lg border bg-white p-6">
          <h2 className="text-lg font-semibold">
            Pagination
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Choose the default number of records
            displayed per page.
          </p>

          <div className="mt-4">
            <Select
              label="Default Page Size"
              value={String(
                defaultPageSize
              )}
              options={PAGE_SIZE_OPTIONS}
              onChange={(event) =>
                handlePageSizeChange(
                  event.target.value
                )
              }
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="rounded-lg border bg-white p-6">
          <h2 className="text-lg font-semibold">
            Navigation
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Configure the sidebar display.
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                Sidebar
              </p>

              <p className="text-sm text-gray-500">
                {sidebarCollapsed
                  ? "Currently collapsed"
                  : "Currently expanded"}
              </p>
            </div>

            <button
              type="button"
              onClick={toggleSidebar}
              className="rounded-md border px-4 py-2 text-sm font-medium"
            >
              {sidebarCollapsed
                ? "Expand"
                : "Collapse"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}