import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  statusOptions,
  securityOptions,
  functionalityOptions,
  seoOptions,
  securityChecklist,
  functionalityChecklist,
  seoChecklist,
} from "../data/mockData";

const emptyRemark = "No audit has been performed yet.";

const StartAuditModal = ({ website, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    dateAudited: new Date().toISOString().split("T")[0],
    status: "In Progress",
    securityCheck: website?.securityCheck || "Not Tested",
    functionalityTest: website?.functionalityTest || "Not Tested",
    seo: website?.seo || "Not Tested",
    remarks: website?.remarks || "",
    securityChecklist: website?.securityChecklist || securityChecklist,
    functionalityChecklist:
      website?.functionalityChecklist || functionalityChecklist,
    seoChecklist: website?.seoChecklist || seoChecklist,
  });
  const [activeSection, setActiveSection] = useState("security");

  const handleRemarksFocus = () => {
    if (formData.remarks === emptyRemark) {
      setFormData((current) => ({ ...current, remarks: "" }));
    }
  };

  const handleRemarksBlur = () => {
    if (!formData.remarks.trim()) {
      setFormData((current) => ({ ...current, remarks: emptyRemark }));
    }
  };

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const summarizeChecklist = (items, category) => {
    const statuses = items.map((item) => item.status);

    if (statuses.includes("Failed") || statuses.includes("Poor")) {
      return "Failed";
    }
    if (statuses.includes("Warning")) {
      return "Warning";
    }
    if (
      statuses.includes("Needs Review") ||
      statuses.includes("Needs Improvement")
    ) {
      return category === "seo" ? "Needs Improvement" : "Needs Review";
    }
    if (
      statuses.length > 0 &&
      statuses.every((status) => status === "Passed" || status === "Good")
    ) {
      return category === "seo" ? "Good" : "Passed";
    }
    return "Not Tested";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(website.id, {
      ...formData,
      securityCheck: summarizeChecklist(formData.securityChecklist, "security"),
      functionalityTest: summarizeChecklist(
        formData.functionalityChecklist,
        "functionality",
      ),
      seo: summarizeChecklist(formData.seoChecklist, "seo"),
    });
    onClose();
  };

  const updateChecklistItem = (section, itemId, status) => {
    setFormData((current) => ({
      ...current,
      [section]: current[section].map((item) =>
        item.id === itemId ? { ...item, status } : item,
      ),
    }));
  };

  const sections = [
    {
      id: "security",
      label: "Security",
      key: "securityChecklist",
      options: securityOptions,
    },
    {
      id: "functionality",
      label: "Functionality",
      key: "functionalityChecklist",
      options: functionalityOptions,
    },
    { id: "seo", label: "SEO", key: "seoChecklist", options: seoOptions },
  ];
  const activeSectionData = sections.find(
    (section) => section.id === activeSection,
  );

  if (!website) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Center modal */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Start Audit</h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-6">
            {/* Website Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">
                {website.name}
              </h4>
              <p className="text-sm text-gray-600">{website.url}</p>
            </div>

            <div className="space-y-4">
              {/* Date Audited */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Audited
                </label>
                <input
                  type="date"
                  value={formData.dateAudited}
                  onChange={(e) =>
                    setFormData({ ...formData, dateAudited: e.target.value })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 px-3 py-2 text-gray-700"
                  required
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-b border-gray-200">
                <div className="flex gap-1 overflow-x-auto">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium ${
                        activeSection === section.id
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
                {activeSectionData &&
                  formData[activeSectionData.key].map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-gray-200 p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            {item.name}
                          </h4>
                          <p className="mt-1 text-xs text-gray-500">
                            {item.description}
                          </p>
                        </div>
                        <select
                          value={item.status}
                          onChange={(e) =>
                            updateChecklistItem(
                              activeSectionData.key,
                              item.id,
                              e.target.value,
                            )
                          }
                          className="w-32 flex-shrink-0 rounded-lg border border-gray-300 px-2 py-1 text-xs"
                        >
                          {activeSectionData.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Remarks
                </label>
                <textarea
                  value={formData.remarks}
                  onFocus={handleRemarksFocus}
                  onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
                  }
                  onBlur={handleRemarksBlur}
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write remarks..."
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Audit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StartAuditModal;
