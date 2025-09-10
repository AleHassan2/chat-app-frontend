import { Outlet } from "react-router-dom";
import { useSocketStore } from "../../store/socketStore";
import { useThemeStore } from "../../store/themeStore";
import Sidebar from "../chat/Sidebar";

const MainLayout = () => {
  const { isConnected } = useSocketStore();
  const { isDarkMode } = useThemeStore();

  return (
    <div className="h-screen flex bg-wa-light-primary dark:bg-wa-dark-primary">
      {/* Connection Status Bar */}
      {!isConnected && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-yellow-900 px-4 py-2 text-sm text-center z-50">
          <span className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-yellow-900 rounded-full animate-pulse"></div>
            Connecting to server...
          </span>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden md:flex w-full max-w-screen-2xl mx-auto bg-wa-light-secondary dark:bg-wa-dark-secondary shadow-2xl">
        {/* Sidebar */}
        <div className="w-96 border-r border-wa-light-300 dark:border-wa-dark-tertiary">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 relative">
          <Outlet />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
