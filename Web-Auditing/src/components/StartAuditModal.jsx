import { useState, useEffect } from "react";
import {
  X,
  Shield,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Calendar,
  MessageSquare,
  FileText,
  RotateCcw,
  Check,
  CheckCheck,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import {
  statusOptions,
  securityOptions,
  functionalityOptions,
  seoOptions,
  securityChecklist as defaultSecurityChecklist,
  functionalityChecklist as defaultFunctionalityChecklist,
  seoChecklist as defaultSeoChecklist,
} from "../data/mockData";
import CompanyLogo from "./CompanyLogo";

const StartAuditModal = ({ website, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const [formData, setFormData] = useState({
    dateAudited:
      website?.dateAudited || new Date().toISOString().split("T")[0],
    status: website?.status && website?.status !== "Pending" ? website.status : "In Progress",
    securityCheck: website?.securityCheck || "Not Tested",
    functionalityTest: website?.functionalityTest || "Not Tested",
    seo: website?.seo || "Not Tested",
    remarks:
      website?.remarks && website?.remarks !== "No audit has been performed yet."
        ? website.remarks
        : "",
    securityChecklist:
      website?.securityChecklist && website.securityChecklist.length > 0
        ? website.securityChecklist.map((item) => ({ ...item }))
        : defaultSecurityChecklist.map((item) => ({ ...item })),
    functionalityChecklist:
      website?.functionalityChecklist && website.functionalityChecklist.length > 0
        ? website.functionalityChecklist.map((item) => ({ ...item }))
        : defaultFunctionalityChecklist.map((item) => ({ ...item })),
    seoChecklist:
      website?.seoChecklist && website.seoChecklist.length > 0
        ? website.seoChecklist.map((item) => ({ ...item }))
        : defaultSeoChecklist.map((item) => ({ ...item })),
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!website) return null;

  // Helpers to update individual checklist items
  const handleSecurityItemChange = (id, newStatus) => {
    const updated = formData.securityChecklist.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setFormData((prev) => {
      // Auto-suggest overall security check
      const hasFailed = updated.some((i) => i.status === "Failed");
      const hasWarning = updated.some((i) => i.status === "Warning");
      const allPassed = updated.every((i) => i.status === "Passed");
      let suggested = prev.securityCheck;
      if (hasFailed) suggested = "Failed";
      else if (hasWarning) suggested = "Warning";
      else if (allPassed) suggested = "Passed";

      return {
        ...prev,
        securityChecklist: updated,
        securityCheck: suggested,
      };
    });
  };

  const handleFunctionalityItemChange = (id, newStatus) => {
    const updated = formData.functionalityChecklist.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setFormData((prev) => {
      const hasFailed = updated.some((i) => i.status === "Failed");
      const hasReview = updated.some((i) => i.status === "Needs Review");
      const allPassed = updated.every((i) => i.status === "Passed");
      let suggested = prev.functionalityTest;
      if (hasFailed) suggested = "Failed";
      else if (hasReview) suggested = "Needs Review";
      else if (allPassed) suggested = "Passed";

      return {
        ...prev,
        functionalityChecklist: updated,
        functionalityTest: suggested,
      };
    });
  };

  const handleSeoItemChange = (id, newStatus) => {
    const updated = formData.seoChecklist.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setFormData((prev) => {
      const hasPoor = updated.some((i) => i.status === "Poor");
      const hasImprovement = updated.some((i) => i.status === "Needs Improvement");
      const allGood = updated.every((i) => i.status === "Good");
      let suggested = prev.seo;
      if (hasPoor) suggested = "Poor";
      else if (hasImprovement) suggested = "Needs Improvement";
      else if (allGood) suggested = "Good";

      return {
        ...prev,
        seoChecklist: updated,
        seo: suggested,
      };
    });
  };

  // Bulk actions
  const bulkSetSecurity = (status) => {
    const updated = formData.securityChecklist.map((item) => ({
      ...item,
      status,
    }));
    setFormData((prev) => ({
      ...prev,
      securityChecklist: updated,
      securityCheck: status === "Passed" ? "Passed" : status === "Not Tested" ? "Not Tested" : prev.securityCheck,
    }));
  };

  const bulkSetFunctionality = (status) => {
    const updated = formData.functionalityChecklist.map((item) => ({
      ...item,
      status,
    }));
    setFormData((prev) => ({
      ...prev,
      functionalityChecklist: updated,
      functionalityTest: status === "Passed" ? "Passed" : status === "Not Tested" ? "Not Tested" : prev.functionalityTest,
    }));
  };

  const bulkSetSeo = (status) => {
    const updated = formData.seoChecklist.map((item) => ({
      ...item,
      status,
    }));
    setFormData((prev) => ({
      ...prev,
      seoChecklist: updated,
      seo: status === "Good" ? "Good" : status === "Not Tested" ? "Not Tested" : prev.seo,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(website.id, formData);
    onClose();
  };

  const modalTabs = [
    {
      id: "overview",
      name: "Overview",
      icon: <FileText className="w-4 h-4" />,
      badge: formData.status,
    },
    {
      id: "security",
      name: "Security",
      icon: <Shield className="w-4 h-4" />,
      badge: `${formData.securityChecklist.filter((i) => i.status !== "Not Tested").length}/${formData.securityChecklist.length}`,
    },
    {
      id: "functionality",
      name: "Functionality",
      icon: <CheckCircle2 className="w-4 h-4" />,
      badge: `${formData.functionalityChecklist.filter((i) => i.status !== "Not Tested").length}/${formData.functionalityChecklist.length}`,
    },
    {
      id: "seo",
      name: "SEO",
      icon: <TrendingUp className="w-4 h-4" />,
      badge: `${formData.seoChecklist.filter((i) => i.status !== "Not Tested").length}/${formData.seoChecklist.length}`,
    },
    {
      id: "remarks",
      name: "Remarks",
      icon: <MessageSquare className="w-4 h-4" />,
      badge: formData.remarks ? "Set" : null,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-3 py-6 sm:p-6 text-center">
        {/* Dark Frosted Glass Backdrop Overlay */}
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
          onClick={onClose}
        />

        {/* Modal Container */}
        <div className="relative inline-block align-bottom bg-[#0e1516] border border-[#243336] rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-4 sm:align-middle max-w-4xl w-full z-10 flex flex-col max-h-[90vh]">
          {/* Top Yellow Accent Line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#fff800] to-transparent shrink-0" />

          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-[#1c292c] flex items-center justify-between bg-[#111a1c]/80 shrink-0">
            <div className="flex items-center gap-3">
              <CompanyLogo
                website={website}
                className="h-10 w-10 rounded-xl object-contain border border-white/10 bg-white p-1 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Audit Inspection: {website.name}
                  </h3>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#182527] text-[#fff800] border border-[#273a3d]">
                    {website.type}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#859496] mt-0.5">
                  <span className="truncate max-w-[240px] sm:max-w-md">{website.url}</span>
                  {website.url !== "URL Not Provided" && (
                    <a
                      href={website.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#fff800] hover:text-[#ffe600] inline-flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#859496] hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 py-2.5 border-b border-[#1a2527] bg-[#101719] shrink-0 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              {modalTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
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
                  {tab.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        activeTab === tab.id
                          ? "bg-[#fff800]/15 text-[#fff800] border border-[#fff800]/30"
                          : "bg-[#182325] text-[#859496]"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Form Content Area (Scrollable) */}
          <form onSubmit={handleSubmit} id="audit-form" className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* ── TAB 1: OVERVIEW ── */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-[#121b1d] border border-[#202d30]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#fff800] mb-1">
                    Audit Dossier Metadata
                  </h4>
                  <p className="text-xs text-[#859496]">
                    Set the audit date and overall status summaries. Detailed item-by-item checks can be scored in the respective Security, Functionality, and SEO tabs.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date Audited */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#859496] mb-1.5">
                      Date Audited
                    </label>
                    <input
                      type="date"
                      value={formData.dateAudited}
                      onChange={(e) =>
                        setFormData({ ...formData, dateAudited: e.target.value })
                      }
                      className="block w-full px-3.5 py-2.5 rounded-xl border border-[#202c2e] bg-[#0d1415] text-white text-sm focus:outline-none focus:border-[#fff800]/60 focus:ring-2 focus:ring-[#fff800]/15"
                      required
                    />
                  </div>

                  {/* Overall Status */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#859496] mb-1.5">
                      Overall Assessment Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="block w-full px-3.5 py-2.5 rounded-xl border border-[#202c2e] bg-[#0d1415] text-white text-sm focus:outline-none focus:border-[#fff800]/60 focus:ring-2 focus:ring-[#fff800]/15"
                      required
                    >
                      {statusOptions.map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="bg-[#0b1011] text-white"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Overall Security Check */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#859496] mb-1.5">
                      Overall Security Rating
                    </label>
                    <select
                      value={formData.securityCheck}
                      onChange={(e) =>
                        setFormData({ ...formData, securityCheck: e.target.value })
                      }
                      className="block w-full px-3.5 py-2.5 rounded-xl border border-[#202c2e] bg-[#0d1415] text-white text-sm focus:outline-none focus:border-[#fff800]/60 focus:ring-2 focus:ring-[#fff800]/15"
                      required
                    >
                      {securityOptions.map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="bg-[#0b1011] text-white"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Overall Functionality Test */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#859496] mb-1.5">
                      Overall Functionality Rating
                    </label>
                    <select
                      value={formData.functionalityTest}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          functionalityTest: e.target.value,
                        })
                      }
                      className="block w-full px-3.5 py-2.5 rounded-xl border border-[#202c2e] bg-[#0d1415] text-white text-sm focus:outline-none focus:border-[#fff800]/60 focus:ring-2 focus:ring-[#fff800]/15"
                      required
                    >
                      {functionalityOptions.map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="bg-[#0b1011] text-white"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Overall SEO */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#859496] mb-1.5">
                      Overall SEO Rating
                    </label>
                    <select
                      value={formData.seo}
                      onChange={(e) =>
                        setFormData({ ...formData, seo: e.target.value })
                      }
                      className="block w-full px-3.5 py-2.5 rounded-xl border border-[#202c2e] bg-[#0d1415] text-white text-sm focus:outline-none focus:border-[#fff800]/60 focus:ring-2 focus:ring-[#fff800]/15"
                      required
                    >
                      {seoOptions.map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="bg-[#0b1011] text-white"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB 2: SECURITY CHECKLIST ── */}
            {activeTab === "security" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#121b1d] border border-[#202d30]">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Security Verification Checklist (7 Items)
                    </h4>
                    <p className="text-xs text-[#859496]">
                      Evaluate each criteria individually as displayed in View Details.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => bulkSetSecurity("Passed")}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      All Passed
                    </button>
                    <button
                      type="button"
                      onClick={() => bulkSetSecurity("Not Tested")}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-[#859496] hover:text-white bg-[#151f21] hover:bg-[#1b2729] border border-[#253538] transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {formData.securityChecklist.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-[#11191a] border border-[#1e2b2d] hover:border-[#2b3d40] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-[#182426] border border-[#24373a] flex items-center justify-center text-xs font-bold text-[#fff800] shrink-0 mt-0.5">
                          {item.id}
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-white">
                            {item.name}
                          </h5>
                          <p className="text-xs text-[#859496] mt-0.5 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                        {securityOptions.map((opt) => {
                          const isActive = item.status === opt;
                          let activeStyle = "bg-[#182325] text-[#859496] border-[#223032]";
                          if (isActive) {
                            if (opt === "Passed")
                              activeStyle = "bg-emerald-500/15 text-emerald-300 border-emerald-500/50 shadow-xs";
                            else if (opt === "Warning")
                              activeStyle = "bg-amber-500/15 text-amber-300 border-amber-500/50 shadow-xs";
                            else if (opt === "Failed")
                              activeStyle = "bg-rose-500/15 text-rose-300 border-rose-500/50 shadow-xs";
                            else
                              activeStyle = "bg-slate-500/15 text-slate-300 border-slate-500/50";
                          }

                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleSecurityItemChange(item.id, opt)}
                              className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${activeStyle} ${
                                !isActive ? "hover:border-[#334649] hover:text-white" : ""
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── TAB 3: FUNCTIONALITY CHECKLIST ── */}
            {activeTab === "functionality" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#121b1d] border border-[#202d30]">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Functionality &amp; UX Test Matrix (10 Tests)
                    </h4>
                    <p className="text-xs text-[#859496]">
                      Evaluate buttons, forms, links, and responsive interactions.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => bulkSetFunctionality("Passed")}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      All Passed
                    </button>
                    <button
                      type="button"
                      onClick={() => bulkSetFunctionality("Not Tested")}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-[#859496] hover:text-white bg-[#151f21] hover:bg-[#1b2729] border border-[#253538] transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {formData.functionalityChecklist.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-[#11191a] border border-[#1e2b2d] hover:border-[#2b3d40] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-[#182426] border border-[#24373a] flex items-center justify-center text-xs font-bold text-[#fff800] shrink-0 mt-0.5">
                          {item.id}
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-white">
                            {item.name}
                          </h5>
                          <p className="text-xs text-[#859496] mt-0.5 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                        {functionalityOptions.map((opt) => {
                          const isActive = item.status === opt;
                          let activeStyle = "bg-[#182325] text-[#859496] border-[#223032]";
                          if (isActive) {
                            if (opt === "Passed")
                              activeStyle = "bg-emerald-500/15 text-emerald-300 border-emerald-500/50 shadow-xs";
                            else if (opt === "Needs Review")
                              activeStyle = "bg-amber-500/15 text-amber-300 border-amber-500/50 shadow-xs";
                            else if (opt === "Failed")
                              activeStyle = "bg-rose-500/15 text-rose-300 border-rose-500/50 shadow-xs";
                            else
                              activeStyle = "bg-slate-500/15 text-slate-300 border-slate-500/50";
                          }

                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleFunctionalityItemChange(item.id, opt)}
                              className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${activeStyle} ${
                                !isActive ? "hover:border-[#334649] hover:text-white" : ""
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── TAB 4: SEO CHECKLIST ── */}
            {activeTab === "seo" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#121b1d] border border-[#202d30]">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      SEO &amp; Indexing Checklist (10 Items)
                    </h4>
                    <p className="text-xs text-[#859496]">
                      Evaluate meta tags, hierarchy, sitemaps, and mobile indexing.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => bulkSetSeo("Good")}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      All Good
                    </button>
                    <button
                      type="button"
                      onClick={() => bulkSetSeo("Not Tested")}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-[#859496] hover:text-white bg-[#151f21] hover:bg-[#1b2729] border border-[#253538] transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {formData.seoChecklist.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-[#11191a] border border-[#1e2b2d] hover:border-[#2b3d40] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-[#182426] border border-[#24373a] flex items-center justify-center text-xs font-bold text-[#fff800] shrink-0 mt-0.5">
                          {item.id}
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-white">
                            {item.name}
                          </h5>
                          <p className="text-xs text-[#859496] mt-0.5 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                        {seoOptions.map((opt) => {
                          const isActive = item.status === opt;
                          let activeStyle = "bg-[#182325] text-[#859496] border-[#223032]";
                          if (isActive) {
                            if (opt === "Good")
                              activeStyle = "bg-emerald-500/15 text-emerald-300 border-emerald-500/50 shadow-xs";
                            else if (opt === "Needs Improvement")
                              activeStyle = "bg-amber-500/15 text-amber-300 border-amber-500/50 shadow-xs";
                            else if (opt === "Poor")
                              activeStyle = "bg-rose-500/15 text-rose-300 border-rose-500/50 shadow-xs";
                            else
                              activeStyle = "bg-slate-500/15 text-slate-300 border-slate-500/50";
                          }

                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleSeoItemChange(item.id, opt)}
                              className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${activeStyle} ${
                                !isActive ? "hover:border-[#334649] hover:text-white" : ""
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── TAB 5: REMARKS ── */}
            {activeTab === "remarks" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#121b1d] border border-[#202d30]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#fff800] mb-1">
                    Auditor Findings &amp; Technical Notes
                  </h4>
                  <p className="text-xs text-[#859496]">
                    Document overall observations, security advisories, and recommended next steps for engineering and operations.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#859496] mb-1.5">
                    Detailed Remarks &amp; Remediation Guidance
                  </label>
                  <textarea
                    value={formData.remarks}
                    onChange={(e) =>
                      setFormData({ ...formData, remarks: e.target.value })
                    }
                    rows={6}
                    className="block w-full px-4 py-3 rounded-xl border border-[#202c2e] bg-[#0d1415] text-white text-sm focus:outline-none focus:border-[#fff800]/60 focus:ring-2 focus:ring-[#fff800]/15 leading-relaxed placeholder-[#64748b]"
                    placeholder="Enter comprehensive findings, CVE or header audit logs, and actionable recommendations..."
                  />
                </div>

                {/* Quick note helpers */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs text-[#859496] mr-1 self-center">
                    Quick suggestions:
                  </span>
                  {[
                    "All security certificates valid and HTTP redirected to HTTPS.",
                    "Mobile responsiveness issues detected on viewport < 375px.",
                    "Missing meta description and OpenGraph tags for social sharing.",
                    "Form CSRF token missing on public contact submission.",
                  ].map((phrase) => (
                    <button
                      key={phrase}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          remarks: prev.remarks
                            ? `${prev.remarks}\n• ${phrase}`
                            : `• ${phrase}`,
                        }))
                      }
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-[#141d1f] hover:bg-[#1c272a] text-[#ccd9da] border border-[#243336] transition-colors"
                    >
                      + {phrase.slice(0, 36)}...
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-[#1c292c] flex items-center justify-between bg-[#111a1c]/90 shrink-0">
            <div className="flex items-center gap-2">
              {activeTab !== "overview" && (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = modalTabs.findIndex((t) => t.id === activeTab);
                    if (currentIndex > 0) setActiveTab(modalTabs[currentIndex - 1].id);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#859496] hover:text-white bg-[#141d1f] border border-[#223033]"
                >
                  Previous
                </button>
              )}
              {activeTab !== "remarks" && (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = modalTabs.findIndex((t) => t.id === activeTab);
                    if (currentIndex < modalTabs.length - 1) setActiveTab(modalTabs[currentIndex + 1].id);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#859496] hover:text-white bg-[#141d1f] border border-[#223033]"
                >
                  Next Tab
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#94a3b8] hover:text-white bg-[#12191a] hover:bg-[#1a2527] border border-[#202c2e] transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="audit-form"
                className="px-5 py-2 rounded-xl text-xs font-bold text-black bg-[#fff800] hover:bg-[#ffe600] shadow-[0_0_20px_rgba(255,248,0,0.3)] transition-all active:scale-[0.98] uppercase tracking-wider"
              >
                Save Audit Results
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartAuditModal;


