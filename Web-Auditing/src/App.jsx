import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import StartAuditModal from './components/StartAuditModal';
import Dashboard from './pages/Dashboard';
import Websites from './pages/Websites';
import WebsiteDetail from './pages/WebsiteDetail';
import DateAudited from './pages/DateAudited';
import Status from './pages/Status';
import Security from './pages/Security';
import Functionality from './pages/Functionality';
import SEO from './pages/SEO';
import Remarks from './pages/Remarks';
import Reports from './pages/Reports';
import ReportDetail from './pages/ReportDetail';
import { websites as initialWebsites } from './data/mockData';

function App() {
  const [websites, setWebsites] = useState(initialWebsites);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(null);

  const handleStartAudit = (website) => {
    setSelectedWebsite(website);
    setShowAuditModal(true);
  };

  const handleSaveAudit = (websiteId, auditData) => {
    setWebsites(prevWebsites =>
      prevWebsites.map(w =>
        w.id === websiteId
          ? { ...w, ...auditData, dateAudited: auditData.dateAudited }
          : w
      )
    );
  };

  return (
    <Router>
      {/* Background effects */}
      <div className="grain-overlay" aria-hidden="true" />
      <div className="bg-glow-green" aria-hidden="true" />
      <div className="bg-glow-teal" aria-hidden="true" />

      <Navigation />

      {/* Main content — offset by sidebar on desktop */}
      <div className="relative z-10 lg:pl-64">
        {/* Mobile top-bar spacer */}
        <div className="h-14 lg:h-0" />

        <Routes>
          <Route path="/" element={<Dashboard websites={websites} />} />
          <Route
            path="/websites"
            element={<Websites websites={websites} onStartAudit={handleStartAudit} />}
          />
          <Route
            path="/websites/:id"
            element={<WebsiteDetail websites={websites} onStartAudit={handleStartAudit} />}
          />
          <Route path="/date-audited" element={<DateAudited websites={websites} />} />
          <Route path="/status" element={<Status websites={websites} />} />
          <Route path="/security" element={<Security websites={websites} />} />
          <Route path="/functionality" element={<Functionality websites={websites} />} />
          <Route path="/seo" element={<SEO websites={websites} />} />
          <Route path="/remarks" element={<Remarks websites={websites} />} />
          <Route path="/reports" element={<Reports websites={websites} />} />
          <Route path="/reports/:id" element={<ReportDetail websites={websites} />} />
        </Routes>
      </div>

      {showAuditModal && (
        <StartAuditModal
          website={selectedWebsite}
          onClose={() => {
            setShowAuditModal(false);
            setSelectedWebsite(null);
          }}
          onSave={handleSaveAudit}
        />
      )}
    </Router>
  );
}

export default App;
