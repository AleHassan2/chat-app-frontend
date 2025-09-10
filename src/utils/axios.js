import axios from "axios";
import { APP_CONFIG } from "./constants";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: APP_CONFIG.apiUrl });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: "auth/me",
    login: "auth/login",
    logout: "auth/logout",
    profile: "auth/profile",
    createAccount: "auth/register",
    register: "auth/register",
  },
};
