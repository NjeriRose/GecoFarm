import React, { useState, useEffect } from 'react';
import { Calendar, Sun, Cloud, Snowflake, Wind, Edit } from 'lucide-react';
import SeasonForm from './forms/SeasonForm';
import { seasonService } from '../services/database';

interface SeasonData {
  season_id: number;
  name: string;
  start_date: string;
  end_date: string;
  status: string;
  activities: Array<{
    activity_id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    status: string;
  }>;
}

const CurrentSeason: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [seasonData, setSeasonData] = useState<SeasonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeasonData = async () => {
      try {
        const data = await seasonService.getCurrentSeason();
        if (data === null) {
          setError('No active season found');
        } else {
          setSeasonData(data);
        }
      } catch (err) {
        setError('Failed to load season data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasonData();
  }, []);

  const handleSubmit = async (data: {
    name: string;
    startDate: Date;
    endDate: Date;
    mainActivities: string[];
  }) => {
    try {
      if (!seasonData) return;

      const updatedSeason = await seasonService.updateSeason(seasonData.season_id, {
        name: data.name,
        start_date: data.startDate.toISOString(),
        end_date: data.endDate.toISOString(),
        status: 'active'
      });

      // Update activities
      const activities = data.mainActivities.map(activity => ({
        season_id: seasonData.season_id,
        name: activity,
        status: 'pending'
      }));

      // Here you would need to implement the activity update logic
      // This would involve deleting old activities and creating new ones

      setSeasonData(updatedSeason);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update season data');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="text-red-600 text-center">{error}</div>
      </div>
    );
  }

  if (!seasonData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="text-gray-600 text-center">No active season found</div>
      </div>
    );
  }

  const startDate = new Date(seasonData.start_date);
  const endDate = new Date(seasonData.end_date);
  const daysRemaining = Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const percentageComplete = Math.floor(
    ((new Date().getTime() - startDate.getTime()) / 
    (endDate.getTime() - startDate.getTime())) * 100
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Sun className="h-5 w-5 text-yellow-500 mr-2" />
          <h3 className="font-medium text-gray-700">Current Season</h3>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <Edit size={18} />
        </button>
      </div>
      
      {isEditing ? (
        <SeasonForm
          initialData={{
            name: seasonData.name,
            startDate: startDate,
            endDate: endDate,
            mainActivities: seasonData.activities.map(a => a.name)
          }}
          onSubmit={handleSubmit}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className="mb-4">
            <h4 className="font-bold text-lg text-green-800">{seasonData.name}</h4>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{percentageComplete}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${percentageComplete}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {daysRemaining} days remaining
            </div>
          </div>
          
          <div>
            <h5 className="font-medium text-sm text-gray-700 mb-2">Key Activities:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {seasonData.activities.map((activity) => (
                <li key={activity.activity_id} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                  {activity.name}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrentSeason;