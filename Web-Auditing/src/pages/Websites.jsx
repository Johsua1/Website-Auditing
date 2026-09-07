import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Eye, Play, X, SlidersHorizontal } from "lucide-react";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { filterWebsites } from "../utils/helpers";
import {
  statusOptions,
  securityOptions,
  functionalityOptions,
  seoOptions,
} from "../data/mockData";

const Websites = ({ websites, onStartAudit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "All",
    security: "All",
    functionality: "All",
    seo: "All",
    type: "All",
  });

  const filteredWebsiteList = filterWebsites(websites, searchTerm, filters);

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({ status: "All", security: "All", functionality: "All", seo: "All", type: "All" });
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some((f) => f !== "All");

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* ── Header ── */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-green-50">
            All Websites
          </h1>
          <p className="mt-1 text-sm text-green-100/50">
            Manage and monitor all company websites in one place.
          </p>
        </div>
        <span className="text-xs text-green-100/40 mt-1.5 flex-shrink-0">
          {filteredWebsiteList.length} of {websites.length}
        </span>
      </div>

      {/* ── Search + Filter Toggle ── */}
      <div className="glass-card p-4 mb-6 space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by name or URL…"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm border transition-colors
              ${showFilters || hasActiveFilters
                ? "bg-emerald-400/10 border-emerald-400/30 text-emerald-400"
                : "bg-white/5 border-emerald-400/15 text-green-100/60 hover:text-green-100/90"
              }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            )}
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2 border-t border-emerald-400/10">
            <FilterDropdown
              label="Status"
              value={filters.status}
              onChange={(v) => setFilters({ ...filters, status: v })}
              options={statusOptions}
            />
            <FilterDropdown
              label="Security"
              value={filters.security}
              onChange={(v) => setFilters({ ...filters, security: v })}
              options={securityOptions}
            />
            <FilterDropdown
              label="Functionality"
              value={filters.functionality}
              onChange={(v) => setFilters({ ...filters, functionality: v })}
              options={functionalityOptions}
            />
            <FilterDropdown
              label="SEO"
              value={filters.seo}
              onChange={(v) => setFilters({ ...filters, seo: v })}
              options={seoOptions}
            />
            <FilterDropdown
              label="Type"
              value={filters.type}
              onChange={(v) => setFilters({ ...filters, type: v })}
              options={["Website", "System", "Portal"]}
            />
          </div>
        )}

        {hasActiveFilters && (
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs text-red-400/70 hover:text-red-400 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* ── Website Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredWebsiteList.map((website) => (
          <div
            key={website.id}
            className="glass-card glass-card-hover flex flex-col overflow-hidden"
          >
            {/* Card header */}
            <div className="p-5 border-b border-emerald-400/10">
              <div className="flex items-center gap-4 mb-3">
                <CompanyLogo
                  website={website}
                  className="h-14 w-14 rounded-xl object-cover border border-emerald-400/15 bg-white/5 shadow-sm flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-green-50 truncate">
                    {website.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-green-100/40 mt-0.5">
                    {website.type}
                  </p>
                </div>
              </div>
              <p className="text-xs text-green-100/50 leading-relaxed line-clamp-2">
                {website.description}
              </p>
            </div>

            {/* Card body */}
            <div className="p-5 flex-1">
              <div className="flex items-center gap-2 text-xs text-green-100/40 mb-4">
                <span className="font-medium text-green-100/30">URL</span>
                <span className="truncate flex-1">{website.url}</span>
                {website.url !== "URL Not Provided" && (
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400/50 hover:text-emerald-400 transition-colors ml-auto flex-shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  ["Status", website.status],
                  ["Security", website.securityCheck],
                  ["Functionality", website.functionalityTest],
                  ["SEO", website.seo],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    className="rounded-lg bg-white/4 border border-emerald-400/8 p-2.5"
                    style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(74,222,128,0.08)" }}
                  >
                    <div className="text-[10px] uppercase tracking-wider text-green-100/35 mb-1.5">
                      {label}
                    </div>
                    <StatusBadge status={val} showIcon={false} />
                  </div>
                ))}
              </div>
            </div>

            {/* Card footer */}
            <div className="px-5 pb-5 flex gap-3">
              <Link
                to={`/websites/${website.id}`}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-medium
                  bg-emerald-400/10 border border-emerald-400/25 text-emerald-400
                  hover:bg-emerald-400/15 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                View Details
              </Link>
              <button
                onClick={() => onStartAudit(website)}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-medium
                  bg-white/5 border border-emerald-400/15 text-green-100/70
                  hover:bg-white/8 hover:text-green-100/90 transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                Audit
              </button>
            </div>
          </div>
        ))}

        {filteredWebsiteList.length === 0 && (
          <div className="col-span-full glass-card p-12 text-center">
            <p className="text-green-100/40">No websites match your criteria.</p>
            <button
              onClick={clearFilters}
              className="mt-3 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Websites;
