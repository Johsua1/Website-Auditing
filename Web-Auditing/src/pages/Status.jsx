import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  Loader,
  ArrowUpRight,
} from "lucide-react";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { getStatistics } from "../utils/helpers";

const Status = ({ websites }) => {
  const [activeGroup, setActiveGroup] = useState("ALL");
  const stats = getStatistics(websites);

  const statusGroups = {
    Passed: websites.filter((w) => w.status === "Passed"),
    "Needs Review": websites.filter((w) => w.status === "Needs Review"),
    Failed: websites.filter((w) => w.status === "Failed"),
    Pending: websites.filter((w) => w.status === "Pending"),
    "In Progress": websites.filter((w) => w.status === "In Progress"),
  };

  const displayedGroups =
    activeGroup === "ALL"
      ? statusGroups
      : { [activeGroup]: statusGroups[activeGroup] || [] };

  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Website Status Overview
            </h1>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#fff800]/10 text-[#fff800] border border-[#fff800]/20">
              Health Status
            </span>
          </div>
          <p className="text-sm sm:text-base text-[#859496]">
            Comprehensive breakdown of corporate websites grouped by audit verification state.
          </p>
        </div>

        {/* Interactive Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-8">
          <StatCard
            title="Passed"
            value={stats.passed}
            color="green"
            icon={<CheckCircle2 className="w-5 h-5" />}
            active={activeGroup === "Passed"}
            onClick={() =>
              setActiveGroup(activeGroup === "Passed" ? "ALL" : "Passed")
            }
          />
          <StatCard
            title="Needs Review"
            value={stats.needsReview}
            color="yellow"
            icon={<AlertCircle className="w-5 h-5" />}
            active={activeGroup === "Needs Review"}
            onClick={() =>
              setActiveGroup(
                activeGroup === "Needs Review" ? "ALL" : "Needs Review"
              )
            }
          />
          <StatCard
            title="Failed"
            value={stats.failed}
            color="red"
            icon={<XCircle className="w-5 h-5" />}
            active={activeGroup === "Failed"}
            onClick={() =>
              setActiveGroup(activeGroup === "Failed" ? "ALL" : "Failed")
            }
          />
          <StatCard
            title="Pending"
            value={stats.pending}
            color="gray"
            icon={<Clock className="w-5 h-5" />}
            active={activeGroup === "Pending"}
            onClick={() =>
              setActiveGroup(activeGroup === "Pending" ? "ALL" : "Pending")
            }
          />
          <StatCard
            title="In Progress"
            value={websites.filter((w) => w.status === "In Progress").length}
            color="blue"
            icon={<Loader className="w-5 h-5" />}
            active={activeGroup === "In Progress"}
            onClick={() =>
              setActiveGroup(
                activeGroup === "In Progress" ? "ALL" : "In Progress"
              )
            }
          />
        </div>

        {activeGroup !== "ALL" && (
          <div className="mb-6 flex items-center justify-between">
            <span className="text-xs text-[#859496]">
              Filtering by status:{" "}
              <strong className="text-white">{activeGroup}</strong>
            </span>
            <button
              onClick={() => setActiveGroup("ALL")}
              className="text-xs font-semibold text-[#fff800] hover:text-[#fffa66] bg-[#fff800]/10 px-3 py-1.5 rounded-lg border border-[#fff800]/25 transition-colors"
            >
              Show All Status Groups
            </button>
          </div>
        )}

        {/* Status Groups */}
        <div className="space-y-6">
          {Object.entries(displayedGroups).map(([status, websiteList]) => (
            <div
              key={status}
              className="relative rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] shadow-xl overflow-hidden backdrop-blur-md"
            >
              <div className="px-6 py-4 border-b border-[#1c282a] flex items-center justify-between bg-[#12191b]/60">
                <div className="flex items-center gap-3">
                  <h2 className="text-base font-bold text-white tracking-tight">
                    {status}
                  </h2>
                  <span className="bg-[#182325] text-[#859496] px-2.5 py-0.5 rounded-full text-xs font-semibold border border-[#243437]">
                    {websiteList.length}
                  </span>
                </div>
              </div>

              {websiteList.length > 0 ? (
                <div className="divide-y divide-[#172224]">
                  {websiteList.map((website) => (
                    <div
                      key={website.id}
                      className="px-6 py-4 hover:bg-[#141d1f]/80 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1 gap-3.5 min-w-0">
                          <CompanyLogo
                            website={website}
                            className="h-11 w-11 rounded-xl object-contain border border-white/10 bg-white p-1 shrink-0 shadow-sm"
                          />
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-semibold text-white group-hover:text-[#fff800] transition-colors truncate">
                              {website.name}
                            </h3>
                            <p className="text-xs text-[#859496] truncate">
                              {website.url}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 ml-4">
                          <div className="hidden sm:flex items-center gap-3">
                            <div className="text-center">
                              <div className="text-[10px] text-[#64748b] uppercase tracking-wider mb-1">
                                Security
                              </div>
                              <StatusBadge
                                status={website.securityCheck}
                                showIcon={false}
                                size="sm"
                              />
                            </div>
                            <div className="text-center">
                              <div className="text-[10px] text-[#64748b] uppercase tracking-wider mb-1">
                                Function
                              </div>
                              <StatusBadge
                                status={website.functionalityTest}
                                showIcon={false}
                                size="sm"
                              />
                            </div>
                            <div className="text-center">
                              <div className="text-[10px] text-[#64748b] uppercase tracking-wider mb-1">
                                SEO
                              </div>
                              <StatusBadge
                                status={website.seo}
                                showIcon={false}
                                size="sm"
                              />
                            </div>
                          </div>

                          <Link
                            to={`/websites/${website.id}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg text-white bg-[#151f21] hover:bg-[#1d2a2d] border border-[#27373a] hover:border-[#384e52] transition-all whitespace-nowrap"
                          >
                            Details
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-8 text-center text-xs text-[#859496]">
                  No websites found currently marked with status: {status}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Status;

