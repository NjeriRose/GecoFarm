import React, { useState } from 'react';
import { User, Lock, Settings, Users, Bell, Monitor, Globe, Info, HelpCircle, LogOut } from 'lucide-react';
import ProfileSettings from '../../components/settings/ProfileSettings';
import SecuritySettings from '../../components/settings/SecuritySettings';
import SystemSettings from '../../components/settings/SystemSettings';
import UserRoleSettings from '../../components/settings/UserRoleSettings';
import NotificationSettings from '../../components/settings/NotificationSettings';
import InterfaceSettings from '../../components/settings/InterfaceSettings';
import RegionalSettings from '../../components/settings/RegionalSettings';
import SystemInfoSettings from '../../components/settings/SystemInfoSettings';
import SupportSettings from '../../components/settings/SupportSettings';
import SessionSettings from '../../components/settings/SessionSettings';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'security', label: 'Security', icon: <Lock size={18} /> },
    { id: 'system', label: 'System', icon: <Settings size={18} /> },
    { id: 'users', label: 'Users & Roles', icon: <Users size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'interface', label: 'Interface', icon: <Monitor size={18} /> },
    { id: 'regional', label: 'Regional', icon: <Globe size={18} /> },
    { id: 'info', label: 'System Info', icon: <Info size={18} /> },
    { id: 'support', label: 'Support', icon: <HelpCircle size={18} /> },
    { id: 'session', label: 'Session', icon: <LogOut size={18} /> },
  ];
  
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'system':
        return <SystemSettings />;
      case 'users':
        return <UserRoleSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'interface':
        return <InterfaceSettings />;
      case 'regional':
        return <RegionalSettings />;
      case 'info':
        return <SystemInfoSettings />;
      case 'support':
        return <SupportSettings />;
      case 'session':
        return <SessionSettings />;
      default:
        return <ProfileSettings />;
    }
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your profile and system preferences</p>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-64 border-b md:border-b-0 md:border-r border-gray-200">
            <nav className="p-4">
              <ul className="space-y-1">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                        activeTab === tab.id
                          ? 'bg-green-100 text-green-900'
                          : 'text-gray-700 hover:bg-green-50'
                      }`}
                    >
                      <span className={`mr-3 ${activeTab === tab.id ? 'text-green-700' : 'text-gray-500'}`}>
                        {tab.icon}
                      </span>
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 