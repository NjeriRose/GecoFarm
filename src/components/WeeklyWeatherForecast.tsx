import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Sun, CloudRain, Snowflake, Wind } from 'lucide-react';

interface DailyForecast {
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy';
  humidity: number;
  windSpeed: number;
}

const WeeklyWeatherForecast: React.FC = () => {
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // In a real app, you would use your OpenWeatherMap API key
        const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
        const LAT = -1.2921; // Nairobi coordinates
        const LON = 36.8219;
        
        // For demo purposes, we'll use mock data
        const mockForecast: DailyForecast[] = [
          {
            date: '2024-04-21',
            minTemp: 15,
            maxTemp: 28,
            condition: 'sunny',
            humidity: 45,
            windSpeed: 8
          },
          {
            date: '2024-04-22',
            minTemp: 16,
            maxTemp: 27,
            condition: 'cloudy',
            humidity: 55,
            windSpeed: 10
          },
          {
            date: '2024-04-23',
            minTemp: 17,
            maxTemp: 26,
            condition: 'rainy',
            humidity: 75,
            windSpeed: 12
          },
          {
            date: '2024-04-24',
            minTemp: 16,
            maxTemp: 27,
            condition: 'cloudy',
            humidity: 60,
            windSpeed: 9
          },
          {
            date: '2024-04-25',
            minTemp: 15,
            maxTemp: 29,
            condition: 'sunny',
            humidity: 50,
            windSpeed: 7
          },
          {
            date: '2024-04-26',
            minTemp: 16,
            maxTemp: 28,
            condition: 'windy',
            humidity: 40,
            windSpeed: 15
          },
          {
            date: '2024-04-27',
            minTemp: 17,
            maxTemp: 27,
            condition: 'cloudy',
            humidity: 55,
            windSpeed: 11
          }
        ];

        setForecast(mockForecast);
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error('Error fetching weather data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const renderWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun size={24} className="text-yellow-500" />;
      case 'cloudy':
        return <Cloud size={24} className="text-gray-500" />;
      case 'rainy':
        return <CloudRain size={24} className="text-blue-500" />;
      case 'snowy':
        return <Snowflake size={24} className="text-blue-300" />;
      case 'windy':
        return <Wind size={24} className="text-gray-400" />;
      default:
        return <Cloud size={24} className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-500">Loading weather forecast...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Weather Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {forecast.map((day, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-sm font-medium text-gray-700 mb-2">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="mb-2">{renderWeatherIcon(day.condition)}</div>
            <div className="text-lg font-semibold text-gray-900">
              {day.maxTemp}°C
            </div>
            <div className="text-sm text-gray-500">
              {day.minTemp}°C
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <div className="flex items-center justify-center">
                <Droplets size={12} className="text-blue-500 mr-1" />
                {day.humidity}%
              </div>
              <div className="flex items-center justify-center">
                <Wind size={12} className="text-gray-500 mr-1" />
                {day.windSpeed} km/h
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyWeatherForecast; 