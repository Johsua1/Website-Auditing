import { Link } from "react-router-dom";
import { CheckCircle, AlertCircle, XCircle, Clock, Loader } from "lucide-react";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { getStatistics } from "../utils/helpers";

const Status = ({ websites }) => {
  const stats = getStatistics(websites);

  const statusGroups = {
    Passed: websites.filter((w) => w.status === "Passed"),
    "Needs Review": websites.filter((w) => w.status === "Needs Review"),
    Failed: websites.filter((w) => w.status === "Failed"),
    Pending: websites.filter((w) => w.status === "Pending"),
    "In Progress": websites.filter((w) => w.status === "In Progress"),
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Website Status Overview
          </h1>
          <p className="text-gray-600">
            View all websites organized by their current audit status
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard
            title="Passed"
            value={stats.passed}
            color="green"
            icon={<CheckCircle className="w-8 h-8" />}
          />
          <StatCard
            title="Needs Review"
            value={stats.needsReview}
            color="yellow"
            icon={<AlertCircle className="w-8 h-8" />}
          />
          <StatCard
            title="Failed"
            value={stats.failed}
            color="red"
            icon={<XCircle className="w-8 h-8" />}
          />
          <StatCard
            title="Pending"
            value={stats.pending}
            color="gray"
            icon={<Clock className="w-8 h-8" />}
          />
          <StatCard
            title="In Progress"
            value={websites.filter((w) => w.status === "In Progress").length}
            color="blue"
            icon={<Loader className="w-8 h-8" />}
          />
        </div>

        {/* Status Groups */}
        <div className="space-y-6">
          {Object.entries(statusGroups).map(([status, websiteList]) => (
            <div
              key={status}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {status}
                  </h2>
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {websiteList.length}
                  </span>
                </div>
              </div>

              {websiteList.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {websiteList.map((website) => (
                    <div
                      key={website.id}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1 gap-4">
                          <CompanyLogo
                            website={website}
                            className="h-12 w-12 rounded-lg object-cover border border-gray-200 bg-white shadow-sm"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {website.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {website.url}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 ml-4">
                          <div className="hidden md:flex gap-3">
                            <div className="text-center">
                              <div className="text-xs text-gray-500 mb-1">
                                Security
                              </div>
                              <StatusBadge
                                status={website.securityCheck}
                                showIcon={false}
                              />
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-gray-500 mb-1">
                                Function
                              </div>
                              <StatusBadge
                                status={website.functionalityTest}
                                showIcon={false}
                              />
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-gray-500 mb-1">
                                SEO
                              </div>
                              <StatusBadge
                                status={website.seo}
                                showIcon={false}
                              />
                            </div>
                          </div>
                          <Link
                            to={`/websites/${website.id}`}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm whitespace-nowrap"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-8 text-center text-gray-500">
                  No websites with status: {status}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Status;
