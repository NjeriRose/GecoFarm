import React from 'react';
import WeeklyWeatherForecast from '../../components/WeeklyWeatherForecast';
import { useAuth } from '../../contexts/AuthContext';

const WeatherPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Weather Forecast</h1>
        <p className="text-gray-600">Weekly weather forecast for {user?.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyWeatherForecast />
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-medium text-gray-700 mb-3">Weather Tips</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                Check the forecast before planning outdoor activities
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                Wear appropriate clothing for the expected conditions
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                Stay hydrated during hot weather
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                Be cautious of strong winds when working outdoors
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                Plan irrigation based on expected rainfall
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-medium text-gray-700 mb-3">Weather Alerts</h3>
            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-sm text-yellow-700">
                  Heavy rain expected on Thursday. Plan outdoor activities accordingly.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="text-sm text-blue-700">
                  Strong winds forecasted for Saturday. Secure loose items and equipment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage; 