import { Link } from "react-router-dom";
import { Shield, Lock, AlertTriangle, CheckCircle } from "lucide-react";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { securityChecklist } from "../data/mockData";

const Security = ({ websites }) => {
  const securityStats = {
    passed: websites.filter((w) => w.securityCheck === "Passed").length,
    warning: websites.filter((w) => w.securityCheck === "Warning").length,
    failed: websites.filter((w) => w.securityCheck === "Failed").length,
    notTested: websites.filter((w) => w.securityCheck === "Not Tested").length,
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-green-50">
          Security Audit
        </h1>
        <p className="mt-1 text-sm text-green-100/50">
          Monitor security compliance and vulnerabilities across all websites.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard title="Passed" value={securityStats.passed} color="green" icon={<CheckCircle className="w-7 h-7" />} />
        <StatCard title="Warning" value={securityStats.warning} color="yellow" icon={<AlertTriangle className="w-7 h-7" />} />
        <StatCard title="Failed" value={securityStats.failed} color="red" icon={<Shield className="w-7 h-7" />} />
        <StatCard title="Not Tested" value={securityStats.notTested} color="gray" icon={<Lock className="w-7 h-7" />} />
      </div>

      {/* Security Checklist */}
      <div className="glass-card p-6 mb-6">
        <h2 className="text-sm font-semibold text-green-100/90 tracking-wide mb-4">
          Security Checklist Items
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {securityChecklist.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-emerald-400/10 bg-white/3 p-4"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-green-100/80">{item.name}</h3>
                <Shield className="w-4 h-4 text-emerald-400/40" />
              </div>
              <p className="text-xs text-green-100/40 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Website Security Table */}
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-emerald-400/10">
          <h2 className="text-sm font-semibold text-green-100/90 tracking-wide">
            Website Security Status
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full dark-table">
            <thead>
              <tr>
                <th className="text-left">Website</th>
                <th className="text-left">Security Result</th>
                <th className="text-left">Overall Status</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {websites.map((website) => (
                <tr key={website.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <CompanyLogo
                        website={website}
                        className="h-10 w-10 rounded-lg object-cover border border-emerald-400/15 bg-white/5 flex-shrink-0"
                      />
                      <div>
                        <div className="font-medium text-green-50">{website.name}</div>
                        <div className="text-xs text-green-100/40 mt-0.5">{website.url}</div>
                      </div>
                    </div>
                  </td>
                  <td><StatusBadge status={website.securityCheck} /></td>
                  <td><StatusBadge status={website.status} showIcon={false} /></td>
                  <td>
                    <Link
                      to={`/websites/${website.id}`}
                      className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
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

export default Security;
