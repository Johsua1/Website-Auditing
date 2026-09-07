import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bell, User, ChevronDown } from "lucide-react";
import websiteLogo from "../assets/website logo.png";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWebsiteMenuOpen, setIsWebsiteMenuOpen] = useState(false);
  const location = useLocation();

  const websiteSubItems = [
    { name: "Date Audited", path: "/date-audited" },
    { name: "Status", path: "/status" },
    { name: "Security", path: "/security" },
    { name: "Functionality", path: "/functionality" },
    { name: "SEO", path: "/seo" },
    { name: "Remarks", path: "/remarks" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isWebsiteSectionActive =
    isActive("/websites") ||
    websiteSubItems.some((item) => isActive(item.path));

  const currentItemTitle =
    location.pathname === "/"
      ? "Dashboard"
      : location.pathname.startsWith("/websites")
        ? "Website"
        : websiteSubItems.find((item) => isActive(item.path))?.name ||
          (location.pathname.startsWith("/reports")
            ? "Full Report"
            : "Website Audit");

  const closeSidebar = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white shadow-md">
        <div className="relative flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              aria-label={
                isMobileMenuOpen ? "Close navigation" : "Open navigation"
              }
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="flex-shrink-0 rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <span className="max-w-28 truncate text-sm font-semibold text-gray-700 sm:max-w-none sm:text-base">
              {currentItemTitle}
            </span>
          </div>

          <Link
            to="/"
            className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2"
          >
            <img
              src={websiteLogo}
              alt="Website Audit and Maintenance"
              className="h-8 w-auto max-w-20 object-contain"
            />
            <span className="whitespace-nowrap text-sm font-bold text-gray-900 sm:text-xl">
              Website Audit & Maintenance
            </span>
          </Link>

          <div className="ml-auto flex items-center space-x-2">
            <button
              type="button"
              aria-label="Notifications"
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <Bell className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Profile"
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/20"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-72 transform overflow-y-auto border-r border-gray-200 bg-white shadow-xl transition-transform duration-200 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          to="/"
          className="flex flex-col items-center gap-2 border-b border-gray-200 p-5 text-center"
          onClick={closeSidebar}
        >
          <img
            src={websiteLogo}
            alt="Website Audit and Maintenance"
            className="h-20 w-auto max-w-full object-contain"
          />
          <span className="text-base font-bold text-gray-900">
            Website Audit & Maintenance
          </span>
        </Link>
        <div className="space-y-1 p-4">
          <Link
            to="/"
            className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/")
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={closeSidebar}
          >
            Dashboard
          </Link>

          <button
            type="button"
            onClick={() => setIsWebsiteMenuOpen((open) => !open)}
            aria-expanded={isWebsiteMenuOpen}
            className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
              isWebsiteSectionActive
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Website
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isWebsiteMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isWebsiteMenuOpen && (
            <div className="ml-4 space-y-1 border-l border-gray-200 pl-3">
              <Link
                to="/websites"
                className={`block rounded-md px-3 py-2 text-sm font-medium ${
                  isActive("/websites")
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={closeSidebar}
              >
                All Websites
              </Link>
              {websiteSubItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block rounded-md px-3 py-2 text-sm ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={closeSidebar}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          <Link
            to="/reports"
            className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/reports")
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={closeSidebar}
          >
            Full Report
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
