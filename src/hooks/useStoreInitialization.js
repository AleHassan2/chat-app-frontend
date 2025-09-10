import { useEffect } from "react";
import useAuthStore from "@/store/authStore";
import useUIStore from "@/store/uiStore";
import useNotificationStore from "@/store/notificationStore";

export const useStoreInitialization = () => {
  // Only get state values, never functions
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const theme = useUIStore((state) => state.theme);
  const notificationStats = useNotificationStore((state) => state.stats);
  const isConnected = useNotificationStore((state) => state.isConnected);

  // Request notification permission once
  useEffect(() => {
    if (
      isAuthenticated &&
      "Notification" in window &&
      Notification.permission === "default"
    ) {
      Notification.requestPermission();
    }
  }, [isAuthenticated]);

  return {
    isAuthenticated,
    user,
    theme,
    notificationStats,
    isConnected,
  };
};
