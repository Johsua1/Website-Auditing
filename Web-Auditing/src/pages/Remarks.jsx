import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { formatDate } from "../utils/helpers";

const Remarks = ({ websites }) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Audit Remarks & Findings
          </h1>
          <p className="text-gray-600">
            View all audit remarks, findings, and recommendations for each
            website
          </p>
        </div>

        {/* Remarks List */}
        <div className="space-y-6">
          {websites.map((website) => (
            <div
              key={website.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                {/* Website Header */}
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-start flex-1 gap-4">
                    <CompanyLogo
                      website={website}
                      className="h-16 w-16 rounded-lg object-cover border border-gray-200 bg-white shadow-sm flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {website.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {website.url}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <div className="text-xs text-gray-500">
                          Audit Date:{" "}
                          <span className="font-medium">
                            {formatDate(website.dateAudited)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/websites/${website.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm whitespace-nowrap ml-4"
                  >
                    View Details
                  </Link>
                </div>

                {/* Status Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">
                      Overall Status
                    </div>
                    <StatusBadge status={website.status} />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Security</div>
                    <StatusBadge status={website.securityCheck} />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">
                      Functionality
                    </div>
                    <StatusBadge status={website.functionalityTest} />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">SEO</div>
                    <StatusBadge status={website.seo} />
                  </div>
                </div>

                {/* Remarks */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900 mb-2">
                        Remarks
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {website.remarks}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Remarks;
