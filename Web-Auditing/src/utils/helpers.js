// Utility helper functions

export const getStatusColor = (status) => {
  const colors = {
    "Passed": "bg-green-100 text-green-800 border-green-200",
    "Needs Review": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Failed": "bg-red-100 text-red-800 border-red-200",
    "Pending": "bg-gray-100 text-gray-800 border-gray-200",
    "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
    "Not Tested": "bg-gray-100 text-gray-600 border-gray-200",
    "Warning": "bg-orange-100 text-orange-800 border-orange-200",
    "Good": "bg-green-100 text-green-800 border-green-200",
    "Needs Improvement": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Poor": "bg-red-100 text-red-800 border-red-200"
  };
  return colors[status] || "bg-gray-100 text-gray-600 border-gray-200";
};

export const getStatusIcon = (status) => {
  const icons = {
    "Passed": "🟢",
    "Needs Review": "🟡",
    "Failed": "🔴",
    "Pending": "⚪",
    "In Progress": "🔵",
    "Not Tested": "⚪",
    "Warning": "🟠",
    "Good": "🟢",
    "Needs Improvement": "🟡",
    "Poor": "🔴"
  };
  return icons[status] || "⚪";
};

export const formatDate = (date) => {
  if (!date) return "Not Audited";
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const getCurrentQuarter = () => {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const quarter = Math.ceil(month / 3);
  return `Q${quarter} ${year}`;
};

export const getStatistics = (websites) => {
  const total = websites.length;
  const audited = websites.filter(w => w.dateAudited).length;
  const pending = websites.filter(w => w.status === "Pending").length;
  const passed = websites.filter(w => w.status === "Passed").length;
  const needsReview = websites.filter(w => w.status === "Needs Review").length;
  const failed = websites.filter(w => w.status === "Failed").length;
  
  return { total, audited, pending, passed, needsReview, failed };
};

export const filterWebsites = (websites, searchTerm, filters) => {
  let filtered = [...websites];
  
  // Search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(w => 
      w.name.toLowerCase().includes(term) || 
      w.url.toLowerCase().includes(term)
    );
  }
  
  // Status filter
  if (filters.status && filters.status !== "All") {
    filtered = filtered.filter(w => w.status === filters.status);
  }
  
  // Security filter
  if (filters.security && filters.security !== "All") {
    filtered = filtered.filter(w => w.securityCheck === filters.security);
  }
  
  // Functionality filter
  if (filters.functionality && filters.functionality !== "All") {
    filtered = filtered.filter(w => w.functionalityTest === filters.functionality);
  }
  
  // SEO filter
  if (filters.seo && filters.seo !== "All") {
    filtered = filtered.filter(w => w.seo === filters.seo);
  }
  
  // Type filter
  if (filters.type && filters.type !== "All") {
    filtered = filtered.filter(w => w.type === filters.type);
  }
  
  return filtered;
};
