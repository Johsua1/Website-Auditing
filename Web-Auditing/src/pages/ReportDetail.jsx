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

  const activeSecurityList =
    website?.securityChecklist && website.securityChecklist.length > 0
      ? website.securityChecklist
      : securityChecklist;

  const activeFunctionalityList =
    website?.functionalityChecklist && website.functionalityChecklist.length > 0
      ? website.functionalityChecklist
      : functionalityChecklist;

  const activeSeoList =
    website?.seoChecklist && website.seoChecklist.length > 0
      ? website.seoChecklist
      : seoChecklist;

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
    <div className="min-h-screen pt-16 pb-16 print:pt-0 print:pb-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:max-w-full print:px-8 print:py-0">
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
        <div className="rounded-2xl bg-white border border-gray-200 shadow-lg overflow-hidden print:shadow-none print:rounded-none">
          {/* Header Banner */}
          <div className="report-header-banner bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8 sm:p-10 border-b-4 border-blue-600 print:border-b-2">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-wider uppercase text-blue-300 mb-1">
                      Executive Audit Report
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                      Website Audit & Maintenance
                    </h1>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                    Overall Status
                  </div>
                  <div className="inline-block px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                    <StatusBadge status={website.status} />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <p className="text-sm text-gray-200">
                  Comprehensive Security, Functionality, Performance, and SEO Evaluation
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10 bg-white">
            {/* Website Information Card */}
            <div className="mb-10 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 shadow-sm">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-5">
                  <CompanyLogo
                    website={website}
                    className="h-20 w-20 rounded-xl object-contain border-2 border-gray-300 bg-white p-2 shrink-0 shadow-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {website.name}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="truncate font-medium">{website.url}</span>
                      {website.url !== "URL Not Provided" && (
                        <a
                          href={website.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 inline-flex items-center print:hidden"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white px-4 py-3 rounded-lg border border-gray-300 shadow-sm">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                      Website Type
                    </span>
                    <span className="text-base font-bold text-gray-900">
                      {website.type}
                    </span>
                  </div>
                  <div className="bg-white px-4 py-3 rounded-lg border border-gray-300 shadow-sm">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                      Audit Date
                    </span>
                    <span className="text-base font-bold text-gray-900">
                      {formatDate(website.dateAudited)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t-2 border-gray-200">
                <div className="rounded-lg bg-white border-2 border-gray-300 p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-red-600" />
                    <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Security Check
                    </div>
                  </div>
                  <StatusBadge status={website.securityCheck} />
                </div>
                <div className="rounded-lg bg-white border-2 border-gray-300 p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-5 h-5 text-green-600" />
                    <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Functionality Test
                    </div>
                  </div>
                  <StatusBadge status={website.functionalityTest} />
                </div>
                <div className="rounded-lg bg-white border-2 border-gray-300 p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-yellow-600" />
                    <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      SEO Audit
                    </div>
                  </div>
                  <StatusBadge status={website.seo} />
                </div>
              </div>
            </div>

            {/* Section 1: Security Check */}
            <div className="mb-10 pb-8 border-b-2 border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center text-lg font-extrabold shadow-md">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Security Architecture & Verification
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Evaluation of encrypted transports, security headers, and authentication safeguards.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {activeSecurityList.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <span className="w-7 h-7 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-bold flex items-center justify-center shrink-0 mt-1 shadow-sm">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 mb-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <StatusBadge status={item.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Functionality Test */}
            <div className="mb-10 pb-8 border-b-2 border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center text-lg font-extrabold shadow-md">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Functionality & UX Validation
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Testing interactive workflows, cross-device responsiveness, and form submissions.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {activeFunctionalityList.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <span className="w-7 h-7 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-bold flex items-center justify-center shrink-0 mt-1 shadow-sm">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 mb-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <StatusBadge status={item.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: SEO Audit */}
            <div className="mb-10 pb-8 border-b-2 border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-lg font-extrabold shadow-md">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    SEO & Discoverability Audit
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Inspection of search indexing, canonical tags, structured data, and performance.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {activeSeoList.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <span className="w-7 h-7 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-bold flex items-center justify-center shrink-0 mt-1 shadow-sm">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 mb-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <StatusBadge status={item.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Findings */}
            <div className="mb-10 pb-8 border-b-2 border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center text-lg font-extrabold shadow-md">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Diagnostic Findings
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Key observations and technical assessment results
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 border-2 border-gray-200 p-5 shadow-sm">
                <p className="text-sm text-gray-800 leading-relaxed">
                  {website.dateAudited
                    ? "Audit execution completed. Diagnostic telemetry indicates high compliance across baseline criteria with noted optimization vectors outlined below."
                    : "No findings available. This website has not been audited yet."}
                </p>
              </div>
            </div>

            {/* Section 5: Recommendations */}
            <div className="mb-10 pb-8 border-b-2 border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 text-white flex items-center justify-center text-lg font-extrabold shadow-md">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Actionable Recommendations
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Suggested improvements and next steps
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 border-2 border-gray-200 p-5 shadow-sm">
                <p className="text-sm text-gray-800 leading-relaxed">
                  {website.dateAudited
                    ? "Ensure scheduled quarterly recertification of SSL/TLS certificates, implement strict Content Security Policies (CSP), and automate broken-link detection."
                    : "Recommendations will be available once the website audit is completed."}
                </p>
              </div>
            </div>

            {/* Section 6: Remarks */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center text-lg font-extrabold shadow-md">
                  6
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Lead Auditor Remarks
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Additional notes and observations
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 border-2 border-gray-200 p-5 shadow-sm">
                <p className="text-sm text-gray-800 leading-relaxed">
                  {website.remarks}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-8 py-6 border-t-2 border-gray-300">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700 font-medium">
                  Report generated on{" "}
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-mono">
                  Document ID: #{website.id.toString().padStart(6, "0")}
                </span>
                <span className="px-2 py-1 rounded-md bg-green-100 border border-green-300 text-xs font-bold text-green-700">
                  VERIFIED
                </span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-300 text-center">
              <p className="text-xs text-gray-600">
                Website Audit & Maintenance System • Professional Report
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
