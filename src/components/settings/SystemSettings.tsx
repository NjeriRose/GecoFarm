import React, { useState } from 'react';
import { Calendar, Download, Upload, Save } from 'lucide-react';

const SystemSettings: React.FC = () => {
  // Sample system preferences
  const [preferences, setPreferences] = useState({
    seasonName: 'Planting Season 2025',
    seasonStart: '2025-02-01',
    seasonEnd: '2025-08-31',
    timeZone: 'Africa/Nairobi',
    dateFormat: 'MM/DD/YYYY',
    defaultDepartment: 'General Management',
    theme: 'light',
    primaryColor: '#15803d' // green-700
  });
  
  // Backup preferences
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: 'weekly',
    lastBackup: '2025-04-15T08:30:00'
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value
    });
  };
  
  const handleBackupSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'autoBackup') {
      setBackupSettings({
        ...backupSettings,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else {
      setBackupSettings({
        ...backupSettings,
        [name]: value
      });
    }
  };
  
  const handleManualBackup = () => {
    // In a real app, this would trigger a database backup
    alert('Manual backup initiated');
    setBackupSettings({
      ...backupSettings,
      lastBackup: new Date().toISOString()
    });
  };

  return (
    <div className="space-y-8">
      {/* System Preferences */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200 p-4 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">System Preferences</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="seasonName" className="block text-sm font-medium text-gray-700 mb-1">
                Current Season Name
              </label>
              <input
                type="text"
                id="seasonName"
                name="seasonName"
                value={preferences.seasonName}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
              />
            </div>
            
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="seasonStart" className="block text-sm font-medium text-gray-700 mb-1">
                  Season Start
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="seasonStart"
                    name="seasonStart"
                    value={preferences.seasonStart}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border pl-10 px-3 py-2"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <label htmlFor="seasonEnd" className="block text-sm font-medium text-gray-700 mb-1">
                  Season End
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="seasonEnd"
                    name="seasonEnd"
                    value={preferences.seasonEnd}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border pl-10 px-3 py-2"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="timeZone" className="block text-sm font-medium text-gray-700 mb-1">
                Time Zone
              </label>
              <select
                id="timeZone"
                name="timeZone"
                value={preferences.timeZone}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
              >
                <option value="Africa/Nairobi">East Africa Time (EAT / UTC+3)</option>
                <option value="Africa/Lagos">West Africa Time (WAT / UTC+1)</option>
                <option value="Africa/Cairo">Eastern European Time (EET / UTC+2)</option>
                <option value="Africa/Johannesburg">South Africa Standard Time (SAST / UTC+2)</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-1">
                Date Format
              </label>
              <select
                id="dateFormat"
                name="dateFormat"
                value={preferences.dateFormat}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="defaultDepartment" className="block text-sm font-medium text-gray-700 mb-1">
                Default Department Visibility
              </label>
              <select
                id="defaultDepartment"
                name="defaultDepartment"
                value={preferences.defaultDepartment}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
              >
                <option value="General Management">General Management</option>
                <option value="Crop Management">Crop Management</option>
                <option value="Livestock Management">Livestock Management</option>
                <option value="Finance">Finance</option>
                <option value="all">All Departments</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                System Theme
              </label>
              <select
                id="theme"
                name="theme"
                value={preferences.theme}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 mb-1">
                Primary Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  id="primaryColor"
                  name="primaryColor"
                  value={preferences.primaryColor}
                  onChange={handleInputChange}
                  className="h-10 w-10 border-0 p-0"
                />
                <input
                  type="text"
                  value={preferences.primaryColor}
                  onChange={handleInputChange}
                  name="primaryColor"
                  className="flex-grow border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center">
              <Save size={16} className="mr-2" />
              Save Preferences
            </button>
          </div>
        </div>
      </div>
      
      {/* Data Management */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200 p-4 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">Data Management</h3>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-base font-medium text-gray-900 mb-2">Database Backup</h4>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
              <div>
                <p className="text-sm text-gray-700">Last backup: {new Date(backupSettings.lastBackup).toLocaleString()}</p>
                <div className="mt-2 flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="autoBackup"
                      checked={backupSettings.autoBackup}
                      onChange={handleBackupSettingsChange}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Auto-backup</span>
                  </label>
                  
                  {backupSettings.autoBackup && (
                    <select
                      name="backupFrequency"
                      value={backupSettings.backupFrequency}
                      onChange={handleBackupSettingsChange}
                      className="ml-4 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm border px-3 py-1"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  )}
                </div>
              </div>
              
              <button
                onClick={handleManualBackup}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Save size={16} className="mr-2" />
                Manual Backup
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-base font-medium text-gray-900 mb-4">Import/Export Data</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-md p-4">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Export Data</h5>
                <p className="text-xs text-gray-500 mb-4">
                  Export your system data to a CSV or PDF file for backup or analysis.
                </p>
                <div className="space-y-2">
                  <button className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                    <Download size={16} className="mr-2" />
                    Export Tasks Data (CSV)
                  </button>
                  <button className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                    <Download size={16} className="mr-2" />
                    Export User Data (CSV)
                  </button>
                  <button className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                    <Download size={16} className="mr-2" />
                    Export Financial Reports (PDF)
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Import Data</h5>
                <p className="text-xs text-gray-500 mb-4">
                  Import data from CSV files to update or restore your system.
                </p>
                <div className="space-y-2">
                  <label className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer">
                    <Upload size={16} className="mr-2" />
                    Import Tasks Data (CSV)
                    <input type="file" accept=".csv" className="hidden" />
                  </label>
                  <label className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer">
                    <Upload size={16} className="mr-2" />
                    Import User Data (CSV)
                    <input type="file" accept=".csv" className="hidden" />
                  </label>
                  <label className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center cursor-pointer">
                    <Upload size={16} className="mr-2" />
                    Bulk Import Products (CSV)
                    <input type="file" accept=".csv" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings; 