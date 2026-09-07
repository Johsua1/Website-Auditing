import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { statusOptions, securityOptions, functionalityOptions, seoOptions } from '../data/mockData';

const StartAuditModal = ({ website, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    dateAudited: new Date().toISOString().split('T')[0],
    status: website?.status || 'Pending',
    securityCheck: website?.securityCheck || 'Not Tested',
    functionalityTest: website?.functionalityTest || 'Not Tested',
    seo: website?.seo || 'Not Tested',
    remarks: website?.remarks || ''
  });

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(website.id, formData);
    onClose();
  };

  if (!website) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Center modal */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">
              Start Audit
            </h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-6">
            {/* Website Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">{website.name}</h4>
              <p className="text-sm text-gray-600">{website.url}</p>
            </div>

            <div className="space-y-4">
              {/* Date Audited */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Audited
                </label>
                <input
                  type="date"
                  value={formData.dateAudited}
                  onChange={(e) => setFormData({ ...formData, dateAudited: e.target.value })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {statusOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Security Check */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Security Check
                </label>
                <select
                  value={formData.securityCheck}
                  onChange={(e) => setFormData({ ...formData, securityCheck: e.target.value })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {securityOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Functionality Test */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Functionality Test
                </label>
                <select
                  value={formData.functionalityTest}
                  onChange={(e) => setFormData({ ...formData, functionalityTest: e.target.value })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {functionalityOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* SEO */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SEO
                </label>
                <select
                  value={formData.seo}
                  onChange={(e) => setFormData({ ...formData, seo: e.target.value })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {seoOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Remarks
                </label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write remarks..."
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Audit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StartAuditModal;
