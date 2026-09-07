import { Link } from 'react-router-dom';
import { Shield, Lock, AlertTriangle, CheckCircle } from 'lucide-react';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { securityChecklist } from '../data/mockData';

const Security = ({ websites }) => {
  const securityStats = {
    passed: websites.filter(w => w.securityCheck === "Passed").length,
    warning: websites.filter(w => w.securityCheck === "Warning").length,
    failed: websites.filter(w => w.securityCheck === "Failed").length,
    notTested: websites.filter(w => w.securityCheck === "Not Tested").length
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Audit Overview</h1>
          <p className="text-gray-600">
            Monitor security compliance and vulnerabilities across all websites
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Passed" 
            value={securityStats.passed} 
            color="green"
            icon={<CheckCircle className="w-8 h-8" />}
          />
          <StatCard 
            title="Warning" 
            value={securityStats.warning} 
            color="yellow"
            icon={<AlertTriangle className="w-8 h-8" />}
          />
          <StatCard 
            title="Failed" 
            value={securityStats.failed} 
            color="red"
            icon={<Shield className="w-8 h-8" />}
          />
          <StatCard 
            title="Not Tested" 
            value={securityStats.notTested} 
            color="gray"
            icon={<Lock className="w-8 h-8" />}
          />
        </div>

        {/* Security Checklist Reference */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Security Checklist Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securityChecklist.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <Shield className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Websites Security Status */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Website Security Status</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Security Result
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Overall Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {websites.map((website) => (
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
                          <div className="text-sm text-gray-500">
                            {website.url}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={website.securityCheck} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={website.status} showIcon={false} />
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
        </div>
      </div>
    </div>
  );
};

export default Security;
