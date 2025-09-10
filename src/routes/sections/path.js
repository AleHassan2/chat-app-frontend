// routes/paths.js - Updated paths configuration
const ROOTS = {
  AUTH: "/auth",
  AUTH_DEMO: "/auth-demo",
  DASHBOARD: "/dashboard",
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",

  page403: "/403",
  page404: "/404",
  page500: "/500",

  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/login`,
      register: `${ROOTS.AUTH}/register`,
      forgotPassword: `${ROOTS.AUTH}/forget-password`,
      forgotUsername: `${ROOTS.AUTH}/forget-username`,
      verify: `${ROOTS.AUTH}/verify`,
      smsVerify: `${ROOTS.AUTH}/verify-otp`,
      newPassword: (token) => `${ROOTS.AUTH}/new-password/${token}`,
      proposal: (id) => `${ROOTS.AUTH}/proposals/${id}`,
    },
  },

  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    landing: {
      root: `${ROOTS.DASHBOARD}/landing`,
    },
  },
};
