import React, { useState } from 'react';
import { LogOut, Clock } from 'lucide-react';

const SessionSettings: React.FC = () => {
  const [autoLogoutTime, setAutoLogoutTime] = useState(30); // minutes
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleLogout = () => {
    setShowConfirmation(true);
  };
  
  const confirmLogout = () => {
    // In a real app, this would trigger an auth logout
    alert('Logging out...');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="space-y-8">
      {/* Logout */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6 flex items-center">
          <LogOut className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Logout Securely</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <p className="text-sm text-gray-500 mb-4">
            Ensure you securely log out when you're done with your session, especially on shared computers.
          </p>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
          >
            <LogOut size={16} className="mr-2" />
            Logout Now
          </button>
        </div>
      </div>
      
      {/* Auto-Logout Settings */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6 flex items-center">
          <Clock className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Auto-Logout Settings</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <p className="text-sm text-gray-500 mb-4">
            Configure automatic logout for inactive sessions to improve security.
          </p>
          
          <div className="max-w-md">
            <label htmlFor="timeoutDuration" className="block text-sm font-medium text-gray-700 mb-1">
              Auto-Logout After Inactivity (minutes)
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="number"
                min="5"
                max="120"
                step="5"
                id="timeoutDuration"
                value={autoLogoutTime}
                onChange={(e) => setAutoLogoutTime(parseInt(e.target.value))}
                className="flex-1 border-gray-300 rounded-l-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
              />
              <span className="inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                minutes
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Your session will automatically timeout after the specified period of inactivity.
            </p>
          </div>
          
          <div className="mt-6 space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Current Session Information</h4>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium text-gray-500">Session Started</dt>
                <dd className="mt-1 text-sm text-gray-900">{new Date().toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500">Expiry</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(Date.now() + autoLogoutTime * 60 * 1000).toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500">IP Address</dt>
                <dd className="mt-1 text-sm text-gray-900">192.168.1.101</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500">Device</dt>
                <dd className="mt-1 text-sm text-gray-900">Chrome on Windows</dd>
              </div>
            </dl>
          </div>
          
          <div className="mt-4 flex">
            <button
              type="button"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save Auto-Logout Settings
            </button>
          </div>
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Logout</h3>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to log out? Any unsaved changes will be lost.
              </p>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionSettings; 