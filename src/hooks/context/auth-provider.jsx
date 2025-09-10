import PropTypes from "prop-types";
import { useMemo, useEffect, useReducer, useCallback } from "react";

import { setSession } from "./utils";
import { AuthContext } from "./auth-context";
import { useRouter } from "../use-router";
import { APP_CONFIG } from "../../utils/constants";
import axiosInstance, { endpoints } from "../../utils/axios";
import { paths } from "../../routes/sections/path";
import toast from "react-hot-toast";

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === "INITIAL") {
    return {
      loading: false,

      user: action.payload.user,
    };
  }
  if (action.type === "LOGIN") {
    return {
      ...state,
      user: action.payload.user,
    };
  }

  if (action.type === "REGISTER") {
    return {
      ...state,
      user: action.payload.user,
    };
  }

  if (action.type === "LOGOUT") {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = "accessToken";

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY);

      if (accessToken) {
        setSession(accessToken);

        const response = await axiosInstance.get(
          `${APP_CONFIG.apiUrl}/${endpoints.auth.me}`
        );
        const { user } = response.data;

        dispatch({
          type: "INITIAL",
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: "INITIAL",
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: "INITIAL",
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN AS
  const loginAs = useCallback(async (id, by) => {
    setSession("");
    dispatch({
      type: "LOGIN",
      payload: {
        user: {},
      },
    });

    const response = await axiosInstance.get(
      `${APP_CONFIG.apiUrl}/${endpoints.auth.loginAs}${id}`
    );
    const { token, user } = response.data;
    if (by === "admin") {
      user.isNewDevice = false;
    }
    setSession(token);

    dispatch({
      type: "LOGIN",
      payload: {
        user: {
          ...user,
          token,
        },
      },
    });
  }, []);

  // LOGIN
  const login = useCallback(async (email, password, rememberMe) => {
    const data = {
      email,
      password,
      rememberMe,
    };

    const response = await axiosInstance.post(
      `${APP_CONFIG.apiUrl}/${endpoints.auth.login}`,
      data
    );

    const user = response.data.user;
    const token = response.data.token;

    setSession(token);
    initialize();

    dispatch({
      type: "LOGIN",
      payload: {
        user: {
          ...user,
          token,
        },
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (email, password, fullName, username, phone) => {
      const data = {
        email,
        password,
        fullName,
        username,

        phone,
      };
      try {
        const response = await axiosInstance.post(
          `${APP_CONFIG.apiUrl}/${endpoints.auth.register}`,
          data
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          router.push(paths.auth.jwt.login);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message || "Signup failed! Please try again later.");
      }
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    try {
      const response = await axiosInstance.post(
        `${APP_CONFIG.apiUrl}/${endpoints.auth.logout}`
      );
      if (response.data.success) {
        setSession(null);
        router.push(paths.auth.jwt.login);
        dispatch({
          type: "LOGOUT",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: "jwt",
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",

      //
      loginAs,
      login,
      register,
      logout,
      initialize,
    }),
    [login, loginAs, logout, register, state.user, status, initialize]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
