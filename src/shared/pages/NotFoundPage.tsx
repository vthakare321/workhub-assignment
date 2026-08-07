import { Link } from "react-router-dom";

import { ROUTES } from "@/shared/constants/routes";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">404</h1>

      <h2 className="text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="text-gray-500">
        The page you're looking for doesn't exist.
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