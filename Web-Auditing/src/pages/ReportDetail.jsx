import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Printer,
  Download,
  ExternalLink,
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
  const [isDownloading, setIsDownloading] = useState(false);

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

  const handleDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    
    // Set document title for better PDF filename
    const fileName = `${website.name.replace(/[^a-z0-9]/gi, '_')}_Audit_Report_${new Date().toISOString().split('T')[0]}`;
    const originalTitle = document.title;
    document.title = fileName;
    
    // Small delay to ensure title is set
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Trigger browser print dialog (user can save as PDF)
    window.print();
    
    // Restore original title
    setTimeout(() => {
      document.title = originalTitle;
      setIsDownloading(false);
    }, 100);
  };

  return (
    <div className="min-h-screen pt-16 pb-16 print:pt-0 print:pb-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:max-w-none print:px-6 print:py-0">
        
        {/* Action Bar - Hidden in Print */}
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
              disabled={isDownloading}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-glow-yellow ${
                isDownloading 
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                  : 'bg-[#fff800] text-[#0b1011] hover:bg-[#ffe600]'
              }`}
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Report Document - Simple White Background */}
        <div className="bg-white border border-gray-300 shadow-sm print:shadow-none print:border-none">
          
          {/* Simple Document Header */}
          <div className="p-8 print:p-6 border-b border-gray-300 print:border-b-2">
            <div className="flex items-start justify-between gap-6 mb-3">
              <div>
                <h1 className="text-2xl print:text-xl font-bold text-gray-900 mb-1">
                  Website Audit Report
                </h1>
                <p className="text-xs print:text-[11px] text-gray-600">
                  Comprehensive Security, Functionality, Performance, and SEO Evaluation
                </p>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-gray-500 uppercase mb-1">Status</div>
                <StatusBadge status={website.status} size="sm" />
              </div>
            </div>
            
            {/* Report Date */}
            <div className="text-[10px] text-gray-500">
              Report Date: {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          {/* Document Body */}
          <div className="p-8 print:p-6">
            
            {/* Website Information Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h2 className="text-base print:text-sm font-bold text-gray-900 mb-3">Website Information</h2>
              
              <div className="flex items-start gap-4 mb-4">
                <CompanyLogo
                  website={website}
                  className="h-16 w-16 print:h-12 print:w-12 rounded-xl border border-[#e2e8f0] bg-gray-100 p-2 object-contain"
                />
                <div className="flex-1">
                  <h3 className="text-lg print:text-base font-bold text-gray-900 mb-1">{website.name}</h3>
                  <div className="flex items-center gap-2 text-xs print:text-[10px] text-gray-600 mb-2">
                    <span>{website.url}</span>
                    {website.url !== "URL Not Provided" && (
                      <a
                        href={website.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 print:hidden"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-xs print:text-[10px]">
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <span className="ml-2 font-semibold text-gray-900">{website.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Audit Date:</span>
                      <span className="ml-2 font-semibold text-gray-900">
                        {formatDate(website.dateAudited)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Document ID:</span>
                      <span className="ml-2 font-mono text-gray-900">
                        {website.id.toString().padStart(6, "0")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase mb-2 font-semibold">Security Check</div>
                  <StatusBadge status={website.securityCheck} size="sm" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase mb-2 font-semibold">Functionality Test</div>
                  <StatusBadge status={website.functionalityTest} size="sm" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase mb-2 font-semibold">SEO Audit</div>
                  <StatusBadge status={website.seo} size="sm" />
                </div>
              </div>
            </div>

            {/* Section 1: Security */}
            <div className="mb-8 pb-6 border-b border-gray-200 page-break-before">
              <h2 className="text-base print:text-sm font-bold text-gray-900 mb-1">
                1. Security Architecture & Verification
              </h2>
              <p className="text-xs print:text-[10px] text-gray-600 mb-3">
                Evaluation of encrypted transports, security headers, and authentication safeguards.
              </p>

              <table className="w-full text-xs print:text-[10px] border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold text-gray-700 w-8">#</th>
                    <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold text-gray-700">Check Item</th>
                    <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold text-gray-700 w-28">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeSecurityList.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-2 py-1.5 text-gray-600">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-2 py-1.5">
                        <div className="font-semibold text-gray-900 mb-0.5">{item.name}</div>
                        <div className="text-[10px] text-gray-600">{item.description}</div>
                      </td>
                      <td className="border border-gray-300 px-2 py-1.5">
                        <StatusBadge status={item.status} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 2: Functionality */}
            <div className="mb-8 pb-6 border-b border-gray-200 page-break-before">
              <h2 className="text-base print:text-sm font-bold text-gray-900 mb-1">
                2. Functionality & UX Validation
              </h2>
              <p className="text-xs print:text-[10px] text-gray-600 mb-3">
                Testing interactive workflows, cross-device responsiveness, and form submissions.
              </p>

              <table className="w-full text-xs print:text-[10px] border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold text-gray-700 w-8">#</th>
                    <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold text-gray-700">Check Item</th>
                    <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold text-gray-700 w-28">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeFunctionalityList.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-2 py-1.5 text-gray-600">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-2 py-1.5">
                        <div className="font-semibold text-gray-900 mb-0.5">{item.name}</div>
                        <div className="text-[10px] text-gray-600">{item.description}</div>
                      </td>
                      <td className="border border-gray-300 px-2 py-1.5">
                        <StatusBadge status={item.status} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 3: SEO */}
            <div className="mb-8 pb-6 border-b border-gray-200 page-break-before">
              <h2 className="text-base print:text-sm font-bold text-gray-900 mb-1">
                3. SEO & Discoverability Audit
              </h2>
              <p className="text-xs print:text-[10px] text-gray-600 mb-3">
                Inspection of search indexing, canonical tags, structured data, and performance.
              </p>

              <table className="w-full text-xs print:text-[10px] border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold text-gray-700 w-8">#</th>
                    <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold text-gray-700">Check Item</th>
                    <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold text-gray-700 w-28">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeSeoList.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-2 py-1.5 text-gray-600">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-2 py-1.5">
                        <div className="font-semibold text-gray-900 mb-0.5">{item.name}</div>
                        <div className="text-[10px] text-gray-600">{item.description}</div>
                      </td>
                      <td className="border border-gray-300 px-2 py-1.5">
                        <StatusBadge status={item.status} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 4: Findings */}
            <div className="mb-6 pb-6 border-b border-gray-200 page-break-before">
              <h2 className="text-base print:text-sm font-bold text-gray-900 mb-2">4. Findings</h2>
              <div className="bg-gray-50 border border-gray-300 rounded p-3">
                <p className="text-xs print:text-[10px] text-gray-700 leading-relaxed">
                  {website.dateAudited
                    ? "Audit execution completed. Diagnostic telemetry indicates high compliance across baseline criteria with noted optimization vectors outlined below."
                    : "No findings available. This website has not been audited yet."}
                </p>
              </div>
            </div>

            {/* Section 5: Recommendations */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h2 className="text-base print:text-sm font-bold text-gray-900 mb-2">5. Recommendations</h2>
              <div className="bg-gray-50 border border-gray-300 rounded p-3">
                <p className="text-xs print:text-[10px] text-gray-700 leading-relaxed">
                  {website.dateAudited
                    ? "Ensure scheduled quarterly recertification of SSL/TLS certificates, implement strict Content Security Policies (CSP), and automate broken-link detection."
                    : "Recommendations will be available once the website audit is completed."}
                </p>
              </div>
            </div>

            {/* Section 6: Remarks */}
            <div className="mb-4">
              <h2 className="text-base print:text-sm font-bold text-gray-900 mb-2">6. Auditor Remarks</h2>
              <div className="bg-gray-50 border border-gray-300 rounded p-3">
                <p className="text-xs print:text-[10px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {website.remarks}
                </p>
              </div>
            </div>

          </div>

          {/* Simple Footer */}
          <div className="border-t border-gray-300 bg-gray-50 px-8 py-3 print:px-6">
            <div className="flex items-center justify-between text-[10px] text-gray-500">
              <span>Website Audit & Maintenance System</span>
              <span>Page 1 of 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
