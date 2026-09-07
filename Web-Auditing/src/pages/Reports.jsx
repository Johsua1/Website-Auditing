import { Link } from "react-router-dom";
import { FileText, Eye, Calendar } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { formatDate } from "../utils/helpers";

const Reports = ({ websites }) => {
  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-green-50">Full Audit Reports</h1>
        <p className="mt-1 text-sm text-green-100/50">Access comprehensive audit reports for all websites.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {websites.map((website) => (
          <div key={website.id} className="glass-card glass-card-hover flex flex-col overflow-hidden">
            {/* Card header */}
            <div className="p-5 border-b border-emerald-400/10">
              <div className="flex items-center gap-3">
                <CompanyLogo
                  website={website}
                  className="h-12 w-12 rounded-xl border border-emerald-400/15 bg-white/5 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-green-50 line-clamp-1">{website.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-green-100/40">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(website.dateAudited)}</span>
                  </div>
                </div>
                <FileText className="w-5 h-5 text-emerald-400/30 flex-shrink-0" />
              </div>
            </div>

            {/* Status rows */}
            <div className="p-5 flex-1 space-y-2.5">
              {[
                ["Status", website.status],
                ["Security", website.securityCheck],
                ["Functionality", website.functionalityTest],
                ["SEO", website.seo],
              ].map(([label, val]) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-green-100/40">{label}</span>
                  <StatusBadge status={val} showIcon={false} />
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="px-5 pb-5">
              <Link
                to={`/reports/${website.id}`}
                className="flex items-center justify-center gap-2 w-full rounded-lg py-2.5 text-xs font-medium
                  bg-emerald-400/10 border border-emerald-400/25 text-emerald-400
                  hover:bg-emerald-400/15 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                View Full Report
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
