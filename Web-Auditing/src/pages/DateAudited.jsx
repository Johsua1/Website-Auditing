import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { formatDate } from "../utils/helpers";

const DateAudited = ({ websites }) => {
  const [selectedDate, setSelectedDate] = useState("");

  const filteredWebsites = selectedDate
    ? websites.filter((w) => {
        if (!w.dateAudited) return false;
        const auditDate = new Date(w.dateAudited).toISOString().split("T")[0];
        return auditDate === selectedDate;
      })
    : websites;

  const auditedCount = websites.filter((w) => w.dateAudited).length;
  const notAuditedCount = websites.filter((w) => !w.dateAudited).length;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Audit Date Overview
          </h1>
          <p className="text-gray-600">
            View websites by their last audit date
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Audited</p>
                <p className="text-3xl font-bold text-gray-900">
                  {auditedCount}
                </p>
              </div>
              <Calendar className="w-10 h-10 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Not Audited</p>
                <p className="text-3xl font-bold text-gray-900">
                  {notAuditedCount}
                </p>
              </div>
              <Calendar className="w-10 h-10 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Date Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Audit Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {selectedDate && (
              <button
                onClick={() => setSelectedDate("")}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors sm:mt-6"
              >
                Clear Filter
              </button>
            )}
          </div>
          {selectedDate && (
            <p className="mt-4 text-sm text-gray-600">
              Showing {filteredWebsites.filter((w) => w.dateAudited).length}{" "}
              websites audited on{" "}
              {new Date(selectedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </div>

        {/* Websites Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Websites Audit Dates
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Audit Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredWebsites.map((website) => (
                  <tr
                    key={website.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <CompanyLogo
                          website={website}
                          className="h-12 w-12 rounded-lg object-cover border border-gray-200 bg-white shadow-sm"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {website.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {website.url}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span
                          className={`text-sm ${website.dateAudited ? "text-gray-900 font-medium" : "text-gray-500"}`}
                        >
                          {formatDate(website.dateAudited)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={website.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        to={`/websites/${website.id}`}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateAudited;
