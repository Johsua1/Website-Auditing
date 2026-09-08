import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Shield,
  CheckCircle2,
  TrendingUp,
  FileText,
  MessageSquare,
  Play,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import CompanyLogo from "../components/CompanyLogo";
import { formatDate } from "../utils/helpers";
import {
  securityChecklist,
  functionalityChecklist,
  seoChecklist,
} from "../data/mockData";

const WebsiteDetail = ({ websites, onStartAudit }) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);
  const [expandedChecklistId, setExpandedChecklistId] = useState(null);

  const website = websites.find((w) => w.id === parseInt(id));

  if (!website) {
    return (
      <div className="min-h-screen pt-16 pb-16 flex items-center justify-center">
        <div className="rounded-2xl bg-[#0e1516] border border-[#202c2e] p-12 text-center max-w-md w-full shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-2">
            Website Not Found
          </h2>
          <p className="text-xs text-[#859496] mb-6">
            The requested website record does not exist or has been removed.
          </p>
          <Link
            to="/websites"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#fff800] text-black text-xs font-bold hover:bg-[#fffa66] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  const handleCopyUrl = () => {
    if (!website.url || website.url === "URL Not Provided") return;
    navigator.clipboard.writeText(website.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeSecurityList =
    website.securityChecklist && website.securityChecklist.length > 0
      ? website.securityChecklist
      : securityChecklist;

  const activeFunctionalityList =
    website.functionalityChecklist && website.functionalityChecklist.length > 0
      ? website.functionalityChecklist
      : functionalityChecklist;

  const activeSeoList =
    website.seoChecklist && website.seoChecklist.length > 0
      ? website.seoChecklist
      : seoChecklist;

  const tabs = [
    {
      id: "overview",
      name: "Overview",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "security",
      name: "Security",
      icon: <Shield className="w-4 h-4" />,
    },
    {
      id: "functionality",
      name: "Functionality",
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
    {
      id: "seo",
      name: "SEO",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      id: "remarks",
      name: "Remarks",
      icon: <MessageSquare className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          to="/websites"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#859496] hover:text-[#fff800] mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Websites
        </Link>

        {/* Website Header Card */}
        <div className="relative rounded-2xl bg-[#0e1516]/95 border border-[#202c2e] p-6 sm:p-8 mb-8 shadow-2xl backdrop-blur-md">
          {/* Subtle Yellow Gradient Line */}
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#fff800]/50 to-transparent pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <CompanyLogo
                website={website}
                className="h-20 w-20 rounded-2xl object-contain border border-white/10 bg-white p-2 shadow-md shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {website.name}
                  </h1>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#162224] text-[#fff800] border border-[#233538]">
                    {website.type}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#859496] mb-3">
                  <span className="font-mono text-[#cbd5e1]">{website.url}</span>
                  {website.url !== "URL Not Provided" && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={handleCopyUrl}
                        className="text-[#64748b] hover:text-[#fff800] transition-colors p-1"
                        title="Copy URL"
                      >
                        {copied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <a
                        href={website.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#64748b] hover:text-white transition-colors p-1"
                        title="Open external URL"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="text-xs text-[#859496]">
                  Last Audit Date:{" "}
                  <span className="text-white font-medium">
                    {formatDate(website.dateAudited)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start lg:self-center">
              <button
                onClick={() => onStartAudit(website)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#fff800] hover:bg-[#fffa66] text-black text-sm font-bold shadow-[0_0_20px_rgba(255,248,0,0.25)] transition-all active:scale-[0.98]"
              >
                <Play className="w-4 h-4 fill-black" />
                Start Audit
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-[#1b2628]">
            <div className="rounded-xl bg-[#11191a] p-3.5 border border-[#1e2b2d]">
              <span className="text-[11px] uppercase tracking-wider text-[#64748b] block mb-1">
                Overall Status
              </span>
              <StatusBadge status={website.status} />
            </div>
            <div className="rounded-xl bg-[#11191a] p-3.5 border border-[#1e2b2d]">
              <span className="text-[11px] uppercase tracking-wider text-[#64748b] block mb-1">
                Security Check
              </span>
              <StatusBadge status={website.securityCheck} />
            </div>
            <div className="rounded-xl bg-[#11191a] p-3.5 border border-[#1e2b2d]">
              <span className="text-[11px] uppercase tracking-wider text-[#64748b] block mb-1">
                Functionality
              </span>
              <StatusBadge status={website.functionalityTest} />
            </div>
            <div className="rounded-xl bg-[#11191a] p-3.5 border border-[#1e2b2d]">
              <span className="text-[11px] uppercase tracking-wider text-[#64748b] block mb-1">
                SEO Audit
              </span>
              <StatusBadge status={website.seo} />
            </div>
          </div>
        </div>

        {/* Tab Navigation (Paddle Pill Tab Bar) */}
        <div className="relative rounded-2xl bg-[#0e1516]/95 border border-[#202c2e] overflow-hidden shadow-xl backdrop-blur-md">
          <div className="p-3 border-b border-[#1a2527] bg-[#11181a]/60">
            <nav className="flex overflow-x-auto gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                    activeTab === tab.id
                      ? "bg-[#182325] text-white border border-[#2e3e42] shadow-xs"
                      : "text-[#859496] hover:text-white hover:bg-[#141d1f] border border-transparent"
                  }`}
                >
                  <span
                    className={
                      activeTab === tab.id ? "text-[#fff800]" : "text-[#64748b]"
                    }
                  >
                    {tab.icon}
                  </span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content Panels */}
          <div className="p-6 sm:p-8">
            {/* ── OVERVIEW TAB ── */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#859496] mb-4">
                    Website Profile
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-[#111819] border border-[#1d2a2c] p-4">
                      <span className="text-xs text-[#64748b] block mb-1">
                        Company Name
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {website.name}
                      </span>
                    </div>
                    <div className="rounded-xl bg-[#111819] border border-[#1d2a2c] p-4">
                      <span className="text-xs text-[#64748b] block mb-1">
                        Deployment URL
                      </span>
                      <span className="text-sm font-mono text-[#cbd5e1] break-all">
                        {website.url}
                      </span>
                    </div>
                    <div className="rounded-xl bg-[#111819] border border-[#1d2a2c] p-4">
                      <span className="text-xs text-[#64748b] block mb-1">
                        Classification
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {website.type}
                      </span>
                    </div>
                    <div className="rounded-xl bg-[#111819] border border-[#1d2a2c] p-4">
                      <span className="text-xs text-[#64748b] block mb-1">
                        Audit Timestamp
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {formatDate(website.dateAudited)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#859496] mb-4">
                    Audit Performance Breakdown
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="rounded-xl bg-[#111819] border border-[#1d2a2c] p-4">
                      <div className="text-xs text-[#859496] mb-2">Status</div>
                      <StatusBadge status={website.status} />
                    </div>
                    <div className="rounded-xl bg-[#111819] border border-[#1d2a2c] p-4">
                      <div className="text-xs text-[#859496] mb-2">Security</div>
                      <StatusBadge status={website.securityCheck} />
                    </div>
                    <div className="rounded-xl bg-[#111819] border border-[#1d2a2c] p-4">
                      <div className="text-xs text-[#859496] mb-2">
                        Functionality
                      </div>
                      <StatusBadge status={website.functionalityTest} />
                    </div>
                    <div className="rounded-xl bg-[#111819] border border-[#1d2a2c] p-4">
                      <div className="text-xs text-[#859496] mb-2">SEO</div>
                      <StatusBadge status={website.seo} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── SECURITY TAB ── */}
            {activeTab === "security" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#859496]">
                      Security Checklist Verification
                    </h3>
                    <p className="text-xs text-[#64748b]">
                      Click an item to toggle inspection details.
                    </p>
                  </div>
                  <span className="text-xs text-[#fff800] bg-[#fff800]/10 px-2.5 py-1 rounded-full border border-[#fff800]/20 font-semibold">
                    {activeSecurityList.length} Items Checked
                  </span>
                </div>

                <div className="space-y-2.5">
                  {activeSecurityList.map((item) => {
                    const isExpanded = expandedChecklistId === `sec-${item.id}`;
                    return (
                      <div
                        key={item.id}
                        onClick={() =>
                          setExpandedChecklistId(
                            isExpanded ? null : `sec-${item.id}`
                          )
                        }
                        className="rounded-xl bg-[#111819] border border-[#1e2b2d] hover:border-[#2d3e41] p-4 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Shield className="w-4 h-4 text-[#fff800]" />
                            <h4 className="text-sm font-semibold text-white">
                              {item.name}
                            </h4>
                          </div>
                          <div className="flex items-center gap-3">
                            <StatusBadge status={item.status} size="sm" />
                            <ChevronRight
                              className={`w-4 h-4 text-[#64748b] transition-transform ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                            />
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-[#1a2527] text-xs text-[#859496] leading-relaxed">
                            {item.description}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── FUNCTIONALITY TAB ── */}
            {activeTab === "functionality" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#859496]">
                      Functionality &amp; UX Test Matrix
                    </h3>
                    <p className="text-xs text-[#64748b]">
                      Click any test item to inspect verification criteria.
                    </p>
                  </div>
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-semibold">
                    {activeFunctionalityList.length} Tests
                  </span>
                </div>

                <div className="space-y-2.5">
                  {activeFunctionalityList.map((item) => {
                    const isExpanded = expandedChecklistId === `func-${item.id}`;
                    return (
                      <div
                        key={item.id}
                        onClick={() =>
                          setExpandedChecklistId(
                            isExpanded ? null : `func-${item.id}`
                          )
                        }
                        className="rounded-xl bg-[#111819] border border-[#1e2b2d] hover:border-[#2d3e41] p-4 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <h4 className="text-sm font-semibold text-white">
                              {item.name}
                            </h4>
                          </div>
                          <div className="flex items-center gap-3">
                            <StatusBadge status={item.status} size="sm" />
                            <ChevronRight
                              className={`w-4 h-4 text-[#64748b] transition-transform ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                            />
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-[#1a2527] text-xs text-[#859496] leading-relaxed">
                            {item.description}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── SEO TAB ── */}
            {activeTab === "seo" && (
              <div>
                <div className="mb-6 rounded-2xl bg-gradient-to-r from-[#121c1e] to-[#152326] border border-[#202e31] p-6 text-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#859496] block mb-1">
                    Calculated SEO Score
                  </span>
                  <div className="text-3xl font-extrabold text-white">
                    {website.seo || "Not Tested"}
                  </div>
                </div>

                <div className="space-y-2.5">
                  {activeSeoList.map((item) => {
                    const isExpanded = expandedChecklistId === `seo-${item.id}`;
                    return (
                      <div
                        key={item.id}
                        onClick={() =>
                          setExpandedChecklistId(
                            isExpanded ? null : `seo-${item.id}`
                          )
                        }
                        className="rounded-xl bg-[#111819] border border-[#1e2b2d] hover:border-[#2d3e41] p-4 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <TrendingUp className="w-4 h-4 text-purple-400" />
                            <h4 className="text-sm font-semibold text-white">
                              {item.name}
                            </h4>
                          </div>
                          <div className="flex items-center gap-3">
                            <StatusBadge status={item.status} size="sm" />
                            <ChevronRight
                              className={`w-4 h-4 text-[#64748b] transition-transform ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                            />
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-[#1a2527] text-xs text-[#859496] leading-relaxed">
                            {item.description}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── REMARKS TAB ── */}
            {activeTab === "remarks" && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#859496] mb-4">
                  Audit Remarks &amp; Observations
                </h3>
                <div className="rounded-2xl bg-[#111819] border border-[#1e2b2d] p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs text-[#859496]">Assessed Status:</span>
                    <StatusBadge status={website.status} />
                  </div>
                  <div className="text-xs text-[#64748b] uppercase tracking-wider mb-2 font-semibold">
                    Auditor Notes:
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed bg-[#0c1314] p-4 rounded-xl border border-[#1a2527]">
                    {website.remarks || "No specific remarks entered for this site."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* View Full Report Button */}
        <div className="mt-8 flex justify-end">
          <Link
            to={`/reports/${website.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#162224] hover:bg-[#202e31] text-white text-sm font-bold border border-[#2a3c3f] hover:border-[#fff800]/50 transition-all shadow-md group"
          >
            <FileText className="w-4 h-4 text-[#fff800]" />
            Generate Comprehensive Audit Report
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#859496]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WebsiteDetail;

