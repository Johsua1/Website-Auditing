// Mock data for the Website Audit and Maintenance System

export const websites = [
  {
    id: 1,
    name: "Connector",
    url: "URL Not Provided",
    type: "Website",
    dateAudited: null,
    status: "Pending",
    securityCheck: "Not Tested",
    functionalityTest: "Not Tested",
    seo: "Not Tested",
    remarks: "No audit has been performed yet.",
    color: "#E8F5E9"
  },
  {
    id: 2,
    name: "Brains Infinite Innovations",
    url: "https://www.brains.asia/",
    type: "Website",
    dateAudited: null,
    status: "Pending",
    securityCheck: "Not Tested",
    functionalityTest: "Not Tested",
    seo: "Not Tested",
    remarks: "No audit has been performed yet.",
    color: "#E3F2FD"
  },
  {
    id: 3,
    name: "Klassic Solutions Inc.",
    url: "URL Not Provided",
    type: "Website",
    dateAudited: null,
    status: "Pending",
    securityCheck: "Not Tested",
    functionalityTest: "Not Tested",
    seo: "Not Tested",
    remarks: "No audit has been performed yet.",
    color: "#FFF3E0"
  },
  {
    id: 4,
    name: "Klassic Marketing Inc.",
    url: "URL Not Provided",
    type: "Website",
    dateAudited: null,
    status: "Pending",
    securityCheck: "Not Tested",
    functionalityTest: "Not Tested",
    seo: "Not Tested",
    remarks: "No audit has been performed yet.",
    color: "#FCE4EC"
  },
  {
    id: 5,
    name: "Westwood Development Corporation",
    url: "URL Not Provided",
    type: "Website",
    dateAudited: null,
    status: "Pending",
    securityCheck: "Not Tested",
    functionalityTest: "Not Tested",
    seo: "Not Tested",
    remarks: "No audit has been performed yet.",
    color: "#F3E5F5"
  },
  {
    id: 6,
    name: "Westwood Law Firm",
    url: "URL Not Provided",
    type: "Website",
    dateAudited: null,
    status: "Pending",
    securityCheck: "Not Tested",
    functionalityTest: "Not Tested",
    seo: "Not Tested",
    remarks: "No audit has been performed yet.",
    color: "#E0F2F1"
  },
  {
    id: 7,
    name: "The Green Oasis",
    url: "URL Not Provided",
    type: "Website",
    dateAudited: null,
    status: "Pending",
    securityCheck: "Not Tested",
    functionalityTest: "Not Tested",
    seo: "Not Tested",
    remarks: "No audit has been performed yet.",
    color: "#E8EAF6"
  },
  {
    id: 8,
    name: "The Luxurious Cleaning Co.",
    url: "URL Not Provided",
    type: "Website",
    dateAudited: null,
    status: "Pending",
    securityCheck: "Not Tested",
    functionalityTest: "Not Tested",
    seo: "Not Tested",
    remarks: "No audit has been performed yet.",
    color: "#FFF9C4"
  },
  {
    id: 9,
    name: "HYT Foundation Inc.",
    url: "URL Not Provided",
    type: "Website",
    dateAudited: null,
    status: "Pending",
    securityCheck: "Not Tested",
    functionalityTest: "Not Tested",
    seo: "Not Tested",
    remarks: "No audit has been performed yet.",
    color: "#FFEBEE"
  },
  {
    id: 10,
    name: "The Finest Fit",
    url: "URL Not Provided",
    type: "Website",
    dateAudited: null,
    status: "Pending",
    securityCheck: "Not Tested",
    functionalityTest: "Not Tested",
    seo: "Not Tested",
    remarks: "No audit has been performed yet.",
    color: "#E1F5FE"
  },
  {
    id: 11,
    name: "KLASSIC GROUP OF COMPANIES",
    url: "URL Not Provided",
    type: "Website",
    dateAudited: null,
    status: "Pending",
    securityCheck: "Not Tested",
    functionalityTest: "Not Tested",
    seo: "Not Tested",
    remarks: "No audit has been performed yet.",
    color: "#F1F8E9"
  }
];

export const statusOptions = ["Pending", "In Progress", "Passed", "Needs Review", "Failed"];
export const securityOptions = ["Not Tested", "Passed", "Warning", "Failed"];
export const functionalityOptions = ["Not Tested", "Passed", "Needs Review", "Failed"];
export const seoOptions = ["Not Tested", "Good", "Needs Improvement", "Poor"];

export const securityChecklist = [
  { id: 1, name: "HTTPS / SSL", status: "Not Tested", description: "Check if the website uses HTTPS and has a valid SSL certificate" },
  { id: 2, name: "Security Headers", status: "Not Tested", description: "Verify security headers (CSP, X-Frame-Options, etc.)" },
  { id: 3, name: "Mixed Content", status: "Not Tested", description: "Check for mixed content warnings" },
  { id: 4, name: "Broken Links", status: "Not Tested", description: "Scan for broken internal and external links" },
  { id: 5, name: "Login Security", status: "Not Tested", description: "Test login forms and authentication security" },
  { id: 6, name: "Form Security", status: "Not Tested", description: "Check form validation and CSRF protection" },
  { id: 7, name: "General Security Observations", status: "Not Tested", description: "Additional security findings" }
];

export const functionalityChecklist = [
  { id: 1, name: "Navigation", status: "Not Tested", description: "Test all navigation menus and links" },
  { id: 2, name: "Buttons", status: "Not Tested", description: "Verify all buttons work correctly" },
  { id: 3, name: "Forms", status: "Not Tested", description: "Test all forms and input validation" },
  { id: 4, name: "Links", status: "Not Tested", description: "Check all internal and external links" },
  { id: 5, name: "Contact Form", status: "Not Tested", description: "Test contact form submission" },
  { id: 6, name: "Search", status: "Not Tested", description: "Test search functionality if available" },
  { id: 7, name: "Images", status: "Not Tested", description: "Verify all images load correctly" },
  { id: 8, name: "Mobile Responsiveness", status: "Not Tested", description: "Test on various mobile devices" },
  { id: 9, name: "Interactive Elements", status: "Not Tested", description: "Test dropdowns, modals, sliders, etc." },
  { id: 10, name: "Error Handling", status: "Not Tested", description: "Test error pages and handling" }
];

export const seoChecklist = [
  { id: 1, name: "Page Title", status: "Not Tested", description: "Check for unique, descriptive page titles" },
  { id: 2, name: "Meta Description", status: "Not Tested", description: "Verify meta descriptions are present and optimized" },
  { id: 3, name: "Heading Structure", status: "Not Tested", description: "Verify proper H1-H6 hierarchy" },
  { id: 4, name: "Image Alt Text", status: "Not Tested", description: "Check all images have alt attributes" },
  { id: 5, name: "URL Structure", status: "Not Tested", description: "Check for clean, SEO-friendly URLs" },
  { id: 6, name: "Sitemap", status: "Not Tested", description: "Verify XML sitemap exists and is valid" },
  { id: 7, name: "Robots.txt", status: "Not Tested", description: "Check robots.txt configuration" },
  { id: 8, name: "Mobile Friendliness", status: "Not Tested", description: "Test mobile responsiveness for SEO" },
  { id: 9, name: "Page Performance", status: "Not Tested", description: "Check page load speed" },
  { id: 10, name: "Accessibility", status: "Not Tested", description: "Test for accessibility compliance" }
];
