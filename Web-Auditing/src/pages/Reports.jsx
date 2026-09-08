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
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Full Audit Reports
              </h1>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#fff800]/10 text-[#fff800] border border-[#fff800]/20">
                {websites.length} Dossiers
              </span>
            </div>
            <p className="text-sm sm:text-base text-[#859496]">
              Access comprehensive audit dossiers, technical diagnostics, and printable executive summaries.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#859496] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reports by domain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111819] border border-[#202c2e] focus:border-[#fff800] text-sm text-white placeholder-[#859496] pl-10 pr-4 py-2.5 rounded-xl transition-all outline-none"
            />
          </div>
        </div>

        {/* Reports Grid */}
        {filteredWebsites.length === 0 ? (
          <div className="rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] p-12 text-center shadow-xl">
            <FileText className="w-12 h-12 text-[#859496] mx-auto mb-3 opacity-40" />
            <h3 className="text-base font-semibold text-white mb-1">
              No reports match your search
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
                className="relative rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] hover:border-[#2d3e41] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col group backdrop-blur-md"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-b from-[#152022] to-[#101718] p-5 border-b border-[#1c282a]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <CompanyLogo
                        website={website}
                        className="h-12 w-12 rounded-xl object-contain border border-white/10 bg-white p-1 shrink-0 shadow-sm"
                      />
                      <div className="min-w-0">
                        <h3 className="font-bold text-white group-hover:text-[#fff800] transition-colors truncate text-base">
                          {website.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-[#859496] mt-0.5">
                          <Calendar className="w-3 h-3 text-[#fff800]" />
                          <span>{formatDate(website.dateAudited)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[#192527] border border-[#27373a] flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-[#fff800]" />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between py-1 border-b border-[#162123]">
                      <span className="text-xs font-semibold text-[#859496]">Status:</span>
                      <StatusBadge status={website.status} />
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#162123]">
                      <span className="text-xs font-semibold text-[#859496]">Security:</span>
                      <StatusBadge status={website.securityCheck} />
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#162123]">
                      <span className="text-xs font-semibold text-[#859496]">Functionality:</span>
                      <StatusBadge status={website.functionalityTest} />
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-xs font-semibold text-[#859496]">SEO:</span>
                      <StatusBadge status={website.seo} />
                    </div>
                  </div>

                  <Link
                    to={`/reports/${website.id}`}
                    className="flex items-center justify-center gap-2 w-full bg-[#162123] hover:bg-[#fff800] text-white hover:text-[#0b1011] border border-[#253538] hover:border-[#fff800] py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md group/btn"
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
