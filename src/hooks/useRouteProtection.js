import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, usePermissions } from "@/store/authStore";
import { useToasts } from "@/store/uiStore";
import { ROUTES } from "@/utils/constants";

export const useRouteProtection = ({
  requiredRole = null,
  requiredPermission = null,
  redirectTo = ROUTES.DASHBOARD,
  showToast = true,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { hasRole, hasPermission } = usePermissions();
  const { showError } = useToasts();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      return;
    }

    if (requiredRole && !hasRole(requiredRole)) {
      if (showToast) {
        showError(`Access denied: ${requiredRole} role required`);
      }
      navigate(redirectTo);
      return;
    }

    if (requiredPermission && !hasPermission(requiredPermission)) {
      if (showToast) {
        showError(`Access denied: ${requiredPermission} permission required`);
      }
      navigate(redirectTo);
      return;
    }
  }, [
    isAuthenticated,
    user,
    requiredRole,
    requiredPermission,
    location.pathname,
  ]);

  return {
    isAuthenticated,
    user,
    hasAccess:
      isAuthenticated &&
      (!requiredRole || hasRole(requiredRole)) &&
      (!requiredPermission || hasPermission(requiredPermission)),
  };
};
