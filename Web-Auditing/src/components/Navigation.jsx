import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Bell,
  User,
  ChevronDown,
  LayoutDashboard,
  Globe,
  Calendar,
  Activity,
  Shield,
  Zap,
  TrendingUp,
  MessageSquare,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Sun,
  Moon,
} from "lucide-react";
import websiteLogo from "../assets/website logo.png";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWebsiteMenuOpen, setIsWebsiteMenuOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem("audit-theme") === "light";
  });
  const location = useLocation();

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", isLightMode);
    localStorage.setItem("audit-theme", isLightMode ? "light" : "dark");
  }, [isLightMode]);

  const websiteSubItems = [
    { name: "Date Audited", path: "/date-audited", icon: Calendar },
    { name: "Status", path: "/status", icon: Activity },
    { name: "Security", path: "/security", icon: Shield },
    { name: "Functionality", path: "/functionality", icon: Zap },
    { name: "SEO", path: "/seo", icon: TrendingUp },
    { name: "Remarks", path: "/remarks", icon: MessageSquare },
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
        ? "Websites"
        : websiteSubItems.find((item) => isActive(item.path))?.name ||
          (location.pathname.startsWith("/reports")
            ? "Full Report"
            : "Website Audit");

  const closeSidebar = () => {
    setIsMobileMenuOpen(false);
  };

  const sampleNotifications = [
    {
      id: 1,
      title: "Security Check Needed",
      desc: "Klassic Marketing SSL renewal pending",
      time: "10m ago",
      type: "warn",
    },
    {
      id: 2,
      title: "Audit Completed",
      desc: "Brains Infinite Innovations passed all tests",
      time: "1h ago",
      type: "success",
    },
    {
      id: 3,
      title: "SEO Score Update",
      desc: "Green Oasis metadata updated",
      time: "3h ago",
      type: "info",
    },
  ];

  return (
    <>
      {/* ── Fixed Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0b1011]/90 backdrop-blur-xl border-b border-[#202c2e]">
        <div className="relative flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Hamburger & Current Breadcrumb */}
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              aria-label={
                isMobileMenuOpen ? "Close navigation" : "Open navigation"
              }
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="flex-shrink-0 rounded-lg p-2 text-[#94a3b8] bg-[#12191b] hover:bg-[#1a2527] hover:text-[#fff800] border border-[#202c2e] hover:border-[#2f3f42] transition-all duration-150"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-xs uppercase tracking-wider font-semibold text-[#64748b]">
                Navigation /
              </span>
              <span className="rounded-md bg-[#141e20] border border-[#223033] px-2.5 py-1 text-xs font-semibold text-[#e2e8f0] tracking-wide">
                {currentItemTitle}
              </span>
            </div>
          </div>

          {/* Center: Brand */}
          <Link
            to="/"
            className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2.5 group"
          >
            <div className="h-8 w-8 rounded-lg bg-white/10 border border-white/10 p-1 flex items-center justify-center transition-transform group-hover:scale-105">
              <img
                src={websiteLogo}
                alt="Website Audit and Maintenance"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="whitespace-nowrap text-sm font-bold tracking-tight text-white group-hover:text-[#fff800] transition-colors sm:text-lg">
              Website Audit <span className="text-[#859496] font-normal">&amp;</span> Maintenance
            </span>
          </Link>

          {/* Right: Quick Actions */}
          <div className="ml-auto flex items-center space-x-2">
            <button
              type="button"
              aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
              aria-pressed={isLightMode}
              onClick={() => setIsLightMode((light) => !light)}
              className="rounded-lg p-2 border border-[#202c2e] bg-[#12191b] text-[#94a3b8] transition-all duration-150 hover:bg-[#1a2527] hover:text-[#fff800] hover:border-[#2f3f42]"
            >
              {isLightMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            
          </div>
        </div>
      </header>

      {/* ── Sidebar Backdrop Overlay ── */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/70 backdrop-blur-xs transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* ── Sliding Sidebar Drawer ── */}
      <aside
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-72 transform overflow-y-auto border-r border-[#202c2e] bg-[#0c1214]/95 backdrop-blur-2xl shadow-2xl transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top brand badge inside drawer */}
        <Link
          to="/"
          className="flex flex-col items-center gap-2 border-b border-[#202c2e] p-5 text-center bg-[#0f1719]/60"
          onClick={closeSidebar}
        >
          <div className="h-14 w-14 rounded-2xl bg-white/10 border border-white/10 p-2 flex items-center justify-center shadow-inner">
            <img
              src={websiteLogo}
              alt="Website Audit and Maintenance"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <span className="block text-sm font-bold text-white tracking-tight">
              Website Audit &amp; Maintenance
            </span>
            <span className="text-[11px] text-[#859496]">
              Paddle-Styled Control Center
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="sidebar-nav space-y-1.5 p-4">
          <Link
            to="/"
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
              isActive("/")
                ? "bg-[#182325] text-[#fff800] border border-[#2d3e42] shadow-xs relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-[#fff800] before:rounded-r"
                : "text-[#94a3b8] hover:bg-[#12191b] hover:text-white border border-transparent"
            }`}
            onClick={closeSidebar}
          >
            <LayoutDashboard className="h-4 w-4 shrink-0 text-inherit" />
            Dashboard
          </Link>

          {/* Website Group */}
          <div>
            <button
              type="button"
              onClick={() => setIsWebsiteMenuOpen((open) => !open)}
              aria-expanded={isWebsiteMenuOpen}
              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-all ${
                isWebsiteSectionActive
                  ? "bg-[#141f21] text-white border border-[#27383b]"
                  : "text-[#94a3b8] hover:bg-[#12191b] hover:text-white border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 shrink-0 text-inherit" />
                <span>Websites</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 text-[#64748b] ${
                  isWebsiteMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isWebsiteMenuOpen && (
              <div className="mt-1 ml-4 space-y-1 border-l border-[#202c2e] pl-3">
                <Link
                  to="/websites"
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                    isActive("/websites")
                      ? "bg-[#182325] text-[#fff800] border border-[#2d3e42]"
                      : "text-[#94a3b8] hover:bg-[#12191b] hover:text-white border border-transparent"
                  }`}
                  onClick={closeSidebar}
                >
                  <Globe className="h-3.5 w-3.5 shrink-0" />
                  All Websites
                </Link>
                {websiteSubItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                        isActive(item.path)
                          ? "bg-[#182325] text-[#fff800] border border-[#2d3e42]"
                          : "text-[#94a3b8] hover:bg-[#12191b] hover:text-white border border-transparent"
                      }`}
                      onClick={closeSidebar}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            to="/reports"
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
              isActive("/reports")
                ? "bg-[#182325] text-[#fff800] border border-[#2d3e42] shadow-xs relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-[#fff800] before:rounded-r"
                : "text-[#94a3b8] hover:bg-[#12191b] hover:text-white border border-transparent"
            }`}
            onClick={closeSidebar}
          >
            <FileText className="h-4 w-4 shrink-0 text-inherit" />
            Full Report
          </Link>
        </div>

      </aside>
    </>
  );
};

export default Navigation;

