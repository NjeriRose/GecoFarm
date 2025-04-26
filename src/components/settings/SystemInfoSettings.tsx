import React from 'react';
import { Info, Heart, Settings } from 'lucide-react';

const SystemInfoSettings: React.FC = () => {
  // Sample system information
  const systemInfo = {
    version: 'v1.0.0',
    buildDate: '2025-03-15',
    lastUpdate: '2025-04-10',
    environment: 'Production',
    databaseVersion: '12.4',
    frontendFramework: 'React 18.2.0',
    serverRuntime: 'Node.js 18.15.0',
    developer: {
      name: 'Geco Farm Systems',
      website: 'https://gecofarm.com',
      email: 'support@gecofarm.com',
      phone: '+254 123 456 789'
    }
  };

  return (
    <div className="space-y-8">
      {/* Version Info */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6 flex items-center">
          <Info className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">App Version Information</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Version</dt>
              <dd className="mt-1 text-sm text-gray-900">{systemInfo.version}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Build Date</dt>
              <dd className="mt-1 text-sm text-gray-900">{new Date(systemInfo.buildDate).toLocaleDateString()}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
              <dd className="mt-1 text-sm text-gray-900">{new Date(systemInfo.lastUpdate).toLocaleDateString()}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Environment</dt>
              <dd className="mt-1 text-sm text-gray-900">{systemInfo.environment}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Database Version</dt>
              <dd className="mt-1 text-sm text-gray-900">{systemInfo.databaseVersion}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Frontend Framework</dt>
              <dd className="mt-1 text-sm text-gray-900">{systemInfo.frontendFramework}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Server Runtime</dt>
              <dd className="mt-1 text-sm text-gray-900">{systemInfo.serverRuntime}</dd>
            </div>
          </dl>
        </div>
      </div>
      
      {/* About Geco Farm System */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6 flex items-center">
          <Heart className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">About Geco Farm System</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <p className="text-sm text-gray-500 mb-4">
            Geco Farm System is a comprehensive farm management solution designed to help farmers manage their crops, 
            livestock, finances, and operations efficiently. With powerful tools for tracking farm activities, 
            monitoring growth, and generating reports, Geco Farm System empowers farmers to make data-driven decisions.
          </p>
          
          <p className="text-sm text-gray-500">
            © 2025 Geco Farm Systems. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Developer Information */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6 flex items-center">
          <Settings className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Developer Information</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Developer</dt>
              <dd className="mt-1 text-sm text-gray-900">{systemInfo.developer.name}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Website</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <a 
                  href={systemInfo.developer.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-500"
                >
                  {systemInfo.developer.website.replace('https://', '')}
                </a>
              </dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Support Email</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <a 
                  href={`mailto:${systemInfo.developer.email}`}
                  className="text-green-600 hover:text-green-500"
                >
                  {systemInfo.developer.email}
                </a>
              </dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Support Phone</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <a 
                  href={`tel:${systemInfo.developer.phone.replace(/\s+/g, '')}`}
                  className="text-green-600 hover:text-green-500"
                >
                  {systemInfo.developer.phone}
                </a>
              </dd>
            </div>
          </dl>
          
          <div className="mt-6 flex">
            <a 
              href="#" 
              className="text-sm text-green-600 hover:text-green-500"
            >
              View License Agreement
            </a>
            <span className="mx-2 text-gray-500">•</span>
            <a 
              href="#" 
              className="text-sm text-green-600 hover:text-green-500"
            >
              Privacy Policy
            </a>
            <span className="mx-2 text-gray-500">•</span>
            <a 
              href="#" 
              className="text-sm text-green-600 hover:text-green-500"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md text-center text-sm text-gray-500">
        This installation of Geco Farm System is licensed to ABC Farms Ltd.
      </div>
    </div>
  );
};

export default SystemInfoSettings; 