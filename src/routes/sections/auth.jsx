import { lazy, Suspense } from "react";
import GuestGuard from "../../auth/guard/guest-guard";
import AuthLayout from "../../components/layout/AuthLayout";

// ----------------------------------------------------------------------

// JWT
const LoginPage = lazy(() => import("../../pages/Auth/Login"));
const RegisterPage = lazy(() => import("../../pages/Auth/Register"));
// const JwtRegisterPage = lazy(() => import('src/views/auth/Register'));
// const JwtForgetPasswordPage = lazy(() => import('src/views/auth/ForgotPassword'));
// const JwtForgetUsernamePage = lazy(() => import('src/views/auth/ForgotUsername'));
// const JwtVerifyPage = lazy(() => import('src/views/auth/Verify'));
// const JwtNewPasswordPage = lazy(() => import('src/views/auth/NewPassword'));
// const ViewProposalPage = lazy(() => import('src/views/guest/proposal'));

// ----------------------------------------------------------------------

const authJwt = {
  path: "/auth",
  element: (
    <Suspense>
      <AuthLayout />
    </Suspense>
  ),
  children: [
    {
      path: "login",
      element: (
        <GuestGuard>
          <LoginPage />
        </GuestGuard>
      ),
    },
    {
      path: "register",
      element: (
        <GuestGuard>
          <RegisterPage />
        </GuestGuard>
      ),
    },

    // {
    //   path: 'forget-password',
    //   element: (
    //     <GuestGuard>
    //       <AuthModernLayout title="Manage the job more effectively with Minimal">
    //         <JwtForgetPasswordPage />
    //       </AuthModernLayout>
    //     </GuestGuard>
    //   ),
    // },
    // {
    //   path: 'forget-username',
    //   element: (
    //     <GuestGuard>
    //       <AuthModernLayout>
    //         <JwtForgetUsernamePage />
    //       </AuthModernLayout>
    //     </GuestGuard>
    //   ),
    // },
    // {
    //   path: 'verify',
    //   element: (
    //     <GuestGuard>
    //       <AuthModernLayout title="Manage the job more effectively with Minimal">
    //         <JwtVerifyPage />
    //       </AuthModernLayout>
    //     </GuestGuard>
    //   ),
    // },
    // {
    //   path: 'verify-otp',
    //   element: (
    //     <GuestGuard>
    //       <AuthModernLayout title="Verify-otp">
    //         <SmsVerifyPage />
    //       </AuthModernLayout>
    //     </GuestGuard>
    //   ),
    // },

    // {
    //   path: 'new-password/:resettoken',
    //   element: (
    //     <GuestGuard>
    //       <AuthModernLayout>
    //         <JwtNewPasswordPage />
    //       </AuthModernLayout>
    //     </GuestGuard>
    //   ),
    // },
  ],
};

export const authRoutes = [
  {
    path: "auth",
    children: [authJwt],
  },
];
