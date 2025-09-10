import { paths } from "../routes/sections/path";

export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || "Chat App",
  version: import.meta.env.VITE_APP_VERSION || "1.0.0",
  apiUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api",
  wsUrl: import.meta.env.VITE_WS_URL || "http://localhost:4000",
};

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'
