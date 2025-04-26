import React, { useState } from 'react';
import { UserPlus, Check, X, Search } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  department: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
  permissions: string[];
}

const UserRoleSettings: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  
  // Sample users data
  const users: User[] = [
    {
      id: 'U001',
      name: 'John Smith',
      email: 'john.smith@gecofarm.com',
      role: 'admin',
      department: 'General Management',
      status: 'active',
      lastLogin: '2025-04-20T10:30:00',
      permissions: ['manage_users', 'manage_finances', 'manage_crops', 'manage_livestock']
    },
    {
      id: 'U002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@gecofarm.com',
      role: 'admin',
      department: 'Finance',
      status: 'active',
      lastLogin: '2025-04-19T08:15:00',
      permissions: ['manage_finances', 'view_reports']
    },
    {
      id: 'U003',
      name: 'Mike Thompson',
      email: 'mike.thompson@gecofarm.com',
      role: 'employee',
      department: 'Livestock Management',
      status: 'active',
      lastLogin: '2025-04-18T14:45:00',
      permissions: ['manage_livestock', 'view_reports']
    },
    {
      id: 'U004',
      name: 'Emily Davis',
      email: 'emily.davis@gecofarm.com',
      role: 'employee',
      department: 'Crop Management',
      status: 'inactive',
      permissions: ['manage_crops']
    }
  ];
  
  const handleStatusToggle = (userId: string) => {
    // In a real app, this would update the user status in the database
    alert(`Toggled status for user ${userId}`);
  };
  
  const handleResetPassword = (userId: string) => {
    // In a real app, this would trigger a password reset email
    alert(`Reset password for user ${userId}`);
  };
  
  const filteredUsers = users.filter(user => {
    // Filter by search term
    if (searchTerm && !user.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !user.email.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== 'all' && user.status !== statusFilter) {
      return false;
    }
    
    // Filter by role
    if (roleFilter !== 'all' && user.role !== roleFilter) {
      return false;
    }
    
    return true;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">User & Role Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
        >
          <UserPlus size={18} className="mr-2" />
          Add User
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border-gray-300 rounded-md pl-10 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
                />
              </div>
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'admin' ? 'Admin' : 'Employee'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowPermissionsModal(true);
                      }}
                      className="text-green-600 hover:text-green-900 mr-3"
                    >
                      Permissions
                    </button>
                    <button
                      onClick={() => handleResetPassword(user.id)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Reset Password
                    </button>
                    <button
                      onClick={() => handleStatusToggle(user.id)}
                      className={user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Add New User</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
                    placeholder="John Smith"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
                    placeholder="john.smith@gecofarm.com"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select 
                      id="role" 
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="employee">Employee</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select 
                      id="department" 
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
                    >
                      <option value="">Select Department</option>
                      <option value="General Management">General Management</option>
                      <option value="Finance">Finance</option>
                      <option value="Crop Management">Crop Management</option>
                      <option value="Livestock Management">Livestock Management</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="initialPassword" className="block text-sm font-medium text-gray-700 mb-1">Initial Password</label>
                  <input 
                    type="password" 
                    id="initialPassword" 
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    User will be prompted to change password on first login.
                  </p>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="bg-green-600 text-white px-4 py-2 rounded-md"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Permissions Modal */}
      {showPermissionsModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">User Permissions</h3>
                <button 
                  onClick={() => setShowPermissionsModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900">{selectedUser.name}</h4>
                <p className="text-sm text-gray-500">{selectedUser.email}</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <h4 className="text-sm font-medium text-gray-900">Permissions</h4>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedUser.permissions.includes('manage_users')}
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Manage Users & Roles</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedUser.permissions.includes('manage_finances')}
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Manage Finances</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedUser.permissions.includes('manage_crops')}
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Manage Crops</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedUser.permissions.includes('manage_livestock')}
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Manage Livestock</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedUser.permissions.includes('manage_products')}
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Manage Products</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedUser.permissions.includes('view_reports')}
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">View Reports</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedUser.permissions.includes('system_settings')}
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Modify System Settings</span>
                </label>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowPermissionsModal(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <Check size={16} className="mr-2" />
                  Save Permissions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRoleSettings; 