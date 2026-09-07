import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Printer,
  Download,
  ExternalLink,
  Shield,
  Activity,
  Sparkles,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
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
  const [downloadToast, setDownloadToast] = useState(false);

  if (!website) {
    return (
      <div className="min-h-screen pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] p-12 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-2">
              Report Not Found
            </h2>
            <p className="text-sm text-[#859496] mb-6">
              The requested audit dossier does not exist or has been relocated.
            </p>
            <Link
              to="/reports"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fff800] text-[#0b1011] font-bold text-xs uppercase tracking-wider hover:bg-[#ffe600] transition-colors shadow-glow-yellow"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Reports
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 3500);
  };

  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toast Notification */}
        {downloadToast && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#121c1e] text-white px-4 py-3 rounded-xl border border-[#2c3d40] shadow-2xl animate-fade-in print:hidden">
            <FileCheck className="w-5 h-5 text-[#fff800]" />
            <div className="text-xs">
              <span className="font-semibold block text-white">
                Preparing PDF Package
              </span>
              <span className="text-[#859496]">
                Compiling technical audit report for {website.name}...
              </span>
            </div>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 print:hidden">
          <Link
            to="/reports"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#859496] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Reports
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#121b1d] text-white text-xs font-semibold rounded-xl border border-[#223033] hover:border-[#34484c] hover:bg-[#182326] transition-all"
            >
              <Printer className="w-4 h-4 text-[#859496]" />
              Print Report
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#fff800] text-[#0b1011] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#ffe600] transition-all shadow-glow-yellow"
            >
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="rounded-2xl bg-[#0e1516]/95 border border-[#202c2e] shadow-2xl overflow-hidden backdrop-blur-md print:bg-white print:border-gray-300 print:shadow-none">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#141f21] via-[#162326] to-[#0f1719] text-white p-6 sm:p-8 border-b border-[#223134] print:bg-gray-100 print:text-black">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#fff800]/10 text-[#fff800] border border-[#fff800]/20 text-[11px] font-bold tracking-wider uppercase mb-3">
                  <Shield className="w-3.5 h-3.5" />
                  Executive Audit Dossier
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white print:text-black">
                  WEBSITE AUDIT REPORT
                </h1>
                <p className="text-xs sm:text-sm text-[#859496] mt-1 print:text-gray-600">
                  Comprehensive Security, Functionality, Performance, and SEO Evaluation
                </p>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-[11px] uppercase tracking-wider text-[#859496] font-semibold mb-1 print:text-gray-500">
                  Overall Verdict
                </div>
                <StatusBadge status={website.status} />
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Website Information Card */}
            <div className="mb-8 p-5 rounded-xl bg-[#11191b] border border-[#1d2a2d] print:bg-gray-50 print:border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-4 min-w-0">
                  <CompanyLogo
                    website={website}
                    className="h-14 w-14 rounded-xl object-contain border border-white/10 bg-white p-1 shrink-0 shadow-sm"
                  />
                  <div className="min-w-0">
                    <h2 className="text-xl font-bold text-white print:text-black truncate">
                      {website.name}
                    </h2>
                    <div className="flex items-center gap-2 text-xs text-[#859496] mt-0.5">
                      <span className="truncate">{website.url}</span>
                      {website.url !== "URL Not Provided" && (
                        <a
                          href={website.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#fff800] hover:text-[#ffe600] inline-flex items-center print:hidden"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-xs">
                  <div className="bg-[#152022] px-3 py-1.5 rounded-lg border border-[#213033] print:bg-white print:border-gray-300">
                    <span className="text-[#859496] mr-1.5">Type:</span>
                    <span className="font-semibold text-white print:text-black">
                      {website.type}
                    </span>
                  </div>
                  <div className="bg-[#152022] px-3 py-1.5 rounded-lg border border-[#213033] print:bg-white print:border-gray-300">
                    <span className="text-[#859496] mr-1.5">Audit Date:</span>
                    <span className="font-semibold text-white print:text-black">
                      {formatDate(website.dateAudited)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-[#141b1d] border border-[#202d30] p-3.5 print:bg-white print:border-gray-300">
                  <div className="text-[11px] font-semibold text-[#859496] uppercase tracking-wider mb-2">
                    Security Check
                  </div>
                  <StatusBadge status={website.securityCheck} />
                </div>
                <div className="rounded-xl bg-[#141b1d] border border-[#202d30] p-3.5 print:bg-white print:border-gray-300">
                  <div className="text-[11px] font-semibold text-[#859496] uppercase tracking-wider mb-2">
                    Functionality Test
                  </div>
                  <StatusBadge status={website.functionalityTest} />
                </div>
                <div className="rounded-xl bg-[#141b1d] border border-[#202d30] p-3.5 print:bg-white print:border-gray-300">
                  <div className="text-[11px] font-semibold text-[#859496] uppercase tracking-wider mb-2">
                    SEO Audit
                  </div>
                  <StatusBadge status={website.seo} />
                </div>
              </div>
            </div>

            {/* Section 1: Security Check */}
            <div className="mb-8 pb-8 border-b border-[#1b2628]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-sm font-extrabold">
                  1
                </div>
                <div>
                  <h3 className="text-base font-bold text-white print:text-black">
                    Security Architecture &amp; Verification
                  </h3>
                  <p className="text-xs text-[#859496]">
                    Evaluation of encrypted transports, security headers, and authentication safeguards.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {securityChecklist.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-[#11191b] border border-[#1b2729] print:bg-gray-50 print:border-gray-200"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded bg-[#162124] text-[#859496] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-white print:text-black">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#859496] mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Functionality Test */}
            <div className="mb-8 pb-8 border-b border-[#1b2628]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-extrabold">
                  2
                </div>
                <div>
                  <h3 className="text-base font-bold text-white print:text-black">
                    Functionality &amp; UX Validation
                  </h3>
                  <p className="text-xs text-[#859496]">
                    Testing interactive workflows, cross-device responsiveness, and form submissions.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {functionalityChecklist.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-[#11191b] border border-[#1b2729] print:bg-gray-50 print:border-gray-200"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded bg-[#162124] text-[#859496] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-white print:text-black">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#859496] mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: SEO Audit */}
            <div className="mb-8 pb-8 border-b border-[#1b2628]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#fff800]/10 border border-[#fff800]/20 text-[#fff800] flex items-center justify-center text-sm font-extrabold">
                  3
                </div>
                <div>
                  <h3 className="text-base font-bold text-white print:text-black">
                    SEO &amp; Discoverability Audit
                  </h3>
                  <p className="text-xs text-[#859496]">
                    Inspection of search indexing, canonical tags, structured data, and performance.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {seoChecklist.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-[#11191b] border border-[#1b2729] print:bg-gray-50 print:border-gray-200"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded bg-[#162124] text-[#859496] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-white print:text-black">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#859496] mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Findings */}
            <div className="mb-8 pb-8 border-b border-[#1b2628]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-extrabold">
                  4
                </div>
                <div>
                  <h3 className="text-base font-bold text-white print:text-black">
                    Diagnostic Findings
                  </h3>
                </div>
              </div>

              <div className="rounded-xl bg-[#121a1b] border border-[#223134] p-4 text-xs sm:text-sm text-[#ccd9da] print:bg-gray-50 print:text-black">
                {website.dateAudited
                  ? "Audit execution completed. Diagnostic telemetry indicates high compliance across baseline criteria with noted optimization vectors outlined below."
                  : "No findings available. This website has not been audited yet."}
              </div>
            </div>

            {/* Section 5: Recommendations */}
            <div className="mb-8 pb-8 border-b border-[#1b2628]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center text-sm font-extrabold">
                  5
                </div>
                <div>
                  <h3 className="text-base font-bold text-white print:text-black">
                    Actionable Recommendations
                  </h3>
                </div>
              </div>

              <div className="rounded-xl bg-[#121a1b] border border-[#223134] p-4 text-xs sm:text-sm text-[#ccd9da] print:bg-gray-50 print:text-black">
                {website.dateAudited
                  ? "Ensure scheduled quarterly recertification of SSL/TLS certificates, implement strict Content Security Policies (CSP), and automate broken-link detection."
                  : "Recommendations will be available once the website audit is completed."}
              </div>
            </div>

            {/* Section 6: Remarks */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gray-500/10 border border-gray-500/20 text-gray-300 flex items-center justify-center text-sm font-extrabold">
                  6
                </div>
                <div>
                  <h3 className="text-base font-bold text-white print:text-black">
                    Lead Auditor Remarks
                  </h3>
                </div>
              </div>

              <div className="rounded-xl bg-[#121a1b] border border-[#223134] p-4.5 text-xs sm:text-sm text-[#ccd9da] print:bg-gray-50 print:text-black leading-relaxed">
                {website.remarks}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[#101719] px-6 sm:px-8 py-5 border-t border-[#1b2628] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#859496] print:bg-white print:border-gray-300 print:text-gray-500">
            <span>
              Report generated on{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="font-mono text-[11px] text-[#6b7d80]">
              HASH: #{website.id.toString().padStart(6, "0")} • VERIFIED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
