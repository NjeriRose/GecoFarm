import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, Trash2, UserX } from 'lucide-react';
import AddEmployeeForm from '../../components/forms/AddEmployeeForm';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: {
    type: 'admin' | 'employee';
    position: string;
  };
  department: string;
  status: 'active' | 'inactive';
  profilePhoto: string;
}

const EmployeesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  
  // Sample employees data
  const employees: Employee[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@gecofarm.com',
      role: { type: 'admin', position: 'Farm Manager' },
      department: 'Management',
      status: 'active',
      profilePhoto: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@gecofarm.com',
      role: { type: 'employee', position: 'Farm Attendant' },
      department: 'Operations',
      status: 'active',
      profilePhoto: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    },
    // Add more sample employees...
  ];

  const handleAddEmployee = (data: any) => {
    // TODO: Implement API call to add employee
    console.log('Adding employee:', data);
    setIsAddEmployeeModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Employees Management</h1>
        <button 
          onClick={() => setIsAddEmployeeModalOpen(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <Plus size={20} className="mr-2" />
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search employees..."
                className="pl-10 pr-4 py-2 w-full border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
              
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                <option value="all">All Departments</option>
                <option value="Management">Management</option>
                <option value="Operations">Operations</option>
                <option value="Finance">Finance</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                <option value="name">Sort by Name</option>
                <option value="department">Sort by Department</option>
                <option value="role">Sort by Role</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={employee.profilePhoto}
                          alt={employee.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.role.position}</div>
                    <div className="text-sm text-gray-500">{employee.role.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit2 size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <UserX size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddEmployeeForm
        isOpen={isAddEmployeeModalOpen}
        onClose={() => setIsAddEmployeeModalOpen(false)}
        onSubmit={handleAddEmployee}
      />
    </div>
  );
};

export default EmployeesPage;