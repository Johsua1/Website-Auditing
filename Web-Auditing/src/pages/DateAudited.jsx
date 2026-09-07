import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, X } from "lucide-react";
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

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-green-50">Audit Dates</h1>
        <p className="mt-1 text-sm text-green-100/50">View websites by their last audit date.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="glass-card p-5 flex items-center justify-between border-l-2 border-l-emerald-400/50">
          <div>
            <p className="text-xs text-green-100/40 uppercase tracking-wider mb-1">Audited</p>
            <p className="text-3xl font-bold text-green-50">{auditedCount}</p>
          </div>
          <Calendar className="w-8 h-8 text-emerald-400/40" />
        </div>
        <div className="glass-card p-5 flex items-center justify-between border-l-2 border-l-slate-500/50">
          <div>
            <p className="text-xs text-green-100/40 uppercase tracking-wider mb-1">Not Audited</p>
            <p className="text-3xl font-bold text-green-50">{notAuditedCount}</p>
          </div>
          <Calendar className="w-8 h-8 text-slate-500/40" />
        </div>
      </div>

      {/* Date filter */}
      <div className="glass-card p-5 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium uppercase tracking-wider text-green-100/40 mb-2">
              Filter by Audit Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="block w-full px-3 py-2.5 rounded-lg text-sm
                bg-white/5 border border-emerald-400/15
                text-green-100/80
                focus:outline-none focus:ring-1 focus:ring-emerald-400/40 focus:border-emerald-400/40
                transition-colors"
              style={{ colorScheme: "dark" }}
            />
          </div>
          {selectedDate && (
            <button
              onClick={() => setSelectedDate("")}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm border border-red-400/20 bg-red-400/5 text-red-400 hover:bg-red-400/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>
        {selectedDate && (
          <p className="mt-3 text-xs text-green-100/40">
            Showing {filteredWebsites.filter((w) => w.dateAudited).length} website(s) audited on{" "}
            <span className="text-green-100/70">
              {new Date(selectedDate).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </span>
          </p>
        )}
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-emerald-400/10">
          <h2 className="text-sm font-semibold text-green-100/90 tracking-wide">Websites Audit Dates</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full dark-table">
            <thead>
              <tr>
                <th className="text-left">Website</th>
                <th className="text-left">Last Audit Date</th>
                <th className="text-left">Status</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWebsites.map((website) => (
                <tr key={website.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <CompanyLogo website={website} className="h-10 w-10 rounded-lg border border-emerald-400/15 bg-white/5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-green-50">{website.name}</div>
                        <div className="text-xs text-green-100/40 mt-0.5">{website.url}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400/40" />
                      <span className={website.dateAudited ? "text-green-100/80" : "text-green-100/30"}>
                        {formatDate(website.dateAudited)}
                      </span>
                    </div>
                  </td>
                  <td><StatusBadge status={website.status} /></td>
                  <td>
                    <Link to={`/websites/${website.id}`} className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                      View Details →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DateAudited;
