import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, CheckCircle2, Clock, X, ArrowUpRight } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { formatDate } from "../utils/helpers";

const DateAudited = ({ websites }) => {
  const [selectedDate, setSelectedDate] = useState("");

  const filteredWebsites = selectedDate
    ? websites.filter((w) => {
        if (!w.dateAudited) return false;
        const auditDate = new Date(w.dateAudited).toISOString().split("T")[0];
        return auditDate === selectedDate;
      })
    : websites;

  const auditedCount = websites.filter((w) => w.dateAudited).length;
  const notAuditedCount = websites.filter((w) => !w.dateAudited).length;
  const auditedPercent = Math.round((auditedCount / (websites.length || 1)) * 100);

  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Audit Date Overview
            </h1>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#fff800]/10 text-[#fff800] border border-[#fff800]/20">
              Chronology
            </span>
          </div>
          <p className="text-sm sm:text-base text-[#859496]">
            Filter and track websites by last verification timestamp and schedule upcoming reviews.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="relative overflow-hidden rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] p-6 shadow-xl backdrop-blur-md">
            <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#859496] mb-1">
                  Audited Sites
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white">
                    {auditedCount}
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold">
                    {auditedPercent}% completed
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-4 h-1.5 w-full bg-[#182426] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-[#fff800] rounded-full transition-all duration-500"
                style={{ width: `${auditedPercent}%` }}
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] p-6 shadow-xl backdrop-blur-md">
            <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#fff800]/70 to-transparent" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#859496] mb-1">
                  Pending Audit
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white">
                    {notAuditedCount}
                  </span>
                  <span className="text-xs text-[#859496] font-semibold">
                    {100 - auditedPercent}% remaining
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-xl bg-[#fff800]/10 border border-[#fff800]/20 text-[#fff800] flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-4 h-1.5 w-full bg-[#182426] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-slate-600 to-[#fff800] rounded-full transition-all duration-500"
                style={{ width: `${100 - auditedPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Date Filter & Interactive Presets */}
        <div className="relative rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] p-6 mb-8 shadow-xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div className="w-full sm:max-w-md">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#859496] mb-1.5">
                Filter by Exact Audit Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="block w-full px-4 py-2.5 rounded-xl border border-[#202c2e] bg-[#0d1415] text-white text-sm focus:outline-none focus:border-[#fff800]/60 focus:ring-2 focus:ring-[#fff800]/15"
                />
              </div>
            </div>

            {selectedDate && (
              <button
                onClick={() => setSelectedDate("")}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#141d1f] hover:bg-[#1b272a] text-[#fff800] text-xs font-semibold border border-[#233134] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Clear Date Filter
              </button>
            )}
          </div>

          {selectedDate && (
            <p className="mt-4 text-xs text-[#859496]">
              Showing {filteredWebsites.filter((w) => w.dateAudited).length}{" "}
              website(s) audited on{" "}
              <strong className="text-white">
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </strong>
            </p>
          )}
        </div>

        {/* Websites Table */}
        <div className="relative rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] shadow-xl overflow-hidden backdrop-blur-md">
          <div className="px-6 py-4 border-b border-[#1c282a] flex items-center justify-between bg-[#12191b]/50">
            <h2 className="text-base font-bold text-white tracking-tight">
              Audit Date Records
            </h2>
            <span className="text-xs text-[#859496]">
              {filteredWebsites.length} Records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#1a2527]">
              <thead className="bg-[#101719]">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#859496] uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#859496] uppercase tracking-wider">
                    Last Audit Date
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#859496] uppercase tracking-wider">
                    Status
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
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#fff800]" />
                        <span
                          className={`text-sm ${
                            website.dateAudited
                              ? "text-white font-medium"
                              : "text-[#64748b]"
                          }`}
                        >
                          {formatDate(website.dateAudited)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={website.status} />
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

export default DateAudited;

