import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Shield, CheckCircle, TrendingUp, FileText, MessageSquare, Play } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { formatDate } from '../utils/helpers';
import { securityChecklist, functionalityChecklist, seoChecklist } from '../data/mockData';

const WebsiteDetail = ({ websites, onStartAudit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const website = websites.find(w => w.id === parseInt(id));

  if (!website) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Website Not Found</h2>
            <Link to="/websites" className="text-blue-600 hover:text-blue-800">
              Back to Websites
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <FileText className="w-4 h-4" /> },
    { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'functionality', name: 'Functionality', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'seo', name: 'SEO', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'remarks', name: 'Remarks', icon: <MessageSquare className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/websites"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Websites
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start flex-1">
              <div 
                className="w-2 h-24 rounded-full mr-4 flex-shrink-0" 
                style={{ backgroundColor: website.color }}
              ></div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {website.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <span className="break-all">{website.url}</span>
                  {website.url !== "URL Not Provided" && (
                    <a
                      href={website.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Type: <span className="font-medium">{website.type}</span> | 
                  Last Audit: <span className="font-medium">{formatDate(website.dateAudited)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onStartAudit(website)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Play className="w-4 h-4" />
              Start Audit
            </button>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-2">Overall Status</div>
              <StatusBadge status={website.status} />
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-2">Security</div>
              <StatusBadge status={website.securityCheck} />
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-2">Functionality</div>
              <StatusBadge status={website.functionalityTest} />
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-2">SEO</div>
              <StatusBadge status={website.seo} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Website Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">Company</div>
                      <div className="font-medium text-gray-900">{website.name}</div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">Website</div>
                      <div className="font-medium text-gray-900 break-all">{website.url}</div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">Type</div>
                      <div className="font-medium text-gray-900">{website.type}</div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">Audit Date</div>
                      <div className="font-medium text-gray-900">{formatDate(website.dateAudited)}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="text-sm text-blue-700 mb-2">Overall Status</div>
                      <StatusBadge status={website.status} />
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="text-sm text-red-700 mb-2">Security Check</div>
                      <StatusBadge status={website.securityCheck} />
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="text-sm text-green-700 mb-2">Functionality Test</div>
                      <StatusBadge status={website.functionalityTest} />
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="text-sm text-purple-700 mb-2">SEO Audit</div>
                      <StatusBadge status={website.seo} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Checklist</h3>
                <div className="space-y-3">
                  {securityChecklist.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'functionality' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Functionality Checklist</h3>
                <div className="space-y-3">
                  {functionalityChecklist.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Checklist</h3>
                <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                  <div className="text-sm text-gray-600 mb-2">SEO Score</div>
                  <div className="text-3xl font-bold text-gray-900">Not Tested</div>
                </div>
                <div className="space-y-3">
                  {seoChecklist.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'remarks' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit Remarks</h3>
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-1">Status</div>
                    <StatusBadge status={website.status} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Remarks</div>
                    <p className="text-gray-900">{website.remarks}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* View Full Report Button */}
        <div className="mt-6">
          <Link
            to={`/reports/${website.id}`}
            className="block w-full sm:w-auto text-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Full Report
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WebsiteDetail;
