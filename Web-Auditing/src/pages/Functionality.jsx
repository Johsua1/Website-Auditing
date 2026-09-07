import { Link } from "react-router-dom";
import { CheckCircle, XCircle, AlertCircle, HelpCircle } from "lucide-react";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { functionalityChecklist } from "../data/mockData";

const Functionality = ({ websites }) => {
  const stats = {
    passed: websites.filter((w) => w.functionalityTest === "Passed").length,
    needsReview: websites.filter((w) => w.functionalityTest === "Needs Review").length,
    failed: websites.filter((w) => w.functionalityTest === "Failed").length,
    notTested: websites.filter((w) => w.functionalityTest === "Not Tested").length,
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-green-50">Functionality Tests</h1>
        <p className="mt-1 text-sm text-green-100/50">Monitor website functionality and user experience across all sites.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard title="Passed" value={stats.passed} color="green" icon={<CheckCircle className="w-7 h-7" />} />
        <StatCard title="Needs Review" value={stats.needsReview} color="yellow" icon={<AlertCircle className="w-7 h-7" />} />
        <StatCard title="Failed" value={stats.failed} color="red" icon={<XCircle className="w-7 h-7" />} />
        <StatCard title="Not Tested" value={stats.notTested} color="gray" icon={<HelpCircle className="w-7 h-7" />} />
      </div>

      <div className="glass-card p-6 mb-6">
        <h2 className="text-sm font-semibold text-green-100/90 tracking-wide mb-4">Functionality Checklist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {functionalityChecklist.map((item) => (
            <div key={item.id} className="rounded-lg border border-emerald-400/10 p-4" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-green-100/80">{item.name}</h3>
                <CheckCircle className="w-4 h-4 text-emerald-400/40" />
              </div>
              <p className="text-xs text-green-100/40 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-emerald-400/10">
          <h2 className="text-sm font-semibold text-green-100/90 tracking-wide">Website Functionality Status</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full dark-table">
            <thead>
              <tr>
                <th className="text-left">Website</th>
                <th className="text-left">Functionality Result</th>
                <th className="text-left">Overall Status</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {websites.map((website) => (
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
                  <td><StatusBadge status={website.functionalityTest} /></td>
                  <td><StatusBadge status={website.status} showIcon={false} /></td>
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

export default Functionality;
