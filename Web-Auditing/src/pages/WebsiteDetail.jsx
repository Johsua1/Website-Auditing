import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Shield,
  CheckCircle,
  TrendingUp,
  FileText,
  MessageSquare,
  Play,
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

  const website = websites.find((w) => w.id === parseInt(id));

  if (!website) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="glass-card p-10 text-center max-w-md w-full">
          <div className="w-12 h-12 rounded-full bg-red-400/10 border border-red-400/20 text-red-400 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold text-green-50 mb-2">
            Website Not Found
          </h2>
          <p className="text-xs text-green-100/50 mb-6">
            The requested website audit record could not be found or may have been removed.
          </p>
          <Link
            to="/websites"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-medium bg-emerald-400/10 border border-emerald-400/25 text-emerald-400 hover:bg-emerald-400/15 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Websites
          </Link>
        </div>
      </div>
    );
  }

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
      icon: <CheckCircle className="w-4 h-4" />,
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
    <div className="min-h-screen p-6 lg:p-8">
      {/* ── Back Navigation ── */}
      <div className="mb-6">
        <Link
          to="/websites"
          className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400/70 hover:text-emerald-400 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Websites</span>
        </Link>
      </div>

      {/* ── Main Company Header Card ── */}
      <div className="glass-card glass-card-hover p-6 lg:p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
            <CompanyLogo
              website={website}
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border border-emerald-400/20 bg-white/5 shadow-md flex-shrink-0 p-1"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-green-50 truncate">
                  {website.name}
                </h1>
                <span className="text-[10px] uppercase font-medium tracking-wider px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                  {website.type}
                </span>
              </div>

              {/* URL */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-green-100/50 mb-3">
                <span className="truncate max-w-[280px] sm:max-w-md">{website.url}</span>
                {website.url !== "URL Not Provided" && (
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400/70 hover:text-emerald-300 transition-colors inline-flex items-center flex-shrink-0"
                    title="Visit website"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Meta details */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-green-100/40">
                <span>
                  Last Audit:{" "}
                  <span className="text-green-100/70 font-medium">
                    {formatDate(website.dateAudited)}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="flex sm:flex-col items-center gap-2.5 flex-shrink-0">
            <button
              onClick={() => onStartAudit(website)}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-400 text-black font-semibold text-xs tracking-wide hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-400/20 active:scale-[0.98]"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>Start Audit</span>
            </button>
            <Link
              to={`/reports/${website.id}`}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-medium bg-white/5 border border-emerald-400/15 text-green-100/70 hover:bg-white/10 hover:text-green-50 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full Report</span>
            </Link>
          </div>
        </div>

        {/* Status Badges Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-400/10">
          {[
            { label: "Overall Status", status: website.status },
            { label: "Security", status: website.securityCheck },
            { label: "Functionality", status: website.functionalityTest },
            { label: "SEO", status: website.seo },
          ].map(({ label, status }) => (
            <div
              key={label}
              className="rounded-xl border border-emerald-400/10 p-3.5"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="text-[10px] uppercase tracking-wider text-green-100/40 font-medium mb-1.5">
                {label}
              </div>
              <StatusBadge status={status} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Tabbed Content Section ── */}
      <div className="glass-card glass-card-hover overflow-hidden mb-6">
        {/* Tab Navigation */}
        <div className="border-b border-emerald-400/10 px-4 sm:px-6 bg-white/2">
          <nav className="flex space-x-2 overflow-x-auto py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-emerald-400/15 border border-emerald-400/30 text-emerald-400 shadow-sm"
                    : "border border-transparent text-green-100/50 hover:text-green-100 hover:bg-white/4"
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Body */}
        <div className="p-6 lg:p-8">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold tracking-wide text-green-100/90 mb-4">
                  Website Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div
                    className="rounded-xl border border-emerald-400/10 p-4"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="text-[10px] uppercase tracking-wider text-green-100/40 font-medium mb-1">
                      Company
                    </div>
                    <div className="font-medium text-sm text-green-50">
                      {website.name}
                    </div>
                  </div>
                  <div
                    className="rounded-xl border border-emerald-400/10 p-4"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="text-[10px] uppercase tracking-wider text-green-100/40 font-medium mb-1">
                      Website URL
                    </div>
                    <div className="font-medium text-sm text-green-50 break-all">
                      {website.url}
                    </div>
                  </div>
                  <div
                    className="rounded-xl border border-emerald-400/10 p-4"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="text-[10px] uppercase tracking-wider text-green-100/40 font-medium mb-1">
                      System Type
                    </div>
                    <div className="font-medium text-sm text-green-50">
                      {website.type}
                    </div>
                  </div>
                  <div
                    className="rounded-xl border border-emerald-400/10 p-4"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="text-[10px] uppercase tracking-wider text-green-100/40 font-medium mb-1">
                      Audit Date
                    </div>
                    <div className="font-medium text-sm text-green-50">
                      {formatDate(website.dateAudited)}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold tracking-wide text-green-100/90 mb-4">
                  Audit Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="rounded-xl bg-blue-400/5 border border-blue-400/20 p-4">
                    <div className="text-[11px] font-medium text-blue-300/80 uppercase tracking-wider mb-2">
                      Overall Status
                    </div>
                    <StatusBadge status={website.status} />
                  </div>
                  <div className="rounded-xl bg-red-400/5 border border-red-400/20 p-4">
                    <div className="text-[11px] font-medium text-red-300/80 uppercase tracking-wider mb-2">
                      Security Check
                    </div>
                    <StatusBadge status={website.securityCheck} />
                  </div>
                  <div className="rounded-xl bg-emerald-400/5 border border-emerald-400/20 p-4">
                    <div className="text-[11px] font-medium text-emerald-300/80 uppercase tracking-wider mb-2">
                      Functionality Test
                    </div>
                    <StatusBadge status={website.functionalityTest} />
                  </div>
                  <div className="rounded-xl bg-violet-400/5 border border-violet-400/20 p-4">
                    <div className="text-[11px] font-medium text-violet-300/80 uppercase tracking-wider mb-2">
                      SEO Audit
                    </div>
                    <StatusBadge status={website.seo} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold tracking-wide text-green-100/90">
                  Security Checklist
                </h3>
                <span className="text-xs text-green-100/40">
                  {securityChecklist.length} criteria evaluated
                </span>
              </div>
              <div className="space-y-3">
                {securityChecklist.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-emerald-400/10 p-4 hover:border-emerald-400/25 transition-colors"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1.5">
                      <h4 className="font-medium text-sm text-green-50">
                        {item.name}
                      </h4>
                      <StatusBadge status={item.status} />
                    </div>
                    <p className="text-xs text-green-100/50 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FUNCTIONALITY TAB */}
          {activeTab === "functionality" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold tracking-wide text-green-100/90">
                  Functionality Checklist
                </h3>
                <span className="text-xs text-green-100/40">
                  {functionalityChecklist.length} tests performed
                </span>
              </div>
              <div className="space-y-3">
                {functionalityChecklist.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-emerald-400/10 p-4 hover:border-emerald-400/25 transition-colors"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1.5">
                      <h4 className="font-medium text-sm text-green-50">
                        {item.name}
                      </h4>
                      <StatusBadge status={item.status} />
                    </div>
                    <p className="text-xs text-green-100/50 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEO TAB */}
          {activeTab === "seo" && (
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-green-100/90 mb-4">
                SEO Checklist
              </h3>
              <div
                className="mb-6 rounded-xl border border-emerald-400/15 p-6 text-center"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="text-xs uppercase tracking-wider text-green-100/40 font-medium mb-1">
                  SEO Audit Status
                </div>
                <div className="text-3xl font-bold text-green-50">
                  {website.seo}
                </div>
              </div>
              <div className="space-y-3">
                {seoChecklist.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-emerald-400/10 p-4 hover:border-emerald-400/25 transition-colors"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1.5">
                      <h4 className="font-medium text-sm text-green-50">
                        {item.name}
                      </h4>
                      <StatusBadge status={item.status} />
                    </div>
                    <p className="text-xs text-green-100/50 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REMARKS TAB */}
          {activeTab === "remarks" && (
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-green-100/90 mb-4">
                Audit Remarks & Observations
              </h3>
              <div
                className="rounded-xl border border-emerald-400/10 p-6"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-emerald-400/10">
                  <div className="text-xs text-green-100/40">Status:</div>
                  <StatusBadge status={website.status} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-green-100/40 font-medium mb-2">
                    Remarks
                  </div>
                  <p className="text-sm text-green-100/80 leading-relaxed">
                    {website.remarks || "No remarks recorded for this website."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom Action Links ── */}
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to={`/reports/${website.id}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-xs font-semibold
            bg-emerald-400/15 border border-emerald-400/30 text-emerald-400
            hover:bg-emerald-400/25 hover:border-emerald-400/40 transition-all shadow-sm"
        >
          <FileText className="w-4 h-4" />
          View Full Audit Report
        </Link>
        <button
          onClick={() => onStartAudit(website)}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-medium
            bg-white/5 border border-emerald-400/15 text-green-100/70
            hover:bg-white/10 hover:text-green-50 transition-colors"
        >
          <Play className="w-3.5 h-3.5" />
          Re-Audit Website
        </button>
      </div>
    </div>
  );
};

export default WebsiteDetail;
