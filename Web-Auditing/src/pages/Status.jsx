import { Link } from "react-router-dom";
import { CheckCircle, AlertCircle, XCircle, Clock, Loader } from "lucide-react";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { getStatistics } from "../utils/helpers";

const STATUS_CONFIG = {
  Passed: { color: "green", Icon: CheckCircle },
  "Needs Review": { color: "yellow", Icon: AlertCircle },
  Failed: { color: "red", Icon: XCircle },
  Pending: { color: "gray", Icon: Clock },
  "In Progress": { color: "blue", Icon: Loader },
};

const Status = ({ websites }) => {
  const stats = getStatistics(websites);

  const statusGroups = Object.fromEntries(
    Object.keys(STATUS_CONFIG).map((s) => [s, websites.filter((w) => w.status === s)])
  );

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-green-50">Website Status</h1>
        <p className="mt-1 text-sm text-green-100/50">View all websites organised by their current audit status.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        <StatCard title="Passed" value={stats.passed} color="green" icon={<CheckCircle className="w-7 h-7" />} />
        <StatCard title="Needs Review" value={stats.needsReview} color="yellow" icon={<AlertCircle className="w-7 h-7" />} />
        <StatCard title="Failed" value={stats.failed} color="red" icon={<XCircle className="w-7 h-7" />} />
        <StatCard title="Pending" value={stats.pending} color="gray" icon={<Clock className="w-7 h-7" />} />
        <StatCard
          title="In Progress"
          value={websites.filter((w) => w.status === "In Progress").length}
          color="blue"
          icon={<Loader className="w-7 h-7" />}
        />
      </div>

      <div className="space-y-5">
        {Object.entries(statusGroups).map(([status, list]) => (
          <div key={status} className="glass-card overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-emerald-400/10" style={{ background: "rgba(255,255,255,0.02)" }}>
              <h2 className="text-sm font-semibold text-green-100/80 tracking-wide">{status}</h2>
              <span className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                {list.length}
              </span>
            </div>

            {list.length > 0 ? (
              <div className="divide-y divide-emerald-400/8">
                {list.map((website) => (
                  <div key={website.id} className="flex items-center justify-between px-6 py-4 hover:bg-white/2 transition-colors" style={{}}>
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <CompanyLogo website={website} className="h-10 w-10 rounded-lg border border-emerald-400/15 bg-white/5 flex-shrink-0" />
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium text-green-50 truncate">{website.name}</h3>
                        <p className="text-xs text-green-100/40 mt-0.5 truncate">{website.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                      <div className="hidden md:flex gap-4">
                        {[
                          ["Security", website.securityCheck],
                          ["Function", website.functionalityTest],
                          ["SEO", website.seo],
                        ].map(([label, val]) => (
                          <div key={label} className="text-center">
                            <div className="text-[10px] text-green-100/35 mb-1 uppercase tracking-wider">{label}</div>
                            <StatusBadge status={val} showIcon={false} />
                          </div>
                        ))}
                      </div>
                      <Link
                        to={`/websites/${website.id}`}
                        className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors whitespace-nowrap"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-8 text-center text-xs text-green-100/30">
                No websites with status: {status}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Status;
