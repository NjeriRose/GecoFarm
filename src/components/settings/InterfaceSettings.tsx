import React, { useState } from 'react';
import { Moon, Sun, Grid, AlignLeft, AlignRight, Monitor } from 'lucide-react';

const InterfaceSettings: React.FC = () => {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');
  const [sidebarPosition, setSidebarPosition] = useState('left');
  const [dashboardLayout, setDashboardLayout] = useState({
    showCharts: true,
    showStats: true,
    showCalendar: true,
    showWeather: true,
    showTasks: true
  });
  
  const handleDashboardChange = (widget: keyof typeof dashboardLayout) => {
    setDashboardLayout({
      ...dashboardLayout,
      [widget]: !dashboardLayout[widget]
    });
  };

  return (
    <div className="space-y-8">
      {/* Theme & Appearance */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200 p-4 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">Theme & Appearance</h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Color Theme
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center justify-center p-3 rounded-md border ${
                  theme === 'light'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Sun className="h-5 w-5 mr-2" />
                <span>Light</span>
              </button>
              
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-center p-3 rounded-md border ${
                  theme === 'dark'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Moon className="h-5 w-5 mr-2" />
                <span>Dark</span>
              </button>
              
              <button
                onClick={() => setTheme('system')}
                className={`flex items-center justify-center p-3 rounded-md border ${
                  theme === 'system'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Monitor className="h-5 w-5 mr-2" />
                <span>System</span>
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700 mb-1">
              Font Size
            </label>
            <select
              id="fontSize"
              name="fontSize"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Sidebar Position
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setSidebarPosition('left')}
                className={`flex items-center justify-center p-3 rounded-md border ${
                  sidebarPosition === 'left'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <AlignLeft className="h-5 w-5 mr-2" />
                <span>Left</span>
              </button>
              
              <button
                onClick={() => setSidebarPosition('right')}
                className={`flex items-center justify-center p-3 rounded-md border ${
                  sidebarPosition === 'right'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <AlignRight className="h-5 w-5 mr-2" />
                <span>Right</span>
              </button>
              
              <button
                onClick={() => setSidebarPosition('auto')}
                className={`flex items-center justify-center p-3 rounded-md border ${
                  sidebarPosition === 'auto'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span>Auto (Responsive)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboard Layout */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200 p-4 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">Dashboard Layout Settings</h3>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-4">
            Choose which widgets to display on your dashboard.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50">
              <input
                type="checkbox"
                checked={dashboardLayout.showCharts}
                onChange={() => handleDashboardChange('showCharts')}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <div className="ml-3">
                <span className="block text-sm font-medium text-gray-900">Financial Charts</span>
                <span className="block text-xs text-gray-500">Display financial overview charts</span>
              </div>
            </label>
            
            <label className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50">
              <input
                type="checkbox"
                checked={dashboardLayout.showStats}
                onChange={() => handleDashboardChange('showStats')}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <div className="ml-3">
                <span className="block text-sm font-medium text-gray-900">Quick Stats</span>
                <span className="block text-xs text-gray-500">Display key statistics</span>
              </div>
            </label>
            
            <label className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50">
              <input
                type="checkbox"
                checked={dashboardLayout.showCalendar}
                onChange={() => handleDashboardChange('showCalendar')}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <div className="ml-3">
                <span className="block text-sm font-medium text-gray-900">Calendar</span>
                <span className="block text-xs text-gray-500">Display upcoming events calendar</span>
              </div>
            </label>
            
            <label className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50">
              <input
                type="checkbox"
                checked={dashboardLayout.showWeather}
                onChange={() => handleDashboardChange('showWeather')}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <div className="ml-3">
                <span className="block text-sm font-medium text-gray-900">Weather Widget</span>
                <span className="block text-xs text-gray-500">Display local weather information</span>
              </div>
            </label>
            
            <label className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50">
              <input
                type="checkbox"
                checked={dashboardLayout.showTasks}
                onChange={() => handleDashboardChange('showTasks')}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <div className="ml-3">
                <span className="block text-sm font-medium text-gray-900">Tasks List</span>
                <span className="block text-xs text-gray-500">Display upcoming and recent tasks</span>
              </div>
            </label>
          </div>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-1">Dashboard Preview</h4>
            <div className="bg-gray-100 border border-gray-200 rounded-md p-4 h-48 relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 flex flex-col items-center">
                <Grid className="h-6 w-6 mb-2" />
                <span className="text-sm">Dashboard Preview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Save Interface Settings
        </button>
      </div>
    </div>
  );
};

export default InterfaceSettings; 