import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import StartAuditModal from "./components/StartAuditModal";
import Dashboard from "./pages/Dashboard";
import Websites from "./pages/Websites";
import WebsiteDetail from "./pages/WebsiteDetail";
import DateAudited from "./pages/DateAudited";
import Status from "./pages/Status";
import Security from "./pages/Security";
import Functionality from "./pages/Functionality";
import SEO from "./pages/SEO";
import Remarks from "./pages/Remarks";
import Reports from "./pages/Reports";
import ReportDetail from "./pages/ReportDetail";
import { websites as initialWebsites } from "./data/mockData";

function App() {
  const [websites, setWebsites] = useState(initialWebsites);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(null);

  const handleStartAudit = (website) => {
    const inProgressWebsite = { ...website, status: "In Progress" };
    setWebsites((prevWebsites) =>
      prevWebsites.map((currentWebsite) =>
        currentWebsite.id === website.id
          ? { ...currentWebsite, status: "In Progress" }
          : currentWebsite,
      ),
    );
    setSelectedWebsite(inProgressWebsite);
    setShowAuditModal(true);
  };

  const handleSaveAudit = (websiteId, auditData) => {
    setWebsites((prevWebsites) =>
      prevWebsites.map((w) =>
        w.id === websiteId
          ? {
              ...w,
              ...auditData,
              dateAudited: auditData.dateAudited,
            }
          : w,
      ),
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <Routes>
          <Route path="/" element={<Dashboard websites={websites} />} />
          <Route
            path="/websites"
            element={
              <Websites websites={websites} onStartAudit={handleStartAudit} />
            }
          />
          <Route
            path="/websites/:id"
            element={
              <WebsiteDetail
                websites={websites}
                onStartAudit={handleStartAudit}
              />
            }
          />
          <Route
            path="/date-audited"
            element={<DateAudited websites={websites} />}
          />
          <Route path="/status" element={<Status websites={websites} />} />
          <Route path="/security" element={<Security websites={websites} />} />
          <Route
            path="/functionality"
            element={<Functionality websites={websites} />}
          />
          <Route path="/seo" element={<SEO websites={websites} />} />
          <Route path="/remarks" element={<Remarks websites={websites} />} />
          <Route path="/reports" element={<Reports websites={websites} />} />
          <Route
            path="/reports/:id"
            element={<ReportDetail websites={websites} />}
          />
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
    </Router>
  );
}

export default App;
