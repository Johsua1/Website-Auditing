import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Printer, Download, ExternalLink } from "lucide-react";
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
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Report Not Found
            </h2>
            <Link to="/reports" className="text-blue-600 hover:text-blue-800">
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
    alert("Report download functionality is for demonstration purposes only.");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link
            to="/reports"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Reports
          </Link>

          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print Report
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
            <h1 className="text-3xl font-bold mb-2">WEBSITE AUDIT REPORT</h1>
            <p className="text-blue-100">
              Comprehensive Security, Functionality, and SEO Analysis
            </p>
          </div>

          <div className="p-8">
            {/* Website Information */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-3">
                    <CompanyLogo
                      website={website}
                      className="h-14 w-14 flex-shrink-0 rounded-lg border border-gray-200 bg-white p-1 shadow-sm"
                    />
                    <h2 className="text-2xl font-bold text-gray-900">
                      {website.name}
                    </h2>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">
                        Website:
                      </span>
                      <span className="text-sm text-gray-900">
                        {website.url}
                      </span>
                      {website.url !== "URL Not Provided" && (
                        <a
                          href={website.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Type:
                      </span>
                      <span className="text-sm text-gray-900 ml-2">
                        {website.type}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Audit Date:
                      </span>
                      <span className="text-sm text-gray-900 ml-2">
                        {formatDate(website.dateAudited)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    Overall Status
                  </div>
                  <StatusBadge status={website.status} />
                </div>
              </div>

              {/* Status Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border-2 border-red-200 bg-red-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-red-700 mb-2">
                    Security Check
                  </div>
                  <StatusBadge status={website.securityCheck} />
                </div>
                <div className="border-2 border-green-200 bg-green-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-green-700 mb-2">
                    Functionality Test
                  </div>
                  <StatusBadge status={website.functionalityTest} />
                </div>
                <div className="border-2 border-purple-200 bg-purple-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-purple-700 mb-2">
                    SEO Audit
                  </div>
                  <StatusBadge status={website.seo} />
                </div>
              </div>
            </div>

            {/* Security Check Section */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                Security Check
              </h3>
              <div className="space-y-3">
                {securityChecklist.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">
                          {item.name}
                        </h4>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Functionality Test Section */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                Functionality Test
              </h3>
              <div className="space-y-3">
                {functionalityChecklist.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">
                          {item.name}
                        </h4>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Audit Section */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                SEO Audit
              </h3>
              <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 text-center">
                <div className="text-sm text-gray-600 mb-2">SEO Score</div>
                <div className="text-4xl font-bold text-gray-900">
                  Not Tested
                </div>
              </div>
              <div className="space-y-3">
                {seoChecklist.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">
                          {item.name}
                        </h4>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Findings Section */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </span>
                Findings
              </h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700">
                  {website.dateAudited
                    ? "Detailed findings will be displayed here once the comprehensive audit is completed."
                    : "No findings available. This website has not been audited yet."}
                </p>
              </div>
            </div>

            {/* Recommendations Section */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">
                  5
                </span>
                Recommendations
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700">
                  {website.dateAudited
                    ? "Recommendations and action items will be provided here based on the audit results."
                    : "Recommendations will be available once the website audit is completed."}
                </p>
              </div>
            </div>

            {/* Remarks Section */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold">
                  6
                </span>
                Remarks
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  {website.remarks}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Report generated on{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
