import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Bell,
  User,
  ChevronDown,
  LayoutDashboard,
  Globe,
  Shield,
  Zap,
  TrendingUp,
  MessageSquare,
  FileText,
  CalendarDays,
  Activity,
} from "lucide-react";
import websiteLogo from "../assets/website logo.png";

const NAV_ITEMS = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  {
    name: "Websites",
    icon: Globe,
    children: [
      { name: "All Websites", path: "/websites", icon: Globe },
      { name: "Date Audited", path: "/date-audited", icon: CalendarDays },
      { name: "Status", path: "/status", icon: Activity },
      { name: "Security", path: "/security", icon: Shield },
      { name: "Functionality", path: "/functionality", icon: Zap },
      { name: "SEO", path: "/seo", icon: TrendingUp },
      { name: "Remarks", path: "/remarks", icon: MessageSquare },
    ],
  },
  { name: "Full Report", path: "/reports", icon: FileText },
];

const isPathActive = (path, currentPath) => {
  if (path === "/") return currentPath === "/";
  return currentPath.startsWith(path);
};

const NavLink = ({ item, depth = 0, onClick }) => {
  const location = useLocation();
  const active = isPathActive(item.path, location.pathname);
  const Icon = item.icon;

  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150
        ${depth > 0 ? "ml-4" : ""}
        ${
          active
            ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
            : "text-green-100/60 hover:bg-white/5 hover:text-green-100/90 border border-transparent"
        }`}
    >
      {Icon && (
        <Icon
          className={`h-4 w-4 flex-shrink-0 ${active ? "text-emerald-400" : "text-green-100/40"}`}
        />
      )}
      {item.name}
    </Link>
  );
};

const NavGroup = ({ item, onClick }) => {
  const location = useLocation();
  const Icon = item.icon;
  const isAnyChildActive = item.children?.some((c) =>
    isPathActive(c.path, location.pathname)
  );
  const [open, setOpen] = useState(isAnyChildActive);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 border
          ${
            isAnyChildActive
              ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
              : "text-green-100/60 hover:bg-white/5 hover:text-green-100/90 border-transparent"
          }`}
      >
        <span className="flex items-center gap-3">
          <Icon
            className={`h-4 w-4 flex-shrink-0 ${isAnyChildActive ? "text-emerald-400" : "text-green-100/40"}`}
          />
          {item.name}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-1 space-y-0.5 border-l border-emerald-400/10 ml-5">
          {item.children.map((child) => (
            <NavLink key={child.path} item={child} depth={1} onClick={onClick} />
          ))}
        </div>
      )}
    </div>
  );
};

const SidebarContent = ({ onClose }) => (
  <div className="flex h-full flex-col">
    {/* Logo */}
    <Link
      to="/"
      onClick={onClose}
      className="flex items-center gap-3 px-5 py-5 border-b border-emerald-400/10"
    >
      <img
        src={websiteLogo}
        alt="Website Audit"
        className="h-8 w-auto object-contain"
      />
      <div>
        <span className="block text-sm font-semibold text-green-100/90 leading-tight">
          Website Audit
        </span>
        <span className="block text-xs text-green-100/40 leading-tight">
          &amp; Maintenance
        </span>
      </div>
    </Link>

    {/* Nav */}
    <nav className="flex-1 overflow-y-auto p-4 space-y-1">
      {NAV_ITEMS.map((item) =>
        item.children ? (
          <NavGroup key={item.name} item={item} onClick={onClose} />
        ) : (
          <NavLink key={item.path} item={item} onClick={onClose} />
        )
      )}
    </nav>

    {/* Bottom user area */}
    <div className="border-t border-emerald-400/10 px-4 py-4">
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-green-100/50 hover:bg-white/5 hover:text-green-100/80 transition-colors"
      >
        <User className="h-4 w-4" />
        <span>Account</span>
      </button>
    </div>
  </div>
);

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const currentTitle =
    location.pathname === "/"
      ? "Dashboard"
      : location.pathname.startsWith("/websites/")
        ? "Website Detail"
        : location.pathname.startsWith("/websites")
          ? "All Websites"
          : location.pathname.startsWith("/date-audited")
            ? "Date Audited"
            : location.pathname.startsWith("/status")
              ? "Status"
              : location.pathname.startsWith("/security")
                ? "Security"
                : location.pathname.startsWith("/functionality")
                  ? "Functionality"
                  : location.pathname.startsWith("/seo")
                    ? "SEO"
                    : location.pathname.startsWith("/remarks")
                      ? "Remarks"
                      : location.pathname.startsWith("/reports")
                        ? "Full Report"
                        : "Website Audit";

  return (
    <>
      {/* ── Desktop persistent sidebar ── */}
      <aside className="sidebar fixed left-0 top-0 z-30 hidden h-full w-64 lg:block">
        <SidebarContent onClose={() => {}} />
      </aside>

      {/* ── Mobile top bar ── */}
      <header className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-emerald-400/10 bg-[#080d0d]/90 backdrop-blur-md px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="rounded-lg p-2 text-green-100/60 hover:bg-white/5 hover:text-green-100/90 transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link to="/" className="flex items-center gap-2">
          <img src={websiteLogo} alt="Logo" className="h-7 w-auto object-contain" />
          <span className="text-sm font-semibold text-green-100/90 truncate max-w-[160px]">
            {currentTitle}
          </span>
        </Link>

        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2 text-green-100/60 hover:bg-white/5 hover:text-green-100/90 transition-colors"
        >
          <Bell className="h-5 w-5" />
        </button>
      </header>

      {/* ── Mobile slide-over sidebar ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`sidebar fixed left-0 top-0 z-50 h-full w-64 transform transition-transform duration-250 lg:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </aside>
    </>
  );
};

export default Navigation;
