import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Printer, Download, ExternalLink, Shield, FileText } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { formatDate } from "../utils/helpers";
import {
  securityChecklist,
  functionalityChecklist,
  seoChecklist,
} from "../data/mockData";

const ReportDetail = ({ websites }) => {
  const { id } = useParams();
  const website = websites.find((w) => w.id === parseInt(id));

  if (!website) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="glass-card p-10 text-center max-w-md w-full">
          <div className="w-12 h-12 rounded-full bg-red-400/10 border border-red-400/20 text-red-400 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold text-green-50 mb-2">
            Report Not Found
          </h2>
          <p className="text-xs text-green-100/50 mb-6">
            The requested audit report does not exist or has been removed.
          </p>
          <Link
            to="/reports"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-medium bg-emerald-400/10 border border-emerald-400/25 text-emerald-400 hover:bg-emerald-400/15 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Reports
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert("Report download functionality is for demonstration purposes only.");
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* ── Action Bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 print:hidden">
          <Link
            to="/reports"
            className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400/70 hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Reports</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-white/5 border border-emerald-400/15 text-green-100/80 hover:bg-white/10 hover:text-green-50 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Report</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-400/15 border border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/25 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* ── Report Card Container ── */}
        <div className="glass-card overflow-hidden shadow-2xl border border-emerald-400/20 print:border-none print:shadow-none print:bg-white">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-emerald-950 via-[#0c1c1c] to-[#081414] border-b border-emerald-400/15 p-6 sm:p-8 print:bg-none print:border-b-2 print:border-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[11px] uppercase font-semibold tracking-widest text-emerald-400 mb-1.5 print:text-gray-600">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Website Audit Report</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-green-50 print:text-black">
                  Audit Assessment Summary
                </h1>
                <p className="text-xs sm:text-sm text-green-100/60 mt-1 print:text-gray-600">
                  Comprehensive Security, Functionality, and SEO Technical Evaluation
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="inline-block text-[10px] uppercase font-semibold tracking-wider px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/25 print:border-gray-400 print:text-gray-800">
                  CONFIDENTIAL AUDIT
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            {/* Website Information Header */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6">
                <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
                  <CompanyLogo
                    website={website}
                    className="h-16 w-16 rounded-xl border border-emerald-400/20 bg-white/5 flex-shrink-0 p-1 print:border-gray-300"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-green-50 mb-1.5 print:text-black truncate">
                      {website.name}
                    </h2>
                    <div className="space-y-1 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 text-green-100/60 print:text-gray-600">
                        <span className="font-medium text-green-100/40 print:text-gray-500">Website:</span>
                        <span className="text-green-50 print:text-black truncate max-w-sm">{website.url}</span>
                        {website.url !== "URL Not Provided" && (
                          <a
                            href={website.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400/70 hover:text-emerald-300 transition-colors inline-flex print:hidden"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <div className="text-green-100/60 print:text-gray-600">
                        <span className="font-medium text-green-100/40 print:text-gray-500">Type:</span>{" "}
                        <span className="text-green-50 print:text-black font-medium">{website.type}</span>
                      </div>
                      <div className="text-green-100/60 print:text-gray-600">
                        <span className="font-medium text-green-100/40 print:text-gray-500">Audit Date:</span>{" "}
                        <span className="text-green-50 print:text-black font-medium">{formatDate(website.dateAudited)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sm:text-right flex-shrink-0">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-green-100/40 print:text-gray-500 mb-1.5">
                    Overall Status
                  </div>
                  <StatusBadge status={website.status} />
                </div>
              </div>

              {/* Status Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="rounded-xl bg-red-400/5 border border-red-400/20 p-4 print:border-gray-300 print:bg-gray-50">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-red-300/80 print:text-red-700 mb-1.5">
                    Security Check
                  </div>
                  <StatusBadge status={website.securityCheck} />
                </div>
                <div className="rounded-xl bg-emerald-400/5 border border-emerald-400/20 p-4 print:border-gray-300 print:bg-gray-50">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-emerald-300/80 print:text-emerald-700 mb-1.5">
                    Functionality Test
                  </div>
                  <StatusBadge status={website.functionalityTest} />
                </div>
                <div className="rounded-xl bg-violet-400/5 border border-violet-400/20 p-4 print:border-gray-300 print:bg-gray-50">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-violet-300/80 print:text-violet-700 mb-1.5">
                    SEO Audit
                  </div>
                  <StatusBadge status={website.seo} />
                </div>
              </div>
            </div>

            {/* ── Section 1: Security Check ── */}
            <div className="pt-6 border-t border-emerald-400/10 print:border-gray-200">
              <h3 className="text-base sm:text-lg font-bold text-green-50 print:text-black mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-red-400/15 border border-red-400/30 text-red-400 flex items-center justify-center text-xs font-bold print:bg-red-100 print:text-red-700">
                  1
                </span>
                Security Evaluation
              </h3>
              <div className="space-y-3">
                {securityChecklist.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl border border-emerald-400/10 print:border-gray-200 print:bg-gray-50"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="w-5 h-5 rounded-md bg-white/5 text-green-100/40 flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5 print:bg-gray-200 print:text-gray-700">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <h4 className="font-medium text-sm text-green-50 print:text-black">
                          {item.name}
                        </h4>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="text-xs text-green-100/50 print:text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Section 2: Functionality Test ── */}
            <div className="pt-6 border-t border-emerald-400/10 print:border-gray-200">
              <h3 className="text-base sm:text-lg font-bold text-green-50 print:text-black mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-400/15 border border-emerald-400/30 text-emerald-400 flex items-center justify-center text-xs font-bold print:bg-green-100 print:text-green-700">
                  2
                </span>
                Functionality Tests
              </h3>
              <div className="space-y-3">
                {functionalityChecklist.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl border border-emerald-400/10 print:border-gray-200 print:bg-gray-50"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="w-5 h-5 rounded-md bg-white/5 text-green-100/40 flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5 print:bg-gray-200 print:text-gray-700">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <h4 className="font-medium text-sm text-green-50 print:text-black">
                          {item.name}
                        </h4>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="text-xs text-green-100/50 print:text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Section 3: SEO Audit ── */}
            <div className="pt-6 border-t border-emerald-400/10 print:border-gray-200">
              <h3 className="text-base sm:text-lg font-bold text-green-50 print:text-black mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-violet-400/15 border border-violet-400/30 text-violet-400 flex items-center justify-center text-xs font-bold print:bg-purple-100 print:text-purple-700">
                  3
                </span>
                SEO & Discoverability
              </h3>
              <div
                className="mb-4 rounded-xl border border-emerald-400/15 p-6 text-center print:border-gray-300 print:bg-gray-50"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="text-xs uppercase tracking-wider text-green-100/40 print:text-gray-500 font-medium mb-1">
                  Overall SEO Status
                </div>
                <div className="text-3xl font-bold text-green-50 print:text-black">
                  {website.seo}
                </div>
              </div>
              <div className="space-y-3">
                {seoChecklist.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl border border-emerald-400/10 print:border-gray-200 print:bg-gray-50"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="w-5 h-5 rounded-md bg-white/5 text-green-100/40 flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5 print:bg-gray-200 print:text-gray-700">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <h4 className="font-medium text-sm text-green-50 print:text-black">
                          {item.name}
                        </h4>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="text-xs text-green-100/50 print:text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Section 4: Findings ── */}
            <div className="pt-6 border-t border-emerald-400/10 print:border-gray-200">
              <h3 className="text-base sm:text-lg font-bold text-green-50 print:text-black mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-yellow-400/15 border border-yellow-400/30 text-yellow-400 flex items-center justify-center text-xs font-bold print:bg-yellow-100 print:text-yellow-700">
                  4
                </span>
                Findings
              </h3>
              <div className="rounded-xl bg-yellow-400/5 border border-yellow-400/20 p-5 print:border-gray-300 print:bg-gray-50">
                <p className="text-sm text-green-100/80 print:text-gray-800 leading-relaxed">
                  {website.dateAudited
                    ? "Detailed audit analysis confirms evaluation for responsive performance, security headers, SSL status, and navigational availability across mobile and desktop environments."
                    : "No findings recorded. This website has not completed a scheduled audit cycle yet."}
                </p>
              </div>
            </div>

            {/* ── Section 5: Recommendations ── */}
            <div className="pt-6 border-t border-emerald-400/10 print:border-gray-200">
              <h3 className="text-base sm:text-lg font-bold text-green-50 print:text-black mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-blue-400/15 border border-blue-400/30 text-blue-400 flex items-center justify-center text-xs font-bold print:bg-blue-100 print:text-blue-700">
                  5
                </span>
                Recommendations
              </h3>
              <div className="rounded-xl bg-blue-400/5 border border-blue-400/20 p-5 print:border-gray-300 print:bg-gray-50">
                <p className="text-sm text-green-100/80 print:text-gray-800 leading-relaxed">
                  {website.dateAudited
                    ? "Implement periodic automated penetration checks, ensure all canonical and meta tags are configured properly for search engines, and maintain optimal page speed scores under 2 seconds."
                    : "Schedule an audit to receive specific prioritized action items."}
                </p>
              </div>
            </div>

            {/* ── Section 6: Remarks ── */}
            <div className="pt-6 border-t border-emerald-400/10 print:border-gray-200">
              <h3 className="text-base sm:text-lg font-bold text-green-50 print:text-black mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-400/15 border border-emerald-400/30 text-emerald-400 flex items-center justify-center text-xs font-bold print:bg-gray-100 print:text-gray-700">
                  6
                </span>
                Audit Remarks
              </h3>
              <div
                className="rounded-xl border border-emerald-400/10 p-5 print:border-gray-300 print:bg-gray-50"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <p className="text-sm text-green-100/80 print:text-gray-800 leading-relaxed">
                  {website.remarks || "No remarks specified."}
                </p>
              </div>
            </div>
          </div>

          {/* Report Footer */}
          <div className="px-6 sm:px-8 py-4 border-t border-emerald-400/10 bg-black/20 print:bg-white print:border-gray-200">
            <p className="text-xs text-green-100/40 print:text-gray-500 text-center">
              Report generated on{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              • Official Website Auditing System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
