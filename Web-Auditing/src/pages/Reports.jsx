import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Eye, Search, Calendar, ArrowUpRight } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { formatDate } from "../utils/helpers";

const Reports = ({ websites }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWebsites = websites.filter((website) => {
    const term = searchTerm.toLowerCase();
    return (
      website.name.toLowerCase().includes(term) ||
      website.url.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white light:text-gray-900">
                Full Audit Reports
              </h1>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#fff800]/10 light:bg-blue-100 text-[#fff800] light:text-blue-700 border border-[#fff800]/20 light:border-blue-300">
                {websites.length} Dossiers
              </span>
            </div>
            <p className="text-sm sm:text-base text-[#859496] light:text-gray-600">
              Access comprehensive audit dossiers, technical diagnostics, and printable executive summaries.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#859496] light:text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reports by domain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111819] light:bg-white border border-[#202c2e] light:border-gray-300 focus:border-[#fff800] light:focus:border-blue-500 text-sm text-white light:text-gray-900 placeholder-[#859496] light:placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-xl transition-all outline-none"
            />
          </div>
        </div>

        {/* Reports Grid */}
        {filteredWebsites.length === 0 ? (
          <div className="rounded-2xl bg-[#0e1516]/90 light:bg-white border border-[#202c2e] light:border-gray-300 p-12 text-center shadow-xl">
            <FileText className="w-12 h-12 text-[#859496] light:text-gray-400 mx-auto mb-3 opacity-40" />
            <h3 className="text-base font-semibold text-white light:text-gray-900 mb-1">
              No reports match your search
            </h3>
            <p className="text-sm text-[#859496] light:text-gray-600">
              Try adjusting your search terms or filters.
            </p>
            </h3>
            <p className="text-xs text-[#859496]">
              Try searching with another keyword.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredWebsites.map((website) => (
              <div
                key={website.id}
                className="relative rounded-2xl bg-[#0e1516]/90 light:bg-white border border-[#202c2e] light:border-gray-300 hover:border-[#2d3e41] light:hover:border-gray-400 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col group backdrop-blur-md"
              >
                {/* Card Header */}
                <div className="report-card-header bg-gradient-to-b from-[#2a3739] to-[#232f32] light:bg-gradient-to-b light:from-gray-100 light:to-gray-200 p-5 border-b border-[#3d4e52] light:border-gray-300">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <CompanyLogo
                        website={website}
                        className="h-16 w-16 rounded-xl object-contain border border-[#e2e8f0] bg-gray-100 p-1.5 shrink-0 shadow-sm"
                      />
                      <div className="min-w-0">
                        <h3 className="report-card-title font-bold text-white light:text-gray-900 group-hover:text-[#fff800] light:group-hover:text-blue-600 transition-colors truncate text-base">
                          {website.name}
                        </h3>
                        <div className="report-card-date flex items-center gap-1.5 text-xs text-[#94a3b8] light:text-gray-600 mt-0.5">
                          <Calendar className="w-3 h-3 text-[#fff800] light:text-blue-600" />
                          <span>{formatDate(website.dateAudited)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="report-card-icon w-8 h-8 rounded-lg bg-[#2d3e42] light:bg-white border border-[#3d4e52] light:border-gray-300 flex items-center justify-center shrink-0 shadow-sm">
                      <FileText className="w-4 h-4 text-[#fff800] light:text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between py-1 border-b border-[#162123] light:border-gray-200">
                      <span className="text-xs font-semibold text-[#859496] light:text-gray-600">Status:</span>
                      <StatusBadge status={website.status} />
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#162123] light:border-gray-200">
                      <span className="text-xs font-semibold text-[#859496] light:text-gray-600">Security:</span>
                      <StatusBadge status={website.securityCheck} />
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#162123] light:border-gray-200">
                      <span className="text-xs font-semibold text-[#859496] light:text-gray-600">Functionality:</span>
                      <StatusBadge status={website.functionalityTest} />
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-xs font-semibold text-[#859496] light:text-gray-600">SEO:</span>
                      <StatusBadge status={website.seo} />
                    </div>
                  </div>

                  <Link
                    to={`/reports/${website.id}`}
                    className="flex items-center justify-center gap-2 w-full bg-[#162123] hover:bg-[#fff800] light:bg-blue-600 light:hover:bg-blue-700 text-white hover:text-[#0b1011] light:hover:text-white border border-[#253538] light:border-blue-600 hover:border-[#fff800] light:hover:border-blue-700 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md group/btn"
                  >
                    <Eye className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                    View Full Report
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
