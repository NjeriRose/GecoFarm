import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User, 
  Lock, 
  Bell, 
  Sun, 
  Moon, 
  Globe, 
  Info, 
  HelpCircle, 
  LogOut,
  Eye,
  EyeOff,
  Shield,
  Mail,
  MessageSquare,
  AlertCircle,
  Settings as SettingsIcon
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({
    email: {
      taskAssignments: true,
      shiftChanges: true,
      announcements: true
    },
    inApp: {
      taskUpdates: true,
      systemAlerts: true,
      messages: true
    }
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add password change logic here
    alert('Password changed successfully');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const toggleNotification = (type: 'email' | 'inApp', key: string) => {
    setNotifications(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: !prev[type][key]
      }
    }));
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <p className="mt-1 text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <p className="mt-1 text-gray-900">{user?.role.position}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                  <p className="mt-1 text-gray-900">{user?.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <p className="mt-1 text-gray-900">{user?.role.type === 'employee' ? 'Operations' : 'Management'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Profile</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                  <div className="mt-2 flex items-center">
                    <img
                      src={user?.profilePhoto}
                      alt="Profile"
                      className="h-16 w-16 rounded-full"
                    />
                    <button className="ml-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Change Photo
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="+254 123 456 789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder={user?.email}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                  <input
                    type="tel"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Emergency contact number"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'account':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Password</label>
                  <div className="mt-1 relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Change Password
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                <button
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                    twoFactorEnabled ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
              <div className="space-y-4">
                {Object.entries(notifications.email).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-sm text-gray-700">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleNotification('email', key)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                        value ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          value ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">In-App Notifications</h3>
              <div className="space-y-4">
                {Object.entries(notifications.inApp).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-sm text-gray-700">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleNotification('inApp', key)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                        value ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          value ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Theme</h3>
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
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Font Size</h3>
              <div className="flex space-x-4">
                {['small', 'medium', 'large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`px-4 py-2 rounded-md border ${
                      fontSize === size
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Language</h3>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              <option value="en">English</option>
              <option value="sw">Swahili</option>
              <option value="fr">French</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
        );

      case 'info':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">App Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Version</label>
                  <p className="mt-1 text-gray-900">v1.0.0</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Update</label>
                  <p className="mt-1 text-gray-900">2024-04-20</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">About</label>
                  <p className="mt-1 text-gray-900">
                    Geco Farm System is a comprehensive farm management solution designed to streamline
                    operations, improve productivity, and enhance communication between farm staff and
                    management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Support & Help</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <HelpCircle className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">User Guide / FAQ</span>
                </button>
                <button className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">Contact Support</span>
                </button>
                <button className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <AlertCircle className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">Report a Bug</span>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveSection('profile')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeSection === 'profile'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User className="mr-3 h-5 w-5" />
                Profile Management
              </button>
              <button
                onClick={() => setActiveSection('account')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeSection === 'account'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Lock className="mr-3 h-5 w-5" />
                Account Settings
              </button>
              <button
                onClick={() => setActiveSection('notifications')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeSection === 'notifications'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Bell className="mr-3 h-5 w-5" />
                Notifications
              </button>
              <button
                onClick={() => setActiveSection('appearance')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeSection === 'appearance'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Sun className="mr-3 h-5 w-5" />
                Theme & Appearance
              </button>
              <button
                onClick={() => setActiveSection('language')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeSection === 'language'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Globe className="mr-3 h-5 w-5" />
                Language
              </button>
              <button
                onClick={() => setActiveSection('info')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeSection === 'info'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Info className="mr-3 h-5 w-5" />
                App Info
              </button>
              <button
                onClick={() => setActiveSection('support')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeSection === 'support'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <HelpCircle className="mr-3 h-5 w-5" />
                Support & Help
              </button>
              <button
                onClick={logout}
                className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 