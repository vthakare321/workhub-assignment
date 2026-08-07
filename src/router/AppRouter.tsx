import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import Loader from "@/shared/components/Loader/index";

import { router } from "./routes";

export default function AppRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}