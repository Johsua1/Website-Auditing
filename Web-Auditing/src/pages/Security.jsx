import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Lock,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { securityChecklist } from "../data/mockData";

const Security = ({ websites }) => {
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [expandedId, setExpandedId] = useState(null);

  const securityStats = {
    passed: websites.filter((w) => w.securityCheck === "Passed").length,
    warning: websites.filter((w) => w.securityCheck === "Warning").length,
    failed: websites.filter((w) => w.securityCheck === "Failed").length,
    notTested: websites.filter((w) => w.securityCheck === "Not Tested").length,
  };

  const filteredWebsites = websites.filter((w) => {
    if (selectedFilter === "ALL") return true;
    return w.securityCheck === selectedFilter;
  });

  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Security Audit Overview
            </h1>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
              Vulnerability &amp; SSL
            </span>
          </div>
          <p className="text-sm sm:text-base text-[#859496]">
            Inspect SSL certificates, security headers, authentication layers, and firewall integrity.
          </p>
        </div>

        {/* Interactive Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
          <StatCard
            title="Passed"
            value={securityStats.passed}
            color="green"
            icon={<CheckCircle2 className="w-5 h-5" />}
            active={selectedFilter === "Passed"}
            onClick={() =>
              setSelectedFilter(selectedFilter === "Passed" ? "ALL" : "Passed")
            }
          />
          <StatCard
            title="Warning"
            value={securityStats.warning}
            color="yellow"
            icon={<AlertTriangle className="w-5 h-5" />}
            active={selectedFilter === "Warning"}
            onClick={() =>
              setSelectedFilter(selectedFilter === "Warning" ? "ALL" : "Warning")
            }
          />
          <StatCard
            title="Failed"
            value={securityStats.failed}
            color="red"
            icon={<Shield className="w-5 h-5" />}
            active={selectedFilter === "Failed"}
            onClick={() =>
              setSelectedFilter(selectedFilter === "Failed" ? "ALL" : "Failed")
            }
          />
          <StatCard
            title="Not Tested"
            value={securityStats.notTested}
            color="gray"
            icon={<Lock className="w-5 h-5" />}
            active={selectedFilter === "Not Tested"}
            onClick={() =>
              setSelectedFilter(
                selectedFilter === "Not Tested" ? "ALL" : "Not Tested"
              )
            }
          />
        </div>

        {/* Security Checklist Reference */}
        <div className="relative rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] p-6 mb-8 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white tracking-tight">
              Security Checklist Reference
            </h2>
            <span className="text-xs text-[#859496]">
              Click item to toggle inspection guidelines
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {securityChecklist.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="rounded-xl bg-[#111819] border border-[#1e2b2d] hover:border-[#2d3e41] p-4 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-[#fff800]" />
                      <h3 className="text-sm font-semibold text-white">
                        {item.name}
                      </h3>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 text-[#64748b] transition-transform ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                  <p className="text-xs text-[#859496] mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Websites Security Status */}
        <div className="relative rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] shadow-xl overflow-hidden backdrop-blur-md">
          <div className="px-6 py-4 border-b border-[#1c282a] flex items-center justify-between bg-[#12191b]/50">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Website Security Assessments
              </h2>
              {selectedFilter !== "ALL" && (
                <span className="text-xs text-[#fff800]">
                  Filtered by: {selectedFilter}
                </span>
              )}
            </div>
            {selectedFilter !== "ALL" && (
              <button
                onClick={() => setSelectedFilter("ALL")}
                className="text-xs font-semibold text-[#859496] hover:text-white"
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
                    Security Result
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
                      <StatusBadge status={website.securityCheck} />
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

export default Security;

