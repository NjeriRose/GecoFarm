import React, { useState } from 'react';
import { Plus, Leaf, AlertTriangle, Filter, Search } from 'lucide-react';
import CropForm from '../../components/forms/CropForm';

interface Crop {
  id: string;
  name: string;
  variety: string;
  field: string;
  plantingDate: string;
  expectedHarvestDate: string;
  status: 'growing' | 'ready_to_harvest' | 'harvested' | 'diseased';
  healthStatus: 'healthy' | 'minor_issues' | 'severe_issues';
  expectedYield: number;
  yieldUnit: string;
  notes: string;
}

const CropsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [fieldFilter, setFieldFilter] = useState('all');
  const [isAddCropModalOpen, setIsAddCropModalOpen] = useState(false);
  
  // Sample crops data
  const crops: Crop[] = [
    {
      id: '1',
      name: 'Corn',
      variety: 'Sweet Corn',
      field: 'Field A',
      plantingDate: '2025-02-15',
      expectedHarvestDate: '2025-05-15',
      status: 'growing',
      healthStatus: 'healthy',
      expectedYield: 5000,
      yieldUnit: 'kg',
      notes: 'Growing well, no issues detected'
    },
    {
      id: '2',
      name: 'Wheat',
      variety: 'Winter Wheat',
      field: 'Field B',
      plantingDate: '2025-01-10',
      expectedHarvestDate: '2025-06-10',
      status: 'diseased',
      healthStatus: 'severe_issues',
      expectedYield: 3000,
      yieldUnit: 'kg',
      notes: 'Fungal infection detected in north section'
    },
    // Add more sample crops...
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'growing':
        return 'bg-blue-100 text-blue-800';
      case 'ready_to_harvest':
        return 'bg-green-100 text-green-800';
      case 'harvested':
        return 'bg-gray-100 text-gray-800';
      case 'diseased':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'minor_issues':
        return 'bg-yellow-100 text-yellow-800';
      case 'severe_issues':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddCrop = (data: any) => {
    // TODO: Implement API call to add crop
    console.log('Adding crop:', data);
    setIsAddCropModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Crops Management</h1>
        <button 
          onClick={() => setIsAddCropModalOpen(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <Plus size={20} className="mr-2" />
          Add Crop
        </button>
      </div>

      {/* Alerts */}
      <div className="mb-6 space-y-4">
        {crops.some(crop => crop.status === 'diseased') && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Disease alert: Some crops require immediate attention
                </p>
              </div>
            </div>
          </div>
        )}
        
        {crops.some(crop => crop.status === 'ready_to_harvest') && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Leaf className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  Harvest alert: Some crops are ready to be harvested
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Crops Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-md px-3 py-2"
            >
              <option value="all">All Status</option>
              <option value="growing">Growing</option>
              <option value="ready_to_harvest">Ready to Harvest</option>
              <option value="harvested">Harvested</option>
              <option value="diseased">Diseased</option>
            </select>
            
            <select
              value={fieldFilter}
              onChange={(e) => setFieldFilter(e.target.value)}
              className="border rounded-md px-3 py-2"
            >
              <option value="all">All Fields</option>
              <option value="Field A">Field A</option>
              <option value="Field B">Field B</option>
              <option value="Field C">Field C</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Crop
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Field
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Planting Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expected Harvest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Health
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expected Yield
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {crops.map((crop) => (
                <tr key={crop.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <Leaf className="h-10 w-10 text-green-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{crop.name}</div>
                        <div className="text-sm text-gray-500">{crop.variety}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{crop.field}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(crop.plantingDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(crop.expectedHarvestDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(crop.status)}`}>
                      {crop.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getHealthStatusColor(crop.healthStatus)}`}>
                      {crop.healthStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {crop.expectedYield} {crop.yieldUnit}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CropForm
        isOpen={isAddCropModalOpen}
        onClose={() => setIsAddCropModalOpen(false)}
        onSubmit={handleAddCrop}
      />
    </div>
  );
};

export default CropsPage;