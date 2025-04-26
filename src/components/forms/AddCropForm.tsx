import React from 'react';
import { Sprout } from 'lucide-react';
import FormModal from '../FormModal';

interface AddCropFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddCropForm: React.FC<AddCropFormProps> = ({ isOpen, onClose, onSubmit }) => {
  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Crop"
      onSubmit={onSubmit}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Crop Name</label>
          <input
            type="text"
            name="name"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Planting Date</label>
          <input
            type="date"
            name="plantingDate"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Expected Harvest Date</label>
          <input
            type="date"
            name="harvestDate"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Current Status</label>
          <select
            name="status"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          >
            <option value="">Select status</option>
            <option value="planned">Planned</option>
            <option value="planted">Planted</option>
            <option value="growing">Growing</option>
            <option value="ready">Ready for Harvest</option>
            <option value="harvested">Harvested</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Notes/Description</label>
          <textarea
            name="notes"
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
      </div>
    </FormModal>
  );
};

export default AddCropForm; 