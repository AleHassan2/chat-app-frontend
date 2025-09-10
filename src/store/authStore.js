import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storage } from "../utils/helpers";

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials) => {
        set({ isLoading: true, error: null });

        try {
          // Mock login for testing
          const mockUser = {
            id: 1,
            email: credentials.email,
            name: "Test User",
            role: "admin",
            account: { id: 1, name: "Test Account" },
          };

          const mockToken = "mock-jwt-token";

          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          // Store in localStorage
          storage.set("auth_token", mockToken);
          storage.set("user_data", mockUser);

          return { success: true, user: mockUser, token: mockToken };
        } catch (error) {
          set({
            isLoading: false,
            error: "Login failed",
          });
          return { success: false, error: "Login failed" };
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });

        storage.remove("auth_token");
        storage.remove("user_data");
      },

      initialize: async () => {
        console.log("Initializing auth store...");

        const storedToken = storage.get("auth_token");
        const storedUser = storage.get("user_data");

        if (storedToken && storedUser) {
          console.log("Found stored auth data");
          set({
            token: storedToken,
            user: storedUser,
            isAuthenticated: true,
          });
        } else {
          console.log("No stored auth data found");
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-store",
      storage: {
        getItem: (name) => storage.get(name),
        setItem: (name, value) => storage.set(name, value),
        removeItem: (name) => storage.remove(name),
      },
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
