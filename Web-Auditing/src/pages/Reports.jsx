import { Link } from "react-router-dom";
import { FileText, Eye } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { formatDate } from "../utils/helpers";

const Reports = ({ websites }) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Full Audit Reports
          </h1>
          <p className="text-gray-600">
            Access comprehensive audit reports for all websites
          </p>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites.map((website) => (
            <div
              key={website.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                <div className="flex items-center gap-3">
                  <CompanyLogo
                    website={website}
                    className="h-14 w-14 flex-shrink-0 rounded-lg border border-white/40 bg-white p-1 shadow-sm"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1 line-clamp-2">
                      {website.name}
                    </h3>
                    <p className="text-xs text-blue-100">
                      {formatDate(website.dateAudited)}
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-white/70" />
                </div>
              </div>

              <div className="p-5">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <StatusBadge status={website.status} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Security:</span>
                    <StatusBadge status={website.securityCheck} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Functionality:
                    </span>
                    <StatusBadge status={website.functionalityTest} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">SEO:</span>
                    <StatusBadge status={website.seo} />
                  </div>
                </div>

                <Link
                  to={`/reports/${website.id}`}
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Eye className="w-4 h-4" />
                  View Full Report
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
