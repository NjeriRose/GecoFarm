import React, { useState } from 'react';
import { X } from 'lucide-react';
import { formatCurrency, parseCurrency, validateCurrency } from '../../utils/currencyUtils';

interface DeliveryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  products: Array<{ id: string; name: string }>;
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({ isOpen, onClose, onSubmit, products }) => {
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
    deliveryDate: new Date().toISOString().split('T')[0],
    deliveryTime: new Date().toTimeString().slice(0, 5),
    destination: '',
    deliveredBy: '',
    transportMode: 'truck',
    transportCost: '',
    comments: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    if (!formData.productId) newErrors.productId = 'Product is required';
    if (!formData.quantity) newErrors.quantity = 'Quantity is required';
    if (!formData.destination) newErrors.destination = 'Destination is required';
    if (!formData.deliveredBy) newErrors.deliveredBy = 'Delivered by is required';
    if (!formData.transportCost) newErrors.transportCost = 'Transport cost is required';
    if (!validateCurrency(formData.transportCost)) newErrors.transportCost = 'Invalid cost format';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Format data for submission
    const submissionData = {
      ...formData,
      transportCost: parseCurrency(formData.transportCost)
    };

    onSubmit(submissionData);
  };

  const handleTransportCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, transportCost: value });
    
    if (value && !validateCurrency(value)) {
      setErrors({ ...errors, transportCost: 'Invalid cost format' });
    } else {
      const { transportCost, ...rest } = errors;
      setErrors(rest);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Delivery</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product</label>
            <select
              value={formData.productId}
              onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            >
              <option value="">Select Product</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity Delivered</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Delivery Date</label>
              <input
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Delivery Time</label>
              <input
                type="time"
                value={formData.deliveryTime}
                onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Delivery Destination</label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Delivered By</label>
            <input
              type="text"
              value={formData.deliveredBy}
              onChange={(e) => setFormData({ ...formData, deliveredBy: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Transport Mode</label>
            <select
              value={formData.transportMode}
              onChange={(e) => setFormData({ ...formData, transportMode: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            >
              <option value="truck">Truck</option>
              <option value="motorbike">Motorbike</option>
              <option value="handcart">Handcart</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Transport Cost (Ksh)</label>
            <input
              type="text"
              value={formData.transportCost}
              onChange={handleTransportCostChange}
              placeholder="Enter transport cost in Ksh"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 ${
                errors.transportCost ? 'border-red-500' : ''
              }`}
            />
            {errors.transportCost && (
              <p className="mt-1 text-sm text-red-600">{errors.transportCost}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Comments</label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              rows={3}
            />
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
              Add Delivery
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryForm; 