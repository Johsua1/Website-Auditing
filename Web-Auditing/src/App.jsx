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
          ? {
              ...w,
              ...auditData,
              dateAudited: auditData.dateAudited
            }
          : w
      )
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#0b1011] text-[#f4f6f8] relative selection:bg-[#fff800] selection:text-black">
        {/* Ambient Glow and Subtle Grid Pattern */}
        <div className="fixed inset-0 paddle-grid pointer-events-none opacity-30 z-0" />
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[360px] bg-gradient-to-b from-[#fff800]/[0.06] via-sky-500/[0.04] to-transparent blur-3xl pointer-events-none z-0" />

        <div className="relative z-10">
          <Navigation />
          
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
        </div>
      </div>
    </Router>
  );
}

export default App;

