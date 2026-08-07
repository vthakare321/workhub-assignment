import { Link } from "react-router-dom";

import { ROUTES } from "@/shared/constants/routes";

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">403</h1>

      <h2 className="text-2xl font-semibold">
        Access Denied
      </h2>

      <p className="text-gray-500">
        You don't have permission to access this page.
      </p>

      <Link
        to={ROUTES.DASHBOARD}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}