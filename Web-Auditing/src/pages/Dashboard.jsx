import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Shield, CheckCircle, Search as SearchIcon, TrendingUp, FileText, ExternalLink, Eye } from 'lucide-react';
import StatCard from '../components/StatCard';
import SearchBar from '../components/SearchBar';
import StatusBadge from '../components/StatusBadge';
import { getStatistics, getCurrentQuarter, filterWebsites } from '../utils/helpers';

const Dashboard = ({ websites }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(null);
  const stats = getStatistics(websites);
  const quarter = getCurrentQuarter();
  
  // Apply filters
  let filteredWebsites = websites;
  
  // Apply search filter
  if (searchTerm) {
    filteredWebsites = filteredWebsites.filter(w => 
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.url.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // Apply status filter from stat cards
  if (selectedFilter) {
    switch(selectedFilter) {
      case 'audited':
        filteredWebsites = filteredWebsites.filter(w => w.dateAudited !== null);
        break;
      case 'pending':
        filteredWebsites = filteredWebsites.filter(w => w.status === 'Pending');
        break;
      case 'passed':
        filteredWebsites = filteredWebsites.filter(w => w.status === 'Passed');
        break;
      case 'needsReview':
        filteredWebsites = filteredWebsites.filter(w => w.status === 'Needs Review');
        break;
      case 'failed':
        filteredWebsites = filteredWebsites.filter(w => w.status === 'Failed');
        break;
      default:
        break;
    }
  }
  
  const handleFilterClick = (filter) => {
    setSelectedFilter(selectedFilter === filter ? null : filter);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Website Audit & Maintenance
            </h1>
            <div className="text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200">
              {quarter}
            </div>
          </div>
          <p className="text-gray-600">
            Monitor, audit, and maintain company websites efficiently.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar 
            value={searchTerm} 
            onChange={setSearchTerm}
            placeholder="Search websites..."
          />
          {selectedFilter && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-600">Filtered by:</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {selectedFilter === 'audited' && 'Audited'}
                {selectedFilter === 'pending' && 'Pending'}
                {selectedFilter === 'passed' && 'Passed'}
                {selectedFilter === 'needsReview' && 'Needs Review'}
                {selectedFilter === 'failed' && 'Failed'}
              </span>
              <button
                onClick={() => setSelectedFilter(null)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <div onClick={() => setSelectedFilter(null)}>
            <StatCard 
              title="Total Websites" 
              value={stats.total} 
              color="blue"
              icon={<Globe className="w-8 h-8" />}
              isActive={selectedFilter === null}
              clickable={false}
            />
          </div>
          <div onClick={() => handleFilterClick('audited')} className="cursor-pointer">
            <StatCard 
              title="Audited" 
              value={stats.audited} 
              color="purple"
              icon={<CheckCircle className="w-8 h-8" />}
              isActive={selectedFilter === 'audited'}
              clickable={true}
            />
          </div>
          <div onClick={() => handleFilterClick('pending')} className="cursor-pointer">
            <StatCard 
              title="Pending" 
              value={stats.pending} 
              color="gray"
              icon={<FileText className="w-8 h-8" />}
              isActive={selectedFilter === 'pending'}
              clickable={true}
            />
          </div>
          <div onClick={() => handleFilterClick('passed')} className="cursor-pointer">
            <StatCard 
              title="Passed" 
              value={stats.passed} 
              color="green"
              icon={<CheckCircle className="w-8 h-8" />}
              isActive={selectedFilter === 'passed'}
              clickable={true}
            />
          </div>
          <div onClick={() => handleFilterClick('needsReview')} className="cursor-pointer">
            <StatCard 
              title="Needs Review" 
              value={stats.needsReview} 
              color="yellow"
              icon={<Eye className="w-8 h-8" />}
              isActive={selectedFilter === 'needsReview'}
              clickable={true}
            />
          </div>
          <div onClick={() => handleFilterClick('failed')} className="cursor-pointer">
            <StatCard 
              title="Failed" 
              value={stats.failed} 
              color="red"
              icon={<Shield className="w-8 h-8" />}
              isActive={selectedFilter === 'failed'}
              clickable={true}
            />
          </div>
        </div>

        {/* Recent Websites Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Website Overview</h2>
            <span className="text-sm text-gray-600">
              Showing {filteredWebsites.length} of {websites.length} websites
            </span>
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Website/System
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Security
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Functionality
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SEO
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredWebsites.map((website) => (
                  <tr key={website.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div 
                          className="w-1 h-12 rounded-full mr-3" 
                          style={{ backgroundColor: website.color }}
                        ></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {website.name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            {website.url}
                            {website.url !== "URL Not Provided" && (
                              <a
                                href={website.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={website.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={website.securityCheck} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={website.functionalityTest} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={website.seo} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        to={`/websites/${website.id}`}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden">
            {filteredWebsites.map((website) => (
              <div key={website.id} className="border-b border-gray-200 p-4 hover:bg-gray-50">
                <div className="flex items-start mb-3">
                  <div 
                    className="w-1 h-16 rounded-full mr-3 flex-shrink-0" 
                    style={{ backgroundColor: website.color }}
                  ></div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{website.name}</h3>
                    <p className="text-sm text-gray-500 break-all">{website.url}</p>
                    {website.url !== "URL Not Provided" && (
                      <a
                        href={website.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 mt-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Open Website
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status:</span>
                    <StatusBadge status={website.status} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Security:</span>
                    <StatusBadge status={website.securityCheck} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Functionality:</span>
                    <StatusBadge status={website.functionalityTest} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">SEO:</span>
                    <StatusBadge status={website.seo} />
                  </div>
                </div>
                
                <Link
                  to={`/websites/${website.id}`}
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/websites" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <Globe className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">All Websites</h3>
            <p className="text-sm text-gray-600">View and manage all websites</p>
          </Link>
          
          <Link to="/security" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <Shield className="w-8 h-8 text-red-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Security Audit</h3>
            <p className="text-sm text-gray-600">Check security compliance</p>
          </Link>
          
          <Link to="/seo" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">SEO Analysis</h3>
            <p className="text-sm text-gray-600">Optimize search rankings</p>
          </Link>
          
          <Link to="/reports" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <FileText className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Full Reports</h3>
            <p className="text-sm text-gray-600">Comprehensive audit reports</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
