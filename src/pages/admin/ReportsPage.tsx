import React, { useState } from 'react';
import { Download, ChevronDown, ChevronUp } from 'lucide-react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { exportToPDF, exportToCSV, formatDataForExport } from '../../utils/exportUtils';
import { formatCurrency } from '../../utils/currencyUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ReportsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Sample data - replace with actual API calls
  const financialChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Income (Ksh)',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const taskStatusData = {
    labels: ['Completed', 'In Progress', 'Overdue'],
    datasets: [{
      data: [30, 50, 20],
      backgroundColor: ['#10B981', '#F59E0B', '#EF4444']
    }]
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleExport = (format: 'pdf' | 'csv', section: string) => {
    const commonOptions = {
      filename: `${section}_report_${new Date().toISOString().split('T')[0]}`,
    };

    switch (section) {
      case 'financial':
        const financialHeaders = ['Month', 'Income'];
        const financialData = formatDataForExport(
          financialChartData.labels.map((label, index) => ({
            Month: label,
            Income: financialChartData.datasets[0].data[index]
          })),
          ['Month', 'Income']
        );
        if (format === 'pdf') {
          exportToPDF({
            ...commonOptions,
            title: 'Financial Report',
            headers: financialHeaders,
            data: financialData,
            currencyFields: ['Income']
          });
        } else {
          exportToCSV({
            ...commonOptions,
            headers: financialHeaders,
            data: financialData,
            currencyFields: ['Income']
          });
        }
        break;

      case 'tasks':
        const taskHeaders = ['Status', 'Count'];
        const taskData = formatDataForExport(
          taskStatusData.labels.map((label, index) => ({
            Status: label,
            Count: taskStatusData.datasets[0].data[index]
          })),
          ['Status', 'Count']
        );
        if (format === 'pdf') {
          exportToPDF({
            ...commonOptions,
            title: 'Task Status Report',
            headers: taskHeaders,
            data: taskData,
          });
        } else {
          exportToCSV({
            ...commonOptions,
            headers: taskHeaders,
            data: taskData,
          });
        }
        break;

      case 'employees':
        const employeeHeaders = ['Employee', 'Role', 'Last Login', 'Tasks Completed'];
        const employeeData = formatDataForExport(
          [
            {
              Employee: 'John Doe',
              Role: 'Farm Manager',
              'Last Login': '2024-03-20 10:30',
              'Tasks Completed': 25
            }
          ],
          ['Employee', 'Role', 'Last Login', 'Tasks Completed']
        );
        if (format === 'pdf') {
          exportToPDF({
            ...commonOptions,
            title: 'Employee Report',
            headers: employeeHeaders,
            data: employeeData,
          });
        } else {
          exportToCSV({
            ...commonOptions,
            headers: employeeHeaders,
            data: employeeData,
          });
        }
        break;

      case 'inventory':
        const inventoryHeaders = ['Item', 'Category', 'Current Stock', 'Threshold', 'Status'];
        const inventoryData = formatDataForExport(
          [
            {
              Item: 'Fertilizer',
              Category: 'Supplies',
              'Current Stock': '50 kg',
              Threshold: '20 kg',
              Status: 'In Stock'
            }
          ],
          ['Item', 'Category', 'Current Stock', 'Threshold', 'Status']
        );
        if (format === 'pdf') {
          exportToPDF({
            ...commonOptions,
            title: 'Inventory Report',
            headers: inventoryHeaders,
            data: inventoryData,
          });
        } else {
          exportToCSV({
            ...commonOptions,
            headers: inventoryHeaders,
            data: inventoryData,
          });
        }
        break;

      case 'system':
        const systemHeaders = ['Metric', 'Value'];
        const systemData = formatDataForExport(
          [
            { Metric: 'Total Admin Logins', Value: 150 },
            { Metric: 'New Accounts', Value: 25 },
            { Metric: 'System Errors', Value: 5 }
          ],
          ['Metric', 'Value']
        );
        if (format === 'pdf') {
          exportToPDF({
            ...commonOptions,
            title: 'System Usage Report',
            headers: systemHeaders,
            data: systemData,
          });
        } else {
          exportToCSV({
            ...commonOptions,
            headers: systemHeaders,
            data: systemData,
          });
        }
        break;
    }
  };

  const ReportSection: React.FC<{
    title: string;
    id: string;
    children: React.ReactNode;
  }> = ({ title, id, children }) => (
    <div className="bg-white rounded-lg shadow mb-6">
      <div 
        className="p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
        onClick={() => toggleSection(id)}
      >
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        {activeSection === id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      {activeSection === id && (
        <div className="p-6">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600">Generate and analyze farm management reports</p>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Financial Reports */}
      <ReportSection title="Financial Reports" id="financial">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Total Income</h3>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(150000)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(75000)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Profit Margin</h3>
              <p className="text-2xl font-semibold text-green-600">50%</p>
            </div>
          </div>
          <div className="h-64">
            <Line data={financialChartData} options={{ maintainAspectRatio: false }} />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => handleExport('pdf', 'financial')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <Download size={16} className="mr-2" />
              Export PDF
            </button>
            <button
              onClick={() => handleExport('csv', 'financial')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <Download size={16} className="mr-2" />
              Export CSV
            </button>
          </div>
        </div>
      </ReportSection>

      {/* Task Reports */}
      <ReportSection title="Task Reports" id="tasks">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64">
              <Pie data={taskStatusData} options={{ maintainAspectRatio: false }} />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Completed Tasks</span>
                <span className="text-sm text-gray-900">30</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">In Progress</span>
                <span className="text-sm text-gray-900">50</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Overdue</span>
                <span className="text-sm text-gray-900">20</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => handleExport('pdf', 'tasks')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <Download size={16} className="mr-2" />
              Export PDF
            </button>
            <button
              onClick={() => handleExport('csv', 'tasks')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <Download size={16} className="mr-2" />
              Export CSV
            </button>
          </div>
        </div>
      </ReportSection>

      {/* Employee Reports */}
      <ReportSection title="Employee Reports" id="employees">
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks Completed</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Sample data - replace with actual data */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                  <td className="px-6 py-4 whitespace-nowrap">Farm Manager</td>
                  <td className="px-6 py-4 whitespace-nowrap">2024-03-20 10:30</td>
                  <td className="px-6 py-4 whitespace-nowrap">25</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => handleExport('pdf', 'employees')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <Download size={16} className="mr-2" />
              Export PDF
            </button>
            <button
              onClick={() => handleExport('csv', 'employees')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <Download size={16} className="mr-2" />
              Export CSV
            </button>
          </div>
        </div>
      </ReportSection>

      {/* Production Reports */}
      <ReportSection title="Production Reports" id="production">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64">
              <Line data={financialChartData} options={{ maintainAspectRatio: false }} />
            </div>
            <div className="h-64">
              <Bar data={financialChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => handleExport('pdf', 'production')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <Download size={16} className="mr-2" />
              Export PDF
            </button>
            <button
              onClick={() => handleExport('csv', 'production')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <Download size={16} className="mr-2" />
              Export CSV
            </button>
          </div>
        </div>
      </ReportSection>

      {/* Inventory Reports */}
      <ReportSection title="Inventory Reports" id="inventory">
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Threshold</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Sample data - replace with actual data */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Fertilizer</td>
                  <td className="px-6 py-4 whitespace-nowrap">Supplies</td>
                  <td className="px-6 py-4 whitespace-nowrap">50 kg</td>
                  <td className="px-6 py-4 whitespace-nowrap">20 kg</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      In Stock
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => handleExport('pdf', 'inventory')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <Download size={16} className="mr-2" />
              Export PDF
            </button>
            <button
              onClick={() => handleExport('csv', 'inventory')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <Download size={16} className="mr-2" />
              Export CSV
            </button>
          </div>
        </div>
      </ReportSection>

      {/* System Usage Reports */}
      <ReportSection title="System Usage Reports" id="system">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Total Admin Logins</h3>
              <p className="text-2xl font-semibold text-gray-900">150</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">New Accounts</h3>
              <p className="text-2xl font-semibold text-gray-900">25</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">System Errors</h3>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => handleExport('pdf', 'system')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <Download size={16} className="mr-2" />
              Export PDF
            </button>
            <button
              onClick={() => handleExport('csv', 'system')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <Download size={16} className="mr-2" />
              Export CSV
            </button>
          </div>
        </div>
      </ReportSection>
    </div>
  );
};

export default ReportsPage; 