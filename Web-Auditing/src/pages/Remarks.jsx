import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Search,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
  Calendar,
} from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { formatDate } from "../utils/helpers";

const Remarks = ({ websites }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const filteredWebsites = websites.filter((website) => {
    const term = searchTerm.toLowerCase();
    return (
      website.name.toLowerCase().includes(term) ||
      website.url.toLowerCase().includes(term) ||
      (website.remarks && website.remarks.toLowerCase().includes(term))
    );
  });

  const handleCopyRemarks = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Audit Remarks &amp; Findings
              </h1>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#fff800]/10 text-[#fff800] border border-[#fff800]/20">
                {websites.length} Audits
              </span>
            </div>
            <p className="text-sm sm:text-base text-[#859496]">
              Detailed inspector remarks, auditor notes, and recommended remediations for each domain.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#859496] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search remarks or domain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111819] border border-[#202c2e] focus:border-[#fff800] text-sm text-white placeholder-[#859496] pl-10 pr-4 py-2.5 rounded-xl transition-all outline-none"
            />
          </div>
        </div>

        {/* Remarks List */}
        {filteredWebsites.length === 0 ? (
          <div className="rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] p-12 text-center shadow-xl">
            <MessageSquare className="w-12 h-12 text-[#859496] mx-auto mb-3 opacity-40" />
            <h3 className="text-base font-semibold text-white mb-1">
              No matching remarks found
            </h3>
            <p className="text-xs text-[#859496]">
              Try adjusting your search criteria.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredWebsites.map((website) => {
              const isCopied = copiedId === website.id;
              return (
                <div
                  key={website.id}
                  className="relative rounded-2xl bg-[#0e1516]/90 border border-[#202c2e] hover:border-[#2d3e41] shadow-xl overflow-hidden backdrop-blur-md transition-all group"
                >
                  <div className="p-6">
                    {/* Website Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-5 border-b border-[#1b2628]">
                      <div className="flex items-center gap-4">
                        <CompanyLogo
                          website={website}
                          className="h-14 w-14 rounded-xl object-contain border border-white/10 bg-white p-1 shrink-0 shadow-sm"
                        />
                        <div className="min-w-0">
                          <h3 className="text-lg font-bold text-white group-hover:text-[#fff800] transition-colors truncate">
                            {website.name}
                          </h3>
                          <p className="text-xs text-[#859496] truncate">
                            {website.url}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-[#859496] mt-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#fff800]" />
                            <span>Audit Date: {formatDate(website.dateAudited)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <Link
                          to={`/websites/${website.id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg text-white bg-[#151f21] hover:bg-[#1d2a2d] border border-[#27373a] hover:border-[#384e52] transition-all"
                        >
                          Details
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Status Summary Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                      <div className="bg-[#101719] border border-[#1b2628] rounded-xl p-3">
                        <div className="text-[11px] font-semibold text-[#859496] uppercase tracking-wider mb-1.5">
                          Overall Status
                        </div>
                        <StatusBadge status={website.status} />
                      </div>
                      <div className="bg-[#101719] border border-[#1b2628] rounded-xl p-3">
                        <div className="text-[11px] font-semibold text-[#859496] uppercase tracking-wider mb-1.5">
                          Security
                        </div>
                        <StatusBadge status={website.securityCheck} />
                      </div>
                      <div className="bg-[#101719] border border-[#1b2628] rounded-xl p-3">
                        <div className="text-[11px] font-semibold text-[#859496] uppercase tracking-wider mb-1.5">
                          Functionality
                        </div>
                        <StatusBadge status={website.functionalityTest} />
                      </div>
                      <div className="bg-[#101719] border border-[#1b2628] rounded-xl p-3">
                        <div className="text-[11px] font-semibold text-[#859496] uppercase tracking-wider mb-1.5">
                          SEO
                        </div>
                        <StatusBadge status={website.seo} />
                      </div>
                    </div>

                    {/* Remarks Callout Box */}
                    <div className="relative rounded-xl bg-[#11191b] border border-[#233235] p-4.5">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-[#fff800] shrink-0" />
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                            Auditor Remarks
                          </h4>
                        </div>
                        <button
                          onClick={() =>
                            handleCopyRemarks(website.id, website.remarks)
                          }
                          className="inline-flex items-center gap-1 text-xs text-[#859496] hover:text-[#fff800] transition-colors py-0.5 px-2 rounded-md hover:bg-[#192426]"
                          title="Copy remark text"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-[#ccd9da] leading-relaxed pl-6">
                        {website.remarks}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Remarks;
