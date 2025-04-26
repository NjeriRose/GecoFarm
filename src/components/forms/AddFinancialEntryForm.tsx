import React from 'react';
import { DollarSign } from 'lucide-react';
import FormModal from '../FormModal';

interface AddFinancialEntryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddFinancialEntryForm: React.FC<AddFinancialEntryFormProps> = ({ isOpen, onClose, onSubmit }) => {
  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Financial Entry"
      onSubmit={onSubmit}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Entry Type</label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="income"
                required
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Income</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="expense"
                required
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Expense</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="amount"
              required
              min="0"
              step="0.01"
              className="block w-full pl-7 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            required
            defaultValue={new Date().toISOString().split('T')[0]}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          >
            <option value="">Select a category</option>
            <optgroup label="Income">
              <option value="sales">Sales</option>
              <option value="services">Services</option>
              <option value="other_income">Other Income</option>
            </optgroup>
            <optgroup label="Expenses">
              <option value="feed">Feed</option>
              <option value="equipment">Equipment</option>
              <option value="maintenance">Maintenance</option>
              <option value="salaries">Salaries</option>
              <option value="utilities">Utilities</option>
              <option value="other_expenses">Other Expenses</option>
            </optgroup>
          </select>
        </div>
      </div>
    </FormModal>
  );
};

export default AddFinancialEntryForm; 