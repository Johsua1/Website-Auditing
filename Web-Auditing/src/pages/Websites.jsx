import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Eye, Play, X } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import StatusBadge from '../components/StatusBadge';
import { filterWebsites } from '../utils/helpers';
import { statusOptions, securityOptions, functionalityOptions, seoOptions } from '../data/mockData';

const Websites = ({ websites, onStartAudit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'All',
    security: 'All',
    functionality: 'All',
    seo: 'All',
    type: 'All'
  });

  const filteredWebsiteList = filterWebsites(websites, searchTerm, filters);

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      status: 'All',
      security: 'All',
      functionality: 'All',
      seo: 'All',
      type: 'All'
    });
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some(f => f !== 'All');

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Websites</h1>
          <p className="text-gray-600">
            Manage and monitor all company websites in one place
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-4">
            <SearchBar 
              value={searchTerm} 
              onChange={setSearchTerm}
              placeholder="Search by website name or URL..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <FilterDropdown
              label="Status"
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
              options={statusOptions}
            />
            <FilterDropdown
              label="Security"
              value={filters.security}
              onChange={(value) => setFilters({ ...filters, security: value })}
              options={securityOptions}
            />
            <FilterDropdown
              label="Functionality"
              value={filters.functionality}
              onChange={(value) => setFilters({ ...filters, functionality: value })}
              options={functionalityOptions}
            />
            <FilterDropdown
              label="SEO"
              value={filters.seo}
              onChange={(value) => setFilters({ ...filters, seo: value })}
              options={seoOptions}
            />
            <FilterDropdown
              label="Type"
              value={filters.type}
              onChange={(value) => setFilters({ ...filters, type: value })}
              options={['Website', 'System', 'Portal']}
            />
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredWebsiteList.length} of {websites.length} websites
          </div>
        </div>

        {/* Websites Grid/Table */}
        <div className="grid grid-cols-1 gap-4">
          {filteredWebsiteList.map((website) => (
            <div 
              key={website.id} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start flex-1">
                    <div 
                      className="w-1 h-16 rounded-full mr-4 flex-shrink-0" 
                      style={{ backgroundColor: website.color }}
                    ></div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {website.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="break-all">{website.url}</span>
                        {website.url !== "URL Not Provided" && (
                          <a
                            href={website.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        Type: <span className="font-medium">{website.type}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Status</div>
                    <StatusBadge status={website.status} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Security</div>
                    <StatusBadge status={website.securityCheck} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Functionality</div>
                    <StatusBadge status={website.functionalityTest} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">SEO</div>
                    <StatusBadge status={website.seo} />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to={`/websites/${website.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Link>
                  <button
                    onClick={() => onStartAudit(website)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Start Audit
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredWebsiteList.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">No websites found matching your criteria</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Websites;
