// routes/index.js - Fixed Router component with proper 404 handling
import { Navigate, useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { authRoutes } from "./auth";
import { dashboardRoutes } from "./dashboard";
import LoadingScreen from "../../components/common/LoadingScreen";

// Lazy load the 404 page
const NotFoundPage = lazy(() => import("../../pages/NotFount"));

// ----------------------------------------------------------------------

export default function AppRoutes() {
  return useRoutes([
    // Redirect root to dashboard
    {
      path: "/",
      element: <Navigate to="/dashboard" replace />,
    },

    // Auth routes
    ...authRoutes,

    // Dashboard routes
    ...dashboardRoutes,

    // Global 404 page (outside of any layout)
    {
      path: "/404",
      element: (
        <Suspense fallback={<LoadingScreen />}>
          <NotFoundPage />
        </Suspense>
      ),
    },

    // Catch all unmatched routes and redirect to 404
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
}
