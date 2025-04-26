import React, { useState } from 'react';
import { Mail, MessageSquare, Bell } from 'lucide-react';

const NotificationSettings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    systemAlerts: true,
    taskUpdates: true,
    financialAlerts: true
  });
  
  const [inAppNotifications, setInAppNotifications] = useState({
    newUserRegistrations: true,
    pendingApprovals: true,
    activityLogs: false
  });
  
  const [smsNotifications, setSmsNotifications] = useState({
    enabled: false,
    lowInventoryAlerts: true,
    emergencyAlerts: true,
    phoneNumber: '+1234567890'
  });
  
  const handleEmailChange = (setting: keyof typeof emailNotifications) => {
    setEmailNotifications({
      ...emailNotifications,
      [setting]: !emailNotifications[setting]
    });
  };
  
  const handleInAppChange = (setting: keyof typeof inAppNotifications) => {
    setInAppNotifications({
      ...inAppNotifications,
      [setting]: !inAppNotifications[setting]
    });
  };
  
  const handleSMSChange = (setting: keyof typeof smsNotifications) => {
    if (setting === 'enabled') {
      setSmsNotifications({
        ...smsNotifications,
        [setting]: !smsNotifications[setting]
      });
    } else {
      setSmsNotifications({
        ...smsNotifications,
        [setting]: !smsNotifications[setting]
      });
    }
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSmsNotifications({
      ...smsNotifications,
      phoneNumber: e.target.value
    });
  };

  return (
    <div className="space-y-8">
      {/* Email Notifications */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6 flex items-center">
          <Mail className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <p className="text-sm text-gray-500 mb-4">
            Configure which email notifications you want to receive.
          </p>
          
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={emailNotifications.systemAlerts}
                onChange={() => handleEmailChange('systemAlerts')}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">System Alerts (e.g., database errors)</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={emailNotifications.taskUpdates}
                onChange={() => handleEmailChange('taskUpdates')}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">Task Updates and Completions</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={emailNotifications.financialAlerts}
                onChange={() => handleEmailChange('financialAlerts')}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">Financial Thresholds/Alerts</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* In-App Notifications */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6 flex items-center">
          <Bell className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">In-App Notifications</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <p className="text-sm text-gray-500 mb-4">
            Configure notifications that appear within the application.
          </p>
          
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={inAppNotifications.newUserRegistrations}
                onChange={() => handleInAppChange('newUserRegistrations')}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">New User Registrations</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={inAppNotifications.pendingApprovals}
                onChange={() => handleInAppChange('pendingApprovals')}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">Pending Approvals or Issues</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={inAppNotifications.activityLogs}
                onChange={() => handleInAppChange('activityLogs')}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">Activity Logs from Employees</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* SMS Notifications */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6 flex items-center">
          <MessageSquare className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">SMS Alerts (Optional)</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-base font-medium text-gray-900">Enable SMS Notifications</h4>
              <p className="mt-1 text-sm text-gray-500">
                Receive critical alerts via SMS for time-sensitive issues
              </p>
            </div>
            <div>
              <button
                onClick={() => handleSMSChange('enabled')}
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                  smsNotifications.enabled ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                    smsNotifications.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
          
          {smsNotifications.enabled && (
            <div className="space-y-4">
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number for SMS
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={smsNotifications.phoneNumber}
                  onChange={handlePhoneChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <h4 className="text-sm font-medium text-gray-900 mt-4">SMS Alert Types</h4>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={smsNotifications.lowInventoryAlerts}
                  onChange={() => handleSMSChange('lowInventoryAlerts')}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">Low Inventory Alerts</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={smsNotifications.emergencyAlerts}
                  onChange={() => handleSMSChange('emergencyAlerts')}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">Emergency Alerts</span>
              </label>
              
              <p className="text-xs text-gray-500 mt-2">
                Standard SMS rates may apply based on your carrier.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Save Notification Settings
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings; 