import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { formatDate } from "../utils/helpers";

const Remarks = ({ websites }) => {
  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-green-50">Audit Remarks</h1>
        <p className="mt-1 text-sm text-green-100/50">
          View all audit remarks, findings, and recommendations for each website.
        </p>
      </div>

      <div className="space-y-5">
        {websites.map((website) => (
          <div key={website.id} className="glass-card glass-card-hover overflow-hidden">
            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-emerald-400/10">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <CompanyLogo
                    website={website}
                    className="h-12 w-12 rounded-xl border border-emerald-400/15 bg-white/5 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-green-50 truncate">{website.name}</h3>
                    <p className="text-xs text-green-100/40 mt-0.5 truncate">{website.url}</p>
                    <p className="text-xs text-green-100/30 mt-1">
                      Audited: <span className="text-green-100/50">{formatDate(website.dateAudited)}</span>
                    </p>
                  </div>
                </div>
                <Link
                  to={`/websites/${website.id}`}
                  className="flex-shrink-0 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors whitespace-nowrap"
                >
                  View Details →
                </Link>
              </div>

              {/* Status grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {[
                  ["Overall Status", website.status],
                  ["Security", website.securityCheck],
                  ["Functionality", website.functionalityTest],
                  ["SEO", website.seo],
                ].map(([label, val]) => (
                  <div key={label} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(74,222,128,0.08)" }}>
                    <div className="text-[10px] uppercase tracking-wider text-green-100/35 mb-1.5">{label}</div>
                    <StatusBadge status={val} showIcon={false} />
                  </div>
                ))}
              </div>

              {/* Remarks block */}
              <div className="rounded-lg border border-emerald-400/15 p-4" style={{ background: "rgba(74,222,128,0.04)" }}>
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-emerald-400/60 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-400/80 mb-1.5 uppercase tracking-wider">Remarks</h4>
                    <p className="text-sm text-green-100/70 leading-relaxed">
                      {website.remarks || "No remarks recorded for this website."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Remarks;
