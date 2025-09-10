import Router from "./routes/sections";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./hooks/context/auth-provider";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/themeStore";
import { useEffect } from "react";
import SocketInitializer from "./services/SocketInitializer";

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  const { isDarkMode, applyTheme } = useThemeStore();

  // Apply theme on mount and changes
  useEffect(() => {
    applyTheme();
  }, [applyTheme, isDarkMode]);

  const charAt = `
  ░░░    ░░░
  ▒▒▒▒  ▒▒▒▒
  ▒▒ ▒▒▒▒ ▒▒
  ▓▓  ▓▓  ▓▓
  ██      ██
  `;

  console.info(`%c${charAt}`, "color: #5BE49B");

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <div
          className={`min-h-screen ${
            isDarkMode ? "dark" : "light"
          } bg-wa-light-primary dark:bg-wa-dark-primary transition-colors duration-300`}
        >
          <BrowserRouter>
            <AuthProvider>
              {/* SocketInitializer now has access to auth context */}
              <SocketInitializer />
              <Router />
            </AuthProvider>
          </BrowserRouter>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              className:
                "bg-wa-light-secondary dark:bg-wa-dark-secondary text-wa-light-900 dark:text-wa-light-50 border border-wa-light-300 dark:border-wa-dark-tertiary",
              success: {
                iconTheme: {
                  primary: "#25d366",
                  secondary: "#ffffff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#ffffff",
                },
              },
            }}
          />
        </div>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
