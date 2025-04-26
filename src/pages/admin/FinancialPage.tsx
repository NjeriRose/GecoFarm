import React, { useState } from 'react';
import { Plus, Filter, Calendar, List } from 'lucide-react';
import FinancialEntryForm from '../../components/forms/FinancialEntryForm';

interface FinancialEntry {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
}

const FinancialPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddEntryModalOpen, setIsAddEntryModalOpen] = useState(false);
  
  // Sample financial entries data
  const entries: FinancialEntry[] = [
    // ... existing entries ...
  ];

  const handleAddEntry = (data: any) => {
    // TODO: Implement API call to add financial entry
    console.log('Adding financial entry:', data);
    setIsAddEntryModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Financial Management</h1>
        <button 
          onClick={() => setIsAddEntryModalOpen(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <Plus size={20} className="mr-2" />
          Add Entry
        </button>
      </div>

      // ... existing code ...

      <FinancialEntryForm
        isOpen={isAddEntryModalOpen}
        onClose={() => setIsAddEntryModalOpen(false)}
        onSubmit={handleAddEntry}
      />
    </div>
  );
};

export default FinancialPage; 