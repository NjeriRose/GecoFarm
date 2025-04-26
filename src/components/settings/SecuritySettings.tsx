import React, { useState } from 'react';
import { Eye, EyeOff, Shield, LogOut } from 'lucide-react';

const SecuritySettings: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Sample login session data
  const loginSessions = [
    {
      id: 1,
      device: 'Chrome on Windows',
      ip: '192.168.1.101',
      location: 'Nairobi, Kenya',
      time: '2025-04-20T10:30:00',
      current: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      ip: '192.168.1.105',
      location: 'Nairobi, Kenya',
      time: '2025-04-19T14:45:00',
      current: false
    },
    {
      id: 3,
      device: 'Chrome on Android',
      ip: '192.168.1.110',
      location: 'Nairobi, Kenya',
      time: '2025-04-18T08:15:00',
      current: false
    }
  ];
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value
    });
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Password validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    // Handle password change logic here
    alert('Password changed successfully');
    
    // Reset form
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  const toggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // In a real app, this would trigger 2FA setup flow
  };
  
  const handleLogoutSession = (sessionId: number) => {
    // In a real app, this would trigger an API call to log out that session
    alert(`Logged out session ${sessionId}`);
  };

  return (
    <div className="space-y-8">
      {/* Change Password */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200 p-4 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
        </div>
        <div className="p-6">
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2 pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2 pr-10"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
              </p>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2 pr-10"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200 p-4 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication (2FA)</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-medium text-gray-900">
                {twoFactorEnabled ? 'Two-factor authentication is enabled' : 'Enable two-factor authentication'}
              </h4>
              <p className="mt-1 text-sm text-gray-500">
                Add an extra layer of security to your account by requiring a verification code each time you log in.
              </p>
            </div>
            <div className="flex items-center">
              <button
                onClick={toggle2FA}
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                  twoFactorEnabled ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                    twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
          
          {twoFactorEnabled && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Verification Method</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="radio" name="2fa-method" value="sms" className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Text message (SMS)</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="2fa-method" value="email" className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500" />
                  <span className="ml-2 text-sm text-gray-700">Email</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="2fa-method" value="app" className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500" />
                  <span className="ml-2 text-sm text-gray-700">Authentication app</span>
                </label>
              </div>
              
              <div className="mt-4">
                <button className="text-sm text-green-600 hover:text-green-500">
                  Reset 2FA Method
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Login Activity */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200 p-4 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">Login Activity</h3>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-4">
            Here are the devices that have logged into your account. Revoke any sessions that you do not recognize.
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loginSessions.map((session) => (
                  <tr key={session.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Shield size={16} className={session.current ? 'text-green-500' : 'text-gray-400'} />
                        <span className="ml-2 text-sm text-gray-900">{session.device}</span>
                        {session.current && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Current
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {session.ip}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {session.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(session.time).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {!session.current && (
                        <button
                          onClick={() => handleLogoutSession(session.id)}
                          className="text-red-600 hover:text-red-900 flex items-center justify-end"
                        >
                          <LogOut size={16} className="mr-1" />
                          Logout
                        </button>
                      )}
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

export default SecuritySettings; 