import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  Shield,
  CheckCircle,
  Search as SearchIcon,
  TrendingUp,
  FileText,
  ExternalLink,
  Eye,
  Activity,
} from "lucide-react";
import StatCard from "../components/StatCard";
import SearchBar from "../components/SearchBar";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { getStatistics, getCurrentQuarter } from "../utils/helpers";

const Dashboard = ({ websites }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const stats = getStatistics(websites);
  const quarter = getCurrentQuarter();

  let filteredWebsites = websites;
  if (searchTerm) {
    filteredWebsites = filteredWebsites.filter(
      (w) =>
        w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.url.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (selectedFilter) {
    const filterMap = {
      audited: (w) => w.dateAudited !== null,
      pending: (w) => w.status === "Pending",
      passed: (w) => w.status === "Passed",
      needsReview: (w) => w.status === "Needs Review",
      failed: (w) => w.status === "Failed",
    };
    if (filterMap[selectedFilter])
      filteredWebsites = filteredWebsites.filter(filterMap[selectedFilter]);
  }

  const handleFilterClick = (filter) =>
    setSelectedFilter(selectedFilter === filter ? null : filter);

  const filterLabel = {
    audited: "Audited",
    pending: "Pending",
    passed: "Passed",
    needsReview: "Needs Review",
    failed: "Failed",
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* ── Page header ── */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-green-50">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-green-100/50">
            Monitor, audit, and maintain company websites efficiently.
          </p>
        </div>
        <span className="flex-shrink-0 rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-xs font-medium text-emerald-400 tracking-wide">
          {quarter}
        </span>
      </div>

      {/* ── Search ── */}
      <div className="mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search websites by name or URL…"
        />
        {selectedFilter && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-green-100/40">Filtered by:</span>
            <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-0.5 text-xs font-medium text-emerald-400">
              {filterLabel[selectedFilter]}
            </span>
            <button
              onClick={() => setSelectedFilter(null)}
              className="text-xs text-emerald-400/70 hover:text-emerald-400 transition-colors"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* ── Stat Cards ── */}
      <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        <div onClick={() => setSelectedFilter(null)}>
          <StatCard
            title="Total"
            value={stats.total}
            color="blue"
            icon={<Globe className="w-7 h-7" />}
            isActive={selectedFilter === null}
            clickable={false}
          />
        </div>
        {[
          { key: "audited", label: "Audited", val: stats.audited, color: "purple", Icon: CheckCircle },
          { key: "pending", label: "Pending", val: stats.pending, color: "gray", Icon: FileText },
          { key: "passed", label: "Passed", val: stats.passed, color: "green", Icon: CheckCircle },
          { key: "needsReview", label: "Needs Review", val: stats.needsReview, color: "yellow", Icon: Eye },
          { key: "failed", label: "Failed", val: stats.failed, color: "red", Icon: Shield },
        ].map(({ key, label, val, color, Icon }) => (
          <div
            key={key}
            onClick={() => handleFilterClick(key)}
            className="cursor-pointer"
          >
            <StatCard
              title={label}
              value={val}
              color={color}
              icon={<Icon className="w-7 h-7" />}
              isActive={selectedFilter === key}
              clickable
            />
          </div>
        ))}
      </div>

      {/* ── Website Overview Table ── */}
      <div className="glass-card glass-card-hover mb-8 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-400/10">
          <h2 className="text-sm font-semibold text-green-100/90 tracking-wide">
            Website Overview
          </h2>
          <span className="text-xs text-green-100/40">
            {filteredWebsites.length} of {websites.length} websites
          </span>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full dark-table">
            <thead>
              <tr>
                <th className="text-left">Website / System</th>
                <th className="text-left">Status</th>
                <th className="text-left">Security</th>
                <th className="text-left">Functionality</th>
                <th className="text-left">SEO</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWebsites.map((website) => (
                <tr key={website.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <CompanyLogo
                        website={website}
                        className="h-10 w-10 rounded-lg object-cover border border-emerald-400/15 bg-white/5 shadow-sm flex-shrink-0"
                      />
                      <div>
                        <div className="font-medium text-green-50">{website.name}</div>
                        <div className="flex items-center gap-1.5 text-xs text-green-100/40 mt-0.5">
                          <span className="truncate max-w-[200px]">{website.url}</span>
                          {website.url !== "URL Not Provided" && (
                            <a
                              href={website.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-400/60 hover:text-emerald-400 transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td><StatusBadge status={website.status} /></td>
                  <td><StatusBadge status={website.securityCheck} /></td>
                  <td><StatusBadge status={website.functionalityTest} /></td>
                  <td><StatusBadge status={website.seo} /></td>
                  <td>
                    <Link
                      to={`/websites/${website.id}`}
                      className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      View Details →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-emerald-400/10">
          {filteredWebsites.map((website) => (
            <div key={website.id} className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <CompanyLogo
                  website={website}
                  className="h-12 w-12 rounded-lg object-cover border border-emerald-400/15 bg-white/5 shadow-sm flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-green-50 truncate">{website.name}</h3>
                  <p className="text-xs text-green-100/40 mt-0.5 truncate">{website.url}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                {[
                  ["Status", website.status],
                  ["Security", website.securityCheck],
                  ["Functionality", website.functionalityTest],
                  ["SEO", website.seo],
                ].map(([label, val]) => (
                  <div key={label} className="flex items-center justify-between gap-2 rounded-lg bg-white/5 px-2 py-1.5 border border-emerald-400/10">
                    <span className="text-green-100/40">{label}</span>
                    <StatusBadge status={val} showIcon={false} />
                  </div>
                ))}
              </div>
              <Link
                to={`/websites/${website.id}`}
                className="block w-full text-center rounded-lg bg-emerald-400/10 border border-emerald-400/25 text-emerald-400 py-2 text-xs font-medium hover:bg-emerald-400/15 transition-colors"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick Links ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { to: "/websites", Icon: Globe, label: "All Websites", desc: "View and manage all websites", color: "blue" },
          { to: "/security", Icon: Shield, label: "Security Audit", desc: "Check security compliance", color: "red" },
          { to: "/seo", Icon: TrendingUp, label: "SEO Analysis", desc: "Optimize search rankings", color: "green" },
          { to: "/reports", Icon: FileText, label: "Full Reports", desc: "Comprehensive audit reports", color: "purple" },
        ].map(({ to, Icon, label, desc, color }) => (
          <Link
            key={to}
            to={to}
            className="glass-card glass-card-hover p-5 flex items-start gap-4 group"
          >
            <div className={`rounded-lg p-2.5 mt-0.5 flex-shrink-0
              ${color === "blue" ? "bg-blue-400/10 text-blue-400 group-hover:bg-blue-400/15" : ""}
              ${color === "red" ? "bg-red-400/10 text-red-400 group-hover:bg-red-400/15" : ""}
              ${color === "green" ? "bg-emerald-400/10 text-emerald-400 group-hover:bg-emerald-400/15" : ""}
              ${color === "purple" ? "bg-violet-400/10 text-violet-400 group-hover:bg-violet-400/15" : ""}
              transition-colors`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-green-100/90 text-sm">{label}</h3>
              <p className="text-xs text-green-100/40 mt-0.5">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
