import React, { useState } from 'react';
import { Globe } from 'lucide-react';

const RegionalSettings: React.FC = () => {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [temperatureUnit, setTemperatureUnit] = useState('celsius');
  const [distanceUnit, setDistanceUnit] = useState('km');
  
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6 flex items-center">
          <Globe className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Language & Regional Settings</h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              id="language"
              name="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
            >
              <option value="en">English</option>
              <option value="sw">Swahili</option>
              <option value="fr">French</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border px-3 py-2"
            >
              <option value="USD">US Dollar ($)</option>
              <option value="KES">Kenyan Shilling (KSh)</option>
              <option value="EUR">Euro (€)</option>
              <option value="GBP">British Pound (£)</option>
              <option value="NGN">Nigerian Naira (₦)</option>
            </select>
          </div>
          
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">
              Temperature Unit
            </span>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="temperatureUnit"
                  value="celsius"
                  checked={temperatureUnit === 'celsius'}
                  onChange={() => setTemperatureUnit('celsius')}
                  className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">Celsius (°C)</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="temperatureUnit"
                  value="fahrenheit"
                  checked={temperatureUnit === 'fahrenheit'}
                  onChange={() => setTemperatureUnit('fahrenheit')}
                  className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">Fahrenheit (°F)</span>
              </label>
            </div>
          </div>
          
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">
              Distance Unit
            </span>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="distanceUnit"
                  value="km"
                  checked={distanceUnit === 'km'}
                  onChange={() => setDistanceUnit('km')}
                  className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">Kilometers (km)</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="distanceUnit"
                  value="mi"
                  checked={distanceUnit === 'mi'}
                  onChange={() => setDistanceUnit('mi')}
                  className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">Miles (mi)</span>
              </label>
            </div>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Changing the language will refresh the application and translate the interface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Save Regional Settings
        </button>
      </div>
    </div>
  );
};

export default RegionalSettings; 