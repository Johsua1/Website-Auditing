import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  Eye,
  Play,
  X,
  Copy,
  Check,
  Globe,
  Sparkles,
} from "lucide-react";
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
  const [copiedId, setCopiedId] = useState(null);
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
    setFilters({
      status: "All",
      security: "All",
      functionality: "All",
      seo: "All",
      type: "All",
    });
  };

  const handleCopy = (id, url, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!url || url === "URL Not Provided") return;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const hasActiveFilters =
    searchTerm || Object.values(filters).some((f) => f !== "All");

  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              All Websites &amp; Systems
            </h1>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#fff800]/10 text-[#fff800] border border-[#fff800]/20">
              Directory
            </span>
          </div>
          <p className="text-sm sm:text-base text-[#859496]">
            Manage, filter, and initiate comprehensive audits across all company properties.
          </p>
        </div>

        {/* Search and Filters Panel */}
        <div className="relative rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] p-6 mb-8 shadow-xl backdrop-blur-md">
          {/* Subtle top highlight */}
          <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#fff800]/30 to-transparent pointer-events-none" />

          <div className="mb-5">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by website name or URL..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-4">
            <FilterDropdown
              label="Status"
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
              options={statusOptions}
            />
            <FilterDropdown
              label="Security"
              value={filters.security}
              onChange={(value) => setFilters({ ...filters, security: value })}
              options={securityOptions}
            />
            <FilterDropdown
              label="Functionality"
              value={filters.functionality}
              onChange={(value) =>
                setFilters({ ...filters, functionality: value })
              }
              options={functionalityOptions}
            />
            <FilterDropdown
              label="SEO"
              value={filters.seo}
              onChange={(value) => setFilters({ ...filters, seo: value })}
              options={seoOptions}
            />
            <FilterDropdown
              label="Type"
              value={filters.type}
              onChange={(value) => setFilters({ ...filters, type: value })}
              options={["Website", "System", "Portal"]}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1a2527]">
            <div className="text-xs text-[#859496]">
              Showing{" "}
              <strong className="text-white font-semibold">
                {filteredWebsiteList.length}
              </strong>{" "}
              of {websites.length} websites
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-xs text-[#fff800] hover:text-[#fffa66] font-semibold bg-[#fff800]/10 hover:bg-[#fff800]/15 border border-[#fff800]/30 px-3 py-1.5 rounded-lg transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Websites Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredWebsiteList.map((website) => (
            <div
              key={website.id}
              className="relative rounded-2xl bg-[#0e1516]/95 border border-[#202c2e] hover:border-[#324548] shadow-xl hover:shadow-2xl transition-all duration-200 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* Card top edge gradient line */}
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#fff800]/40 to-transparent pointer-events-none" />

              {/* Card Top Header */}
              <div className="p-5 border-b border-[#1b2729] bg-[#11191a]/60">
                <div className="flex items-center gap-3.5 mb-3">
                  <CompanyLogo
                    website={website}
                    className="h-14 w-14 rounded-xl object-contain border border-white/10 bg-white p-1.5 shadow-sm shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-white group-hover:text-[#fff800] transition-colors truncate">
                      {website.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#182325] text-[#859496] border border-[#243336]">
                        {website.type}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#859496] leading-relaxed line-clamp-2 min-h-[32px]">
                  {website.description}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                {/* URL row with copy & external link */}
                <div className="flex items-center justify-between text-xs text-[#859496] bg-[#101719] border border-[#1c282a] rounded-xl px-3 py-2 mb-4">
                  <span className="truncate mr-2 font-mono text-[11px] text-[#cbd5e1]">
                    {website.url}
                  </span>
                  {website.url !== "URL Not Provided" && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleCopy(website.id, website.url, e)}
                        className="text-[#64748b] hover:text-[#fff800] transition-colors"
                        title="Copy URL"
                      >
                        {copiedId === website.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <a
                        href={website.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#64748b] hover:text-white transition-colors"
                        title="Open website"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Status Grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  <div className="rounded-xl bg-[#11191a] p-2.5 border border-[#1e2b2d]">
                    <div className="text-[10px] uppercase tracking-wider text-[#64748b] mb-1">
                      Status
                    </div>
                    <StatusBadge status={website.status} size="sm" />
                  </div>
                  <div className="rounded-xl bg-[#11191a] p-2.5 border border-[#1e2b2d]">
                    <div className="text-[10px] uppercase tracking-wider text-[#64748b] mb-1">
                      Security
                    </div>
                    <StatusBadge status={website.securityCheck} size="sm" />
                  </div>
                  <div className="rounded-xl bg-[#11191a] p-2.5 border border-[#1e2b2d]">
                    <div className="text-[10px] uppercase tracking-wider text-[#64748b] mb-1">
                      Functionality
                    </div>
                    <StatusBadge status={website.functionalityTest} size="sm" />
                  </div>
                  <div className="rounded-xl bg-[#11191a] p-2.5 border border-[#1e2b2d]">
                    <div className="text-[10px] uppercase tracking-wider text-[#64748b] mb-1">
                      SEO
                    </div>
                    <StatusBadge status={website.seo} size="sm" />
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2.5 pt-2 border-t border-[#1b2628]">
                  <Link
                    to={`/websites/${website.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#151f21] hover:bg-[#1d2a2d] text-white text-xs font-semibold border border-[#27373a] hover:border-[#384e52] transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#859496]" />
                    Details
                  </Link>
                  <button
                    type="button"
                    onClick={() => onStartAudit(website)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#fff800] hover:bg-[#fffa66] text-black text-xs font-bold shadow-[0_0_15px_rgba(255,248,0,0.2)] transition-all active:scale-[0.98]"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    Audit
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredWebsiteList.length === 0 && (
            <div className="col-span-full rounded-2xl bg-[#0e1516] border border-[#202c2e] p-12 text-center">
              <Globe className="w-12 h-12 text-[#64748b] mx-auto mb-3" />
              <p className="text-white font-semibold text-lg mb-1">
                No websites match your filter criteria
              </p>
              <p className="text-xs text-[#859496] mb-4">
                Try adjusting your search terms or clearing your filter selections.
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-[#fff800] text-black hover:bg-[#fffa66] transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Websites;

