import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useThemeStore = create()(
  devtools(
    persist(
      (set, get) => ({
        // State
        isDarkMode: true, // Default to dark mode for WhatsApp feel
        fontSize: "medium", // small, medium, large
        chatWallpaper: "default", // default, none, custom
        customWallpaper: null,
        soundEnabled: true,
        notificationSound: "default",

        // Actions
        toggleTheme: () => {
          set((state) => ({ isDarkMode: !state.isDarkMode }));
        },

        setDarkMode: (enabled) => {
          set({ isDarkMode: enabled });
        },

        setFontSize: (size) => {
          set({ fontSize: size });
          // Apply font size to document
          const root = document.documentElement;
          const sizeMap = {
            small: "0.875rem",
            medium: "1rem",
            large: "1.125rem",
          };
          root.style.fontSize = sizeMap[size] || sizeMap.medium;
        },

        setChatWallpaper: (wallpaper) => {
          set({ chatWallpaper: wallpaper });
        },

        setCustomWallpaper: (wallpaper) => {
          set({
            customWallpaper: wallpaper,
            chatWallpaper: "custom",
          });
        },

        setSoundEnabled: (enabled) => {
          set({ soundEnabled: enabled });
        },

        setNotificationSound: (sound) => {
          set({ notificationSound: sound });
        },

        // Get current theme class for components
        getThemeClass: () => {
          const { isDarkMode } = get();
          return isDarkMode ? "dark" : "light";
        },

        // Get CSS variables for current theme
        getThemeVariables: () => {
          const { isDarkMode, fontSize } = get();
          return {
            "--primary-bg": isDarkMode ? "#111b21" : "#f0f2f5",
            "--secondary-bg": isDarkMode ? "#202c33" : "#ffffff",
            "--tertiary-bg": isDarkMode ? "#2a3942" : "#e5ddd5",
            "--primary-text": isDarkMode ? "#e9edef" : "#3b4a54",
            "--secondary-text": isDarkMode ? "#8696a0" : "#667781",
            "--accent-color": "#25d366",
            "--font-size":
              fontSize === "small"
                ? "0.875rem"
                : fontSize === "large"
                ? "1.125rem"
                : "1rem",
          };
        },

        // Apply theme to system
        applyTheme: () => {
          const { isDarkMode, getThemeVariables, fontSize } = get();
          const root = document.documentElement;
          const variables = getThemeVariables();

          // Apply CSS variables
          Object.entries(variables).forEach(([key, value]) => {
            root.style.setProperty(key, value);
          });

          // Apply theme class
          root.classList.toggle("dark", isDarkMode);
          root.classList.toggle("light", !isDarkMode);

          // Apply font size
          const sizeMap = {
            small: "0.875rem",
            medium: "1rem",
            large: "1.125rem",
          };
          root.style.fontSize = sizeMap[fontSize] || sizeMap.medium;

          // Update meta theme-color
          const metaThemeColor = document.querySelector(
            'meta[name="theme-color"]'
          );
          if (metaThemeColor) {
            metaThemeColor.setAttribute(
              "content",
              isDarkMode ? "#111b21" : "#25d366"
            );
          }
        },

        // Reset theme to defaults
        resetTheme: () => {
          set({
            isDarkMode: true,
            fontSize: "medium",
            chatWallpaper: "default",
            customWallpaper: null,
            soundEnabled: true,
            notificationSound: "default",
          });
          get().applyTheme();
        },
      }),
      {
        name: "theme-storage",
        onRehydrateStorage: () => (state) => {
          // Apply theme after rehydration
          if (state) {
            setTimeout(() => state.applyTheme(), 0);
          }
        },
      }
    ),
    {
      name: "theme-store",
    }
  )
);
