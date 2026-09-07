import { useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  HelpCircle,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { seoChecklist } from "../data/mockData";

const SEO = ({ websites }) => {
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [expandedId, setExpandedId] = useState(null);

  const seoStats = {
    good: websites.filter((w) => w.seo === "Good").length,
    needsImprovement: websites.filter((w) => w.seo === "Needs Improvement").length,
    poor: websites.filter((w) => w.seo === "Poor").length,
    notTested: websites.filter((w) => w.seo === "Not Tested").length,
  };

  const filteredWebsites = websites.filter((w) => {
    if (selectedFilter === "ALL") return true;
    return w.seo === selectedFilter;
  });

  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              SEO Audit Overview
            </h1>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Search &amp; Indexing
            </span>
          </div>
          <p className="text-sm sm:text-base text-[#859496]">
            Monitor search engine optimization, meta tags, indexability, and organic ranking readiness across all domains.
          </p>
        </div>

        {/* Interactive Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
          <StatCard
            title="Good"
            value={seoStats.good}
            color="green"
            icon={<TrendingUp className="w-5 h-5" />}
            active={selectedFilter === "Good"}
            onClick={() =>
              setSelectedFilter(selectedFilter === "Good" ? "ALL" : "Good")
            }
          />
          <StatCard
            title="Needs Improvement"
            value={seoStats.needsImprovement}
            color="yellow"
            icon={<Minus className="w-5 h-5" />}
            active={selectedFilter === "Needs Improvement"}
            onClick={() =>
              setSelectedFilter(
                selectedFilter === "Needs Improvement" ? "ALL" : "Needs Improvement"
              )
            }
          />
          <StatCard
            title="Poor"
            value={seoStats.poor}
            color="red"
            icon={<TrendingDown className="w-5 h-5" />}
            active={selectedFilter === "Poor"}
            onClick={() =>
              setSelectedFilter(selectedFilter === "Poor" ? "ALL" : "Poor")
            }
          />
          <StatCard
            title="Not Tested"
            value={seoStats.notTested}
            color="gray"
            icon={<HelpCircle className="w-5 h-5" />}
            active={selectedFilter === "Not Tested"}
            onClick={() =>
              setSelectedFilter(
                selectedFilter === "Not Tested" ? "ALL" : "Not Tested"
              )
            }
          />
        </div>

        {/* SEO Checklist Reference */}
        <div className="relative rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] p-6 mb-8 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#fff800]" />
              <h2 className="text-base font-bold text-white tracking-tight">
                SEO Audit Checklist
              </h2>
            </div>
            <span className="text-xs text-[#859496]">
              Click item to toggle inspection criteria
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {seoChecklist.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="rounded-xl bg-[#111819] border border-[#1e2b2d] hover:border-[#2d3e41] p-4 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#162022] border border-[#243336] flex items-center justify-center text-xs font-bold text-[#fff800]">
                        {item.id}
                      </div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-[#fff800] transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 text-[#64748b] transition-transform ${
                        isExpanded ? "rotate-90 text-[#fff800]" : ""
                      }`}
                    />
                  </div>
                  <p className="text-xs text-[#859496] mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Websites SEO Status */}
        <div className="relative rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] shadow-xl overflow-hidden backdrop-blur-md">
          <div className="px-6 py-4 border-b border-[#1c282a] flex items-center justify-between bg-[#12191b]/50">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Website SEO Scores
              </h2>
              {selectedFilter !== "ALL" && (
                <span className="text-xs text-[#fff800] mt-0.5 block">
                  Filtered by: {selectedFilter}
                </span>
              )}
            </div>
            {selectedFilter !== "ALL" && (
              <button
                onClick={() => setSelectedFilter("ALL")}
                className="text-xs font-semibold text-[#859496] hover:text-white transition-colors"
              >
                Reset Filter
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#1a2527]">
              <thead className="bg-[#101719]">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#859496] uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#859496] uppercase tracking-wider">
                    SEO Score
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#859496] uppercase tracking-wider">
                    Overall Status
                  </th>
                  <th className="px-6 py-3.5 text-right text-xs font-semibold text-[#859496] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#172224]">
                {filteredWebsites.map((website) => (
                  <tr
                    key={website.id}
                    className="hover:bg-[#141d1f]/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <CompanyLogo
                          website={website}
                          className="h-11 w-11 rounded-xl object-contain border border-white/10 bg-white p-1 shrink-0 shadow-sm"
                        />
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-white group-hover:text-[#fff800] transition-colors truncate">
                            {website.name}
                          </div>
                          <div className="text-xs text-[#859496] truncate">
                            {website.url}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={website.seo} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={website.status} showIcon={false} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <Link
                        to={`/websites/${website.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg text-white bg-[#151f21] hover:bg-[#1d2a2d] border border-[#27373a] hover:border-[#384e52] transition-all"
                      >
                        Details
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEO;
