import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  Shield,
  CheckCircle2,
  TrendingUp,
  FileText,
  ExternalLink,
  Eye,
  Copy,
  Check,
  LayoutGrid,
  List,
  Sparkles,
  ArrowUpRight,
  Filter,
  Play,
} from "lucide-react";
import StatCard from "../components/StatCard";
import SearchBar from "../components/SearchBar";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { getStatistics, getCurrentQuarter } from "../utils/helpers";

const Dashboard = ({ websites, onStartAudit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("ALL");
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'cards'
  const [copiedId, setCopiedId] = useState(null);

  const stats = getStatistics(websites);
  const quarter = getCurrentQuarter();

  const handleCopyUrl = (id, url, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!url || url === "URL Not Provided") return;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter websites based on search and selected stat card filter
  const filteredWebsites = websites.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.url.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedStatusFilter === "ALL") return true;
    if (selectedStatusFilter === "AUDITED") return Boolean(w.dateAudited);
    if (selectedStatusFilter === "PENDING") return w.status === "Pending";
    if (selectedStatusFilter === "PASSED") return w.status === "Passed";
    if (selectedStatusFilter === "NEEDS_REVIEW") return w.status === "Needs Review";
    if (selectedStatusFilter === "FAILED") return w.status === "Failed";

    return true;
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">
                Website Audit &amp; Maintenance
              </h1>
              <p className="text-sm text-[#859496] leading-relaxed">
                Real-time monitoring, security assessments, and SEO performance metrics.
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-xs font-semibold text-[#859496] bg-[#121a1b] px-3 sm:px-4 py-2 rounded-xl border border-[#202c2e] flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span><strong className="text-white">{quarter}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Stat Cards Filter Row - Mobile Optimized Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3.5 mb-6 sm:mb-8 stat-grid-mobile">
          <StatCard
            title="Total Sites"
            value={stats.total}
            color="blue"
            icon={<Globe className="w-5 h-5" />}
            active={selectedStatusFilter === "ALL"}
            onClick={() =>
              setSelectedStatusFilter(selectedStatusFilter === "ALL" ? "ALL" : "ALL")
            }
          />
          <StatCard
            title="Audited"
            value={stats.audited}
            color="purple"
            icon={<CheckCircle2 className="w-5 h-5" />}
            active={selectedStatusFilter === "AUDITED"}
            onClick={() =>
              setSelectedStatusFilter(
                selectedStatusFilter === "AUDITED" ? "ALL" : "AUDITED"
              )
            }
          />
          <StatCard
            title="Pending"
            value={stats.pending}
            color="gray"
            icon={<FileText className="w-5 h-5" />}
            active={selectedStatusFilter === "PENDING"}
            onClick={() =>
              setSelectedStatusFilter(
                selectedStatusFilter === "PENDING" ? "ALL" : "PENDING"
              )
            }
          />
          <StatCard
            title="Passed"
            value={stats.passed}
            color="green"
            icon={<CheckCircle2 className="w-5 h-5" />}
            active={selectedStatusFilter === "PASSED"}
            onClick={() =>
              setSelectedStatusFilter(
                selectedStatusFilter === "PASSED" ? "ALL" : "PASSED"
              )
            }
          />
          <StatCard
            title="Needs Review"
            value={stats.needsReview}
            color="yellow"
            icon={<Eye className="w-5 h-5" />}
            active={selectedStatusFilter === "NEEDS_REVIEW"}
            onClick={() =>
              setSelectedStatusFilter(
                selectedStatusFilter === "NEEDS_REVIEW" ? "ALL" : "NEEDS_REVIEW"
              )
            }
          />
          <StatCard
            title="Failed"
            value={stats.failed}
            color="red"
            icon={<Shield className="w-5 h-5" />}
            active={selectedStatusFilter === "FAILED"}
            onClick={() =>
              setSelectedStatusFilter(
                selectedStatusFilter === "FAILED" ? "ALL" : "FAILED"
              )
            }
          />
        </div>

        {/* Search, Filter Tag & View Switcher - Mobile Optimized */}
        <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-md">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search website name, URL..."
            />
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 flex-wrap">
            {selectedStatusFilter !== "ALL" && (
              <button
                onClick={() => setSelectedStatusFilter("ALL")}
                className="inline-flex items-center gap-1.5 text-xs text-[#fff800] bg-[#fff800]/10 hover:bg-[#fff800]/20 active:bg-[#fff800]/30 border border-[#fff800]/30 px-3 py-2 rounded-xl transition-colors"
              >
                <Filter className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Filter:</span> {selectedStatusFilter}
                <span className="font-bold ml-0.5">&times;</span>
              </button>
            )}

            {/* Segmented View Switcher */}
            <div className="inline-flex items-center rounded-xl bg-[#0e1516] border border-[#202c2e] p-1">
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "table"
                    ? "bg-[#182325] text-white shadow-xs border border-[#2b3c3f]"
                    : "text-[#859496] hover:text-white active:bg-[#12191b]"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Table</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("cards")}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "cards"
                    ? "bg-[#182325] text-white shadow-xs border border-[#2b3c3f]"
                    : "text-[#859496] hover:text-white active:bg-[#12191b]"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cards</span>
              </button>
            </div>
          </div>
        </div>

        {/* Website Overview Table / Card Container */}
        <div className="relative rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] shadow-xl overflow-hidden backdrop-blur-md">
          {/* Top highlight gradient line */}
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#fff800]/40 to-transparent pointer-events-none" />

          <div className="px-6 py-4 border-b border-[#1c282a] flex items-center justify-between bg-[#12191b]/50">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Website Overview
              </h2>
              <p className="text-xs text-[#859496]">
                Showing {filteredWebsites.length} of {websites.length} systems
              </p>
            </div>

            <Link
              to="/websites"
              className="text-xs font-semibold text-[#fff800] hover:text-[#fffa66] flex items-center gap-1 transition-colors"
            >
              Manage all <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Table View - Auto-switch to cards on mobile */}
          {viewMode === "table" ? (
            <>
              {/* Desktop/Tablet Table View */}
              <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-[#1a2527]">
                <thead className="bg-[#101719]">
                  <tr>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#859496] uppercase tracking-wider">
                      Website / System
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#859496] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#859496] uppercase tracking-wider">
                      Security
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#859496] uppercase tracking-wider">
                      Functionality
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#859496] uppercase tracking-wider">
                      SEO
                    </th>
                    <th className="px-6 py-3.5 text-right text-xs font-semibold text-[#859496] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172224] bg-transparent">
                  {filteredWebsites.map((website) => (
                    <tr
                      key={website.id}
                      className="hover:bg-[#141d1f]/80 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5">
                          <Link
                            to={`/websites/${website.id}`}
                            className="shrink-0 group/logo"
                            title={`View details for ${website.name}`}
                          >
                            <CompanyLogo
                              website={website}
                              className="h-11 w-11 rounded-xl object-contain border border-white/10 bg-white p-1 shadow-sm transition-transform group-hover/logo:scale-105"
                            />
                          </Link>
                          <div className="min-w-0">
                            <Link
                              to={`/websites/${website.id}`}
                              className="text-sm font-semibold text-white hover:text-[#fff800] transition-colors truncate block"
                              title={`View details for ${website.name}`}
                            >
                              {website.name}
                            </Link>
                            <div className="text-xs text-[#859496] flex items-center gap-2 mt-0.5">
                              {website.url !== "URL Not Provided" ? (
                                <a
                                  href={website.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline text-[#859496] hover:text-[#fff800] transition-colors inline-flex items-center gap-1.5 truncate max-w-[200px] sm:max-w-xs"
                                  title={`Open ${website.url}`}
                                >
                                  <span className="truncate">{website.url}</span>
                                  <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-70" />
                                </a>
                              ) : (
                                <span className="truncate max-w-[200px] sm:max-w-xs text-[#64748b]">
                                  {website.url}
                                </span>
                              )}
                              {website.url !== "URL Not Provided" && (
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    handleCopyUrl(website.id, website.url, e)
                                  }
                                  title="Copy URL"
                                  className="text-[#64748b] hover:text-[#fff800] transition-colors p-0.5"
                                >
                                  {copiedId === website.id ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={website.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={website.securityCheck} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={website.functionalityTest} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={website.seo} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <div className="flex items-center justify-end gap-2">
                          {onStartAudit && (
                            <button
                              type="button"
                              onClick={() => onStartAudit(website)}
                              className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg text-black bg-[#fff800] hover:bg-[#ffe600] shadow-glow-yellow transition-all active:scale-95"
                            >
                              <Play className="w-3.5 h-3.5 fill-black" />
                              Audit
                            </button>
                          )}
                          <Link
                            to={`/websites/${website.id}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg text-white bg-[#151f21] hover:bg-[#1d2a2d] border border-[#27373a] hover:border-[#384e52] transition-all"
                          >
                            Details
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredWebsites.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-[#859496]">
                        No websites matched the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (auto-shown on phones) */}
            <div className="block md:hidden p-4 space-y-3">
              {filteredWebsites.map((website) => (
                <div
                  key={website.id}
                  className="rounded-xl bg-[#111819] border border-[#1f2c2e] p-4 hover:border-[#2e3f42] active:border-[#3e4f52] transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Link
                      to={`/websites/${website.id}`}
                      className="shrink-0"
                    >
                      <CompanyLogo
                        website={website}
                        className="h-12 w-12 rounded-xl object-contain border border-white/10 bg-white p-1"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/websites/${website.id}`}
                        className="font-semibold text-white hover:text-[#fff800] active:text-[#fffa66] transition-colors truncate block text-sm"
                      >
                        {website.name}
                      </Link>
                      {website.url !== "URL Not Provided" ? (
                        <a
                          href={website.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#94a3b8] hover:text-[#fff800] active:underline transition-colors truncate block mt-0.5"
                        >
                          {website.url}
                        </a>
                      ) : (
                        <p className="text-xs text-[#64748b] truncate mt-0.5">
                          {website.url}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="rounded-lg bg-[#0e1415] p-2 border border-[#1b2527]">
                      <span className="text-[9px] uppercase tracking-wider text-[#64748b] block mb-1">
                        Status
                      </span>
                      <StatusBadge status={website.status} size="sm" />
                    </div>
                    <div className="rounded-lg bg-[#0e1415] p-2 border border-[#1b2527]">
                      <span className="text-[9px] uppercase tracking-wider text-[#64748b] block mb-1">
                        Security
                      </span>
                      <StatusBadge status={website.securityCheck} size="sm" />
                    </div>
                    <div className="rounded-lg bg-[#0e1415] p-2 border border-[#1b2527]">
                      <span className="text-[9px] uppercase tracking-wider text-[#64748b] block mb-1">
                        Function
                      </span>
                      <StatusBadge status={website.functionalityTest} size="sm" />
                    </div>
                    <div className="rounded-lg bg-[#0e1415] p-2 border border-[#1b2527]">
                      <span className="text-[9px] uppercase tracking-wider text-[#64748b] block mb-1">
                        SEO
                      </span>
                      <StatusBadge status={website.seo} size="sm" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-[#1b2527]">
                    {onStartAudit && (
                      <button
                        type="button"
                        onClick={() => onStartAudit(website)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-lg text-black bg-[#fff800] hover:bg-[#ffe600] active:bg-[#ffd700] shadow-glow-yellow transition-all active:scale-98"
                      >
                        <Play className="w-3.5 h-3.5 fill-black" />
                        Start Audit
                      </button>
                    )}
                    <Link
                      to={`/websites/${website.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-lg text-white bg-[#151f21] hover:bg-[#1d2a2d] active:bg-[#243338] border border-[#27373a] transition-all"
                    >
                      Details
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
              {filteredWebsites.length === 0 && (
                <div className="px-6 py-12 text-center text-[#859496] bg-[#0e1516]/50 rounded-xl border border-[#202c2e]">
                  No websites matched the selected filters.
                </div>
              )}
            </div>
            </>
          ) : (
            /* Cards View */
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredWebsites.map((website) => (
                <div
                  key={website.id}
                  className="rounded-xl bg-[#111819] border border-[#1f2c2e] p-5 hover:border-[#2e3f42] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start gap-3 mb-3">
                      <Link
                        to={`/websites/${website.id}`}
                        className="shrink-0"
                        title={`View details for ${website.name}`}
                      >
                        <CompanyLogo
                          website={website}
                          className="h-12 w-12 rounded-xl object-contain border border-white/10 bg-white p-1"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/websites/${website.id}`}
                          className="font-semibold text-white hover:text-[#fff800] transition-colors truncate block text-sm"
                        >
                          {website.name}
                        </Link>
                        {website.url !== "URL Not Provided" ? (
                          <a
                            href={website.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#859496] hover:text-[#fff800] hover:underline transition-colors truncate block mt-0.5"
                          >
                            {website.url}
                          </a>
                        ) : (
                          <p className="text-xs text-[#64748b] truncate mt-0.5">
                            {website.url}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 my-4">
                      <div className="rounded-lg bg-[#0e1415] p-2 border border-[#1b2527]">
                        <span className="text-[10px] uppercase tracking-wider text-[#64748b] block mb-1">
                          Status
                        </span>
                        <StatusBadge status={website.status} size="sm" />
                      </div>
                      <div className="rounded-lg bg-[#0e1415] p-2 border border-[#1b2527]">
                        <span className="text-[10px] uppercase tracking-wider text-[#64748b] block mb-1">
                          Security
                        </span>
                        <StatusBadge status={website.securityCheck} size="sm" />
                      </div>
                      <div className="rounded-lg bg-[#0e1415] p-2 border border-[#1b2527]">
                        <span className="text-[10px] uppercase tracking-wider text-[#64748b] block mb-1">
                          Function
                        </span>
                        <StatusBadge status={website.functionalityTest} size="sm" />
                      </div>
                      <div className="rounded-lg bg-[#0e1415] p-2 border border-[#1b2527]">
                        <span className="text-[10px] uppercase tracking-wider text-[#64748b] block mb-1">
                          SEO
                        </span>
                        <StatusBadge status={website.seo} size="sm" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-[#1b2527]">
                    {onStartAudit && (
                      <button
                        type="button"
                        onClick={() => onStartAudit(website)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-lg text-black bg-[#fff800] hover:bg-[#ffe600] shadow-glow-yellow transition-all active:scale-95"
                      >
                        <Play className="w-3.5 h-3.5 fill-black" />
                        Audit
                      </button>
                    )}
                    <Link
                      to={`/websites/${website.id}`}
                      className="flex-1 text-center text-xs font-semibold py-2 rounded-lg bg-[#182325] hover:bg-[#202e31] text-white border border-[#27373a] transition-all inline-flex items-center justify-center gap-1"
                    >
                      Details
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links with Paddle aesthetic */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/websites"
            className="group rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] hover:border-[#334649] p-6 transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white group-hover:text-[#fff800] transition-colors mb-1 text-base">
              All Websites
            </h3>
            <p className="text-xs text-[#859496]">
              Browse catalog and view granular specs.
            </p>
          </Link>

          <Link
            to="/security"
            className="group rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] hover:border-[#334649] p-6 transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="h-10 w-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white group-hover:text-[#fff800] transition-colors mb-1 text-base">
              Security Audit
            </h3>
            <p className="text-xs text-[#859496]">
              Verify SSL, headers, and security checklists.
            </p>
          </Link>

          <Link
            to="/seo"
            className="group rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] hover:border-[#334649] p-6 transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white group-hover:text-[#fff800] transition-colors mb-1 text-base">
              SEO Analysis
            </h3>
            <p className="text-xs text-[#859496]">
              Audit rankings, meta tags, and indexing.
            </p>
          </Link>

          <Link
            to="/reports"
            className="group rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] hover:border-[#334649] p-6 transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white group-hover:text-[#fff800] transition-colors mb-1 text-base">
              Full Reports
            </h3>
            <p className="text-xs text-[#859496]">
              Comprehensive printable and exportable reports.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

