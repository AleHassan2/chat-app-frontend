import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import LoadingScreen from "../../components/common/LoadingScreen";
import AuthGuard from "../../auth/guard/auth-guard";
import MainLayout from "../../components/layout/MainLayout";

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import("../../pages/Landing"));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: "dashboard",
    element: (
      <AuthGuard>
        {/* <DashboardLayout> */}
        <Suspense fallback={<LoadingScreen />}>
          <MainLayout />
        </Suspense>
        {/* </DashboardLayout> */}
      </AuthGuard>
    ),
    children: [
      {
        element: <IndexPage />,
        index: true,
      },
    ],
  },
];
