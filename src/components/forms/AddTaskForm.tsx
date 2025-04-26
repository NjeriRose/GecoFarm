import React, { useState } from 'react';
import { ClipboardPlus, X } from 'lucide-react';
import FormModal from '../FormModal';
import { formatCurrency, parseCurrency, validateCurrency } from '../../utils/currencyUtils';

interface AddTaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  employees: Array<{ id: string; name: string }>;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ isOpen, onClose, onSubmit, employees }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: [] as string[],
    department: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium',
    payment: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (formData.assignedTo.length === 0) newErrors.assignedTo = 'At least one assignee is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.payment) newErrors.payment = 'Payment is required';
    if (!validateCurrency(formData.payment)) newErrors.payment = 'Invalid payment format';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Format data for submission
    const submissionData = {
      ...formData,
      payment: parseCurrency(formData.payment)
    };

    onSubmit(submissionData);
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, payment: value });
    
    if (value && !validateCurrency(value)) {
      setErrors({ ...errors, payment: 'Invalid payment format' });
    } else {
      const { payment, ...rest } = errors;
      setErrors(rest);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Task</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Task Title</label>
            <input
              type="text"
              name="title"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Task Description</label>
            <textarea
              name="description"
              rows={3}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Assign to Employee</label>
            <select
              name="assignedTo"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              <option value="">Select an employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              name="department"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Deadline</label>
            <input
              type="date"
              name="deadline"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Priority Level</label>
            <select
              name="priority"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Payment (Ksh)</label>
            <input
              type="text"
              value={formData.payment}
              onChange={handlePaymentChange}
              placeholder="Enter payment amount in Ksh"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 ${
                errors.payment ? 'border-red-500' : ''
              }`}
            />
            {errors.payment && (
              <p className="mt-1 text-sm text-red-600">{errors.payment}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm; 