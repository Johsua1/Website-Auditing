# Website Audit & Maintenance System

A modern, professional, responsive frontend-only website audit and maintenance dashboard built with React, Vite, Tailwind CSS, and React Router.

## 🚀 Features

### Dashboard
- **Statistics Overview**: View total websites, audited count, pending audits, and status breakdowns
- **Quick Access**: Cards showing all websites with status indicators
- **Search Functionality**: Search websites by name or URL
- **Current Quarter Display**: Shows the current quarter for tracking purposes

### Website Management
- **Complete Website List**: View all 11 company websites
- **Advanced Filtering**: Filter by status, security, functionality, SEO, and type
- **Start Audit**: Modal interface to begin auditing any website
- **Website Details**: Comprehensive detail pages with tabbed navigation

### Audit Categories

#### Security Check
- HTTPS / SSL verification
- Security headers validation
- Mixed content detection
- Broken links scan
- Login security assessment
- Form security review
- General security observations

#### Functionality Test
- Navigation testing
- Button functionality
- Form validation
- Link verification
- Contact form testing
- Search functionality
- Image loading
- Mobile responsiveness
- Interactive elements
- Error handling

#### SEO Audit
- Page title optimization
- Meta description review
- Heading structure analysis
- Image alt text verification
- URL structure evaluation
- Sitemap validation
- Robots.txt check
- Mobile friendliness
- Page performance
- Accessibility compliance

### Reporting
- **Full Audit Reports**: Comprehensive reports for each website
- **Print Functionality**: Print-friendly report layouts
- **Download Reports**: Simulated report download feature
- **Remarks & Findings**: Dedicated section for audit notes

## 🏢 Included Websites

1. **Connector** (URL Not Provided)
2. **Brains Infinite Innovations** - https://www.brains.asia/
3. **Klassic Solutions Inc.** (URL Not Provided)
4. **Klassic Marketing Inc.** (URL Not Provided)
5. **Westwood Development Corporation** (URL Not Provided)
6. **Westwood Law Firm** (URL Not Provided)
7. **The Green Oasis** (URL Not Provided)
8. **The Luxurious Cleaning Co.** (URL Not Provided)
9. **HYT Foundation Inc.** (URL Not Provided)
10. **The Finest Fit** (URL Not Provided)
11. **KLASSIC GROUP OF COMPANIES** (URL Not Provided)

## 🛠️ Technology Stack

- **React 19** - UI framework
- **Vite 8** - Build tool and dev server
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **PostCSS & Autoprefixer** - CSS processing

## 📦 Installation

```bash
# Navigate to the project directory
cd Web-Auditing

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Pages & Routes

- `/` - Dashboard (Homepage)
- `/websites` - All Websites List
- `/websites/:id` - Website Detail Page
- `/date-audited` - Audit Date Overview
- `/status` - Status Overview
- `/security` - Security Audit Overview
- `/functionality` - Functionality Test Overview
- `/seo` - SEO Audit Overview
- `/remarks` - Audit Remarks & Findings
- `/reports` - Full Reports List
- `/reports/:id` - Individual Report Detail

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:

- **Desktop** - Full navigation with complete table views
- **Tablet** - Condensed navigation with responsive tables
- **Mobile** - Hamburger menu with card-based layouts

## 🎯 Key Features

### Frontend-Only Architecture
- No backend server required
- All data stored in React state
- Mock data for demonstration
- Client-side routing with React Router

### Interactive UI
- Modal dialogs for starting audits
- Tabbed navigation on detail pages
- Filterable and searchable data tables
- Status badges with color coding
- Print-friendly report layouts

### Status Indicators
- 🟢 Passed
- 🟡 Needs Review
- 🔴 Failed
- ⚪ Pending
- 🔵 In Progress

## 🔧 Development

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Navigation.jsx
│   ├── StatusBadge.jsx
│   ├── StatCard.jsx
│   ├── SearchBar.jsx
│   ├── FilterDropdown.jsx
│   └── StartAuditModal.jsx
├── pages/              # Page components
│   ├── Dashboard.jsx
│   ├── Websites.jsx
│   ├── WebsiteDetail.jsx
│   ├── DateAudited.jsx
│   ├── Status.jsx
│   ├── Security.jsx
│   ├── Functionality.jsx
│   ├── SEO.jsx
│   ├── Remarks.jsx
│   ├── Reports.jsx
│   └── ReportDetail.jsx
├── data/               # Mock data
│   └── mockData.js
├── utils/              # Helper functions
│   └── helpers.js
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

### Available Scripts

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run oxlint

## 🎨 Design Philosophy

- **Professional Corporate Dashboard**: Clean, modern interface suitable for internal IT departments
- **Spreadsheet-Inspired**: Preserves the data structure from the original spreadsheet
- **Enhanced UX**: Modern navigation, search, filters, and interactive elements
- **Accessibility**: Semantic HTML, proper ARIA labels, keyboard navigation
- **Color-Coded**: Subtle color indicators for each website (inspired by spreadsheet)

## 🚫 Important Notes

This is a **frontend-only prototype**. The following are NOT implemented:

- ❌ Backend server
- ❌ Database
- ❌ User authentication
- ❌ Real website scanning
- ❌ Actual security testing
- ❌ Live SEO analysis
- ❌ Persistent data storage

All functionality is simulated through React state and mock data for UI/UX demonstration purposes.

## 📄 License

This project is for demonstration purposes.

## 🤝 Contributing

This is a demo project showcasing a modern web audit dashboard interface.

---

**Built with ❤️ using React + Vite + Tailwind CSS**
