import React, { useState, useEffect } from "react";
import { useSocketStore } from "../../store/socketStore";
import { useThemeStore } from "../../store/themeStore";
import {
  MessageCircle,
  Phone,
  Users,
  Settings,
  Search,
  MoreVertical,
  Menu,
  Sun,
  Moon,
  LogOut,
  UserPlus,
  Edit3,
  Mail,
  Shield,
  HelpCircle,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatList from "./ChatList";
import ContactList from "./ContactList";
import Avatar from "../common/Avatar";
import { useAuthContext } from "../../hooks/use-auth-context";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("chats");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { user, logout } = useAuthContext();
  const { onlineFriends, isConnected } = useSocketStore();
  const { isDarkMode, toggleTheme } = useThemeStore();

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".user-menu") &&
        !event.target.closest(".user-menu-trigger")
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setShowMobileMenu(false);
  };

  const tabs = [
    { id: "chats", label: "Chats", icon: MessageCircle, count: 0 },
    { id: "calls", label: "Calls", icon: Phone, count: 0 },
    {
      id: "contacts",
      label: "Contacts",
      icon: Users,
      count: onlineFriends.length,
    },
  ];

  return (
    <div className="h-full flex flex-col bg-wa-light-secondary dark:bg-wa-dark-secondary">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-wa-light-300 dark:border-wa-dark-tertiary bg-wa-light-100 dark:bg-wa-dark-primary">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden p-2 rounded-lg hover:bg-wa-light-200 dark:hover:bg-wa-dark-tertiary transition-colors duration-200"
        >
          <Menu className="w-5 h-5 text-wa-light-600 dark:text-wa-light-400" />
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <Avatar
              src={user?.profilePic}
              alt={user?.fullName}
              size="md"
              online={isConnected}
            />
          </div>
          <div className="hidden md:block">
            <h2 className="font-medium text-wa-light-900 dark:text-wa-light-50 truncate">
              {user?.fullName}
            </h2>
            <p className="text-sm text-wa-light-600 dark:text-wa-light-400 truncate">
              {isConnected ? "Online" : "Connecting..."}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-wa-light-200 dark:hover:bg-wa-dark-tertiary transition-colors duration-200"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-wa-light-600 dark:text-wa-light-400" />
            ) : (
              <Moon className="w-5 h-5 text-wa-light-600 dark:text-wa-light-400" />
            )}
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="user-menu-trigger p-2 rounded-lg hover:bg-wa-light-200 dark:hover:bg-wa-dark-tertiary transition-colors duration-200"
            >
              <MoreVertical className="w-5 h-5 text-wa-light-600 dark:text-wa-light-400" />
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  transition={{ duration: 0.1 }}
                  className="user-menu absolute right-0 top-12 w-48 bg-white dark:bg-wa-dark-secondary rounded-lg shadow-lg border border-wa-light-300 dark:border-wa-dark-tertiary py-1 z-50"
                >
                  <button
                    onClick={() => {
                      setActiveTab("profile");
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-wa-light-100 dark:hover:bg-wa-dark-tertiary transition-colors duration-200"
                  >
                    <Settings className="w-4 h-4 text-wa-light-600 dark:text-wa-light-400" />
                    <span className="text-wa-light-900 dark:text-wa-light-50">
                      Settings
                    </span>
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-wa-light-100 dark:hover:bg-wa-dark-tertiary transition-colors duration-200"
                  >
                    {isDarkMode ? (
                      <Sun className="w-4 h-4 text-wa-light-600 dark:text-wa-light-400" />
                    ) : (
                      <Moon className="w-4 h-4 text-wa-light-600 dark:text-wa-light-400" />
                    )}
                    <span className="text-wa-light-900 dark:text-wa-light-50">
                      {isDarkMode ? "Light Mode" : "Dark Mode"}
                    </span>
                  </button>
                  <hr className="my-1 border-wa-light-200 dark:border-wa-dark-tertiary" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-red-50 dark:hover:bg-red-950 text-red-600 dark:text-red-400 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {activeTab !== "profile" && (
        <div className="p-4 border-b border-wa-light-300 dark:border-wa-dark-tertiary">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-wa-light-500 dark:text-wa-light-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search or start new chat"
              className="w-full pl-10 pr-4 py-3 bg-wa-light-100 dark:bg-wa-dark-tertiary rounded-lg text-wa-light-900 dark:text-wa-light-50 placeholder-wa-light-500 dark:placeholder-wa-light-400 border border-transparent focus:border-wa-green-500 focus:ring-1 focus:ring-wa-green-500 transition-all duration-200"
            />
          </div>
        </div>
      )}

      {/* Tabs */}
      {activeTab !== "profile" && (
        <div className="flex border-b border-wa-light-300 dark:border-wa-dark-tertiary bg-wa-light-50 dark:bg-wa-dark-primary">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 transition-colors duration-200 relative ${
                activeTab === tab.id
                  ? "text-wa-green-500 bg-wa-light-100 dark:bg-wa-dark-secondary"
                  : "text-wa-light-600 dark:text-wa-light-400 hover:bg-wa-light-100 dark:hover:bg-wa-dark-tertiary"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="hidden sm:block font-medium">{tab.label}</span>
              {tab.count > 0 && (
                <span className="bg-wa-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {tab.count > 99 ? "99+" : tab.count}
                </span>
              )}

              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-wa-green-500"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeTab === "chats" && <ChatList searchQuery={searchQuery} />}

            {activeTab === "calls" && (
              <div className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <Phone className="w-12 h-12 mx-auto text-wa-light-400 dark:text-wa-light-500 mb-4" />
                  <h3 className="text-lg font-medium text-wa-light-900 dark:text-wa-light-50 mb-2">
                    No recent calls
                  </h3>
                  <p className="text-wa-light-600 dark:text-wa-light-400">
                    Your recent calls will appear here
                  </p>
                </div>
              </div>
            )}

            {activeTab === "contacts" && (
              <ContactList searchQuery={searchQuery} />
            )}

            {activeTab === "profile" && (
              <div className="h-full overflow-y-auto">
                {/* Profile Header */}
                <div className="p-4 border-b border-wa-light-300 dark:border-wa-dark-tertiary bg-wa-light-100 dark:bg-wa-dark-primary">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveTab("chats")}
                      className="p-2 rounded-lg hover:bg-wa-light-200 dark:hover:bg-wa-dark-tertiary transition-colors duration-200"
                    >
                      <svg
                        className="w-5 h-5 text-wa-light-600 dark:text-wa-light-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <h1 className="text-lg font-medium text-wa-light-900 dark:text-wa-light-50">
                      Profile
                    </h1>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="p-6">
                  {/* User Avatar and Info */}
                  <div className="text-center mb-8">
                    <div className="relative inline-block mb-4">
                      <Avatar
                        src={user?.profilePic}
                        alt={user?.fullName}
                        size="xl"
                        className="mx-auto"
                      />
                      <button className="absolute bottom-0 right-0 p-2 bg-wa-green-500 text-white rounded-full hover:bg-wa-green-600 transition-colors duration-200">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                    <h2 className="text-xl font-medium text-wa-light-900 dark:text-wa-light-50 mb-1">
                      {user?.fullName}
                    </h2>
                    <p className="text-wa-light-600 dark:text-wa-light-400 mb-2">
                      @{user?.username}
                    </p>
                    <p className="text-sm text-wa-light-600 dark:text-wa-light-400 max-w-xs mx-auto">
                      {user?.about || "Hey there! I am using WhatsApp."}
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-wa-light-100 dark:bg-wa-dark-tertiary hover:bg-wa-light-200 dark:hover:bg-wa-dark-primary transition-colors duration-200 cursor-pointer">
                      <div className="w-10 h-10 bg-wa-green-500 rounded-full flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-wa-light-900 dark:text-wa-light-50">
                          Add Friends
                        </h3>
                        <p className="text-sm text-wa-light-600 dark:text-wa-light-400">
                          Find and connect with friends
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-wa-light-100 dark:bg-wa-dark-tertiary hover:bg-wa-light-200 dark:hover:bg-wa-dark-primary transition-colors duration-200 cursor-pointer">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-wa-light-900 dark:text-wa-light-50">
                          Invite Friends
                        </h3>
                        <p className="text-sm text-wa-light-600 dark:text-wa-light-400">
                          Share invitation link
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Settings Menu */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-wa-light-600 dark:text-wa-light-400 mb-3 px-3">
                      SETTINGS
                    </h3>

                    <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-wa-light-100 dark:hover:bg-wa-dark-tertiary transition-colors duration-200 text-left">
                      <Settings className="w-5 h-5 text-wa-light-600 dark:text-wa-light-400" />
                      <span className="text-wa-light-900 dark:text-wa-light-50">
                        General Settings
                      </span>
                    </button>

                    <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-wa-light-100 dark:hover:bg-wa-dark-tertiary transition-colors duration-200 text-left">
                      <Shield className="w-5 h-5 text-wa-light-600 dark:text-wa-light-400" />
                      <span className="text-wa-light-900 dark:text-wa-light-50">
                        Privacy & Security
                      </span>
                    </button>

                    <button
                      onClick={toggleTheme}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-wa-light-100 dark:hover:bg-wa-dark-tertiary transition-colors duration-200 text-left"
                    >
                      {isDarkMode ? (
                        <Sun className="w-5 h-5 text-wa-light-600 dark:text-wa-light-400" />
                      ) : (
                        <Moon className="w-5 h-5 text-wa-light-600 dark:text-wa-light-400" />
                      )}
                      <span className="text-wa-light-900 dark:text-wa-light-50">
                        {isDarkMode ? "Light Theme" : "Dark Theme"}
                      </span>
                    </button>

                    <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-wa-light-100 dark:hover:bg-wa-dark-tertiary transition-colors duration-200 text-left">
                      <HelpCircle className="w-5 h-5 text-wa-light-600 dark:text-wa-light-400" />
                      <span className="text-wa-light-900 dark:text-wa-light-50">
                        Help & Support
                      </span>
                    </button>

                    <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-wa-light-100 dark:hover:bg-wa-dark-tertiary transition-colors duration-200 text-left">
                      <Info className="w-5 h-5 text-wa-light-600 dark:text-wa-light-400" />
                      <span className="text-wa-light-900 dark:text-wa-light-50">
                        About
                      </span>
                    </button>

                    <hr className="my-4 border-wa-light-200 dark:border-wa-dark-tertiary" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 transition-colors duration-200 text-left text-red-600 dark:text-red-400"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowMobileMenu(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;
