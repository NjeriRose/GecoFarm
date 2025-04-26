import React, { useState } from 'react';
import { Plus, AlertTriangle, Droplet, Check, X, Calendar } from 'lucide-react';

interface Livestock {
  id: string;
  name: string;
  type: 'cow' | 'chicken' | 'goat' | 'sheep' | 'pig';
  breed: string;
  age: number;
  gender: 'male' | 'female';
  healthStatus: 'healthy' | 'sick' | 'treatment' | 'quarantine';
  location: string;
  acquisitionDate: string;
  caretaker: string;
  notes: string;
  lastFeedingTime?: string;
  lastTreatment?: {
    date: string;
    treatment: string;
    administeredBy: string;
  };
  nextVaccination?: {
    date: string;
    vaccine: string;
  };
}

const LivestockPage: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState('all');
  const [healthFilter, setHealthFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventType, setEventType] = useState<'birth' | 'sale' | 'death' | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<Livestock | null>(null);
  
  // Sample livestock data
  const livestock: Livestock[] = [
    {
      id: '1',
      name: 'Bessie',
      type: 'cow',
      breed: 'Holstein',
      age: 4,
      gender: 'female',
      healthStatus: 'healthy',
      location: 'Main Barn - Pen 3',
      acquisitionDate: '2023-05-15',
      caretaker: 'John Doe',
      notes: 'Milk production steady',
      lastFeedingTime: '2025-03-15T08:00:00',
      lastTreatment: {
        date: '2025-02-10',
        treatment: 'Deworming',
        administeredBy: 'Vet Smith'
      },
      nextVaccination: {
        date: '2025-04-20',
        vaccine: 'Brucellosis Booster'
      }
    },
    {
      id: '2',
      name: 'Clucky',
      type: 'chicken',
      breed: 'Rhode Island Red',
      age: 1,
      gender: 'female',
      healthStatus: 'sick',
      location: 'Coop B',
      acquisitionDate: '2024-12-05',
      caretaker: 'Sarah Johnson',
      notes: 'Reduced egg production, possible respiratory infection',
      lastFeedingTime: '2025-03-15T07:30:00',
      lastTreatment: {
        date: '2025-03-14',
        treatment: 'Antibiotics',
        administeredBy: 'Vet Wilson'
      }
    },
    {
      id: '3',
      name: 'Billy',
      type: 'goat',
      breed: 'Boer',
      age: 2,
      gender: 'male',
      healthStatus: 'treatment',
      location: 'East Field',
      acquisitionDate: '2024-08-22',
      caretaker: 'Mike Thompson',
      notes: 'Recovering from leg injury',
      lastFeedingTime: '2025-03-15T08:15:00',
      lastTreatment: {
        date: '2025-03-10',
        treatment: 'Wound cleaning and bandage',
        administeredBy: 'Mike Thompson'
      },
      nextVaccination: {
        date: '2025-05-15',
        vaccine: 'Annual booster'
      }
    }
  ];

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'sick':
        return 'bg-red-100 text-red-800';
      case 'treatment':
        return 'bg-yellow-100 text-yellow-800';
      case 'quarantine':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAnimalIcon = (type: string) => {
    switch (type) {
      case 'cow':
        return <Droplet className="h-10 w-10 text-blue-500" />;
      case 'chicken':
        return <Droplet className="h-10 w-10 text-amber-500" />;
      case 'goat':
        return <Droplet className="h-10 w-10 text-green-500" />;
      case 'sheep':
        return <Droplet className="h-10 w-10 text-gray-500" />;
      case 'pig':
        return <Droplet className="h-10 w-10 text-pink-500" />;
      default:
        return <Droplet className="h-10 w-10 text-gray-500" />;
    }
  };

  const filteredLivestock = livestock.filter(animal => {
    if (typeFilter !== 'all' && animal.type !== typeFilter) return false;
    if (healthFilter !== 'all' && animal.healthStatus !== healthFilter) return false;
    return true;
  });

  const needsAttention = livestock.filter(animal => 
    animal.healthStatus === 'sick' || animal.healthStatus === 'treatment'
  ).length;

  const upcomingVaccinations = livestock.filter(animal => 
    animal.nextVaccination && new Date(animal.nextVaccination.date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  ).length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Livestock Management</h1>
        <div className="flex space-x-3">
          <button 
            onClick={() => {
              setEventType(null);
              setShowEventModal(true);
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Calendar size={20} className="mr-2" />
            Log Event
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Plus size={20} className="mr-2" />
            Add Livestock
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold">Total Livestock</h3>
          <p className="text-3xl mt-2">{livestock.length}</p>
        </div>
        
        {needsAttention > 0 && (
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
            <h3 className="text-lg font-semibold">Needs Attention</h3>
            <p className="text-3xl mt-2">{needsAttention}</p>
          </div>
        )}
        
        {upcomingVaccinations > 0 && (
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
            <h3 className="text-lg font-semibold">Upcoming Vaccinations</h3>
            <p className="text-3xl mt-2">{upcomingVaccinations}</p>
          </div>
        )}
      </div>

      {/* Alerts */}
      <div className="mb-6 space-y-4">
        {livestock.some(animal => animal.healthStatus === 'sick') && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Health alert: Some animals require immediate veterinary attention
                </p>
              </div>
            </div>
          </div>
        )}
        
        {livestock.some(animal => 
          animal.nextVaccination && 
          new Date(animal.nextVaccination.date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        ) && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Calendar className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Vaccination alert: Some animals are due for vaccination in the next 7 days
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Livestock Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-4">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border rounded-md px-3 py-2"
            >
              <option value="all">All Types</option>
              <option value="cow">Cows</option>
              <option value="chicken">Chickens</option>
              <option value="goat">Goats</option>
              <option value="sheep">Sheep</option>
              <option value="pig">Pigs</option>
            </select>
            
            <select
              value={healthFilter}
              onChange={(e) => setHealthFilter(e.target.value)}
              className="border rounded-md px-3 py-2"
            >
              <option value="all">All Health Status</option>
              <option value="healthy">Healthy</option>
              <option value="sick">Sick</option>
              <option value="treatment">Under Treatment</option>
              <option value="quarantine">Quarantine</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Animal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Breed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Health Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Caretaker
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Vaccination
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLivestock.map((animal) => (
                <tr key={animal.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {getAnimalIcon(animal.type)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{animal.name}</div>
                        <div className="text-sm text-gray-500 capitalize">{animal.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{animal.breed}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {animal.age} {animal.age === 1 ? 'year' : 'years'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getHealthStatusColor(animal.healthStatus)}`}>
                      {animal.healthStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{animal.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{animal.caretaker}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {animal.nextVaccination ? (
                      <div className="text-sm text-gray-900">
                        {new Date(animal.nextVaccination.date).toLocaleDateString()} - {animal.nextVaccination.vaccine}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">No upcoming vaccinations</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => {
                        setSelectedAnimal(animal);
                        setShowEventModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Log Event
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Livestock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Add New Livestock</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Animal Type</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="">Select Type</option>
                    <option value="cow">Cow</option>
                    <option value="chicken">Chicken</option>
                    <option value="goat">Goat</option>
                    <option value="sheep">Sheep</option>
                    <option value="pig">Pig</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age (Years)</label>
                  <input type="number" min="0" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Health Status</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="healthy">Healthy</option>
                    <option value="sick">Sick</option>
                    <option value="treatment">Under Treatment</option>
                    <option value="quarantine">Quarantine</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Acquisition Date</label>
                  <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Caretaker</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="">Select Caretaker</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Sarah Johnson">Sarah Johnson</option>
                    <option value="Mike Thompson">Mike Thompson</option>
                  </select>
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea rows={3} className="w-full border border-gray-300 rounded-md px-3 py-2"></textarea>
                </div>
                
                <div className="col-span-2 flex justify-end mt-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    className="bg-green-600 text-white px-4 py-2 rounded-md"
                  >
                    Add Livestock
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {eventType === null ? 'Log Livestock Event' : `Log ${eventType.charAt(0).toUpperCase() + eventType.slice(1)} Event`}
                </h3>
                <button 
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form>
                {eventType === null && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        type="button"
                        onClick={() => setEventType('birth')}
                        className="border border-gray-300 rounded-md px-4 py-2 hover:bg-green-50 hover:border-green-500"
                      >
                        Birth
                      </button>
                      <button 
                        type="button"
                        onClick={() => setEventType('sale')}
                        className="border border-gray-300 rounded-md px-4 py-2 hover:bg-blue-50 hover:border-blue-500"
                      >
                        Sale
                      </button>
                      <button 
                        type="button"
                        onClick={() => setEventType('death')}
                        className="border border-gray-300 rounded-md px-4 py-2 hover:bg-red-50 hover:border-red-500"
                      >
                        Death
                      </button>
                    </div>
                  </div>
                )}
                
                {eventType !== null && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Animal</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                        <option value="">Select Animal</option>
                        {livestock.map(animal => (
                          <option key={animal.id} value={animal.id}>{animal.name} ({animal.type})</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    
                    {eventType === 'birth' && (
                      <>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Offspring</label>
                          <input type="number" min="1" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Health Status</label>
                          <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                            <option value="healthy">Healthy</option>
                            <option value="sick">Sick</option>
                            <option value="treatment">Needs Treatment</option>
                          </select>
                        </div>
                      </>
                    )}
                    
                    {eventType === 'sale' && (
                      <>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Sale Amount</label>
                          <input type="number" min="0" step="0.01" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Buyer Information</label>
                          <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                        </div>
                      </>
                    )}
                    
                    {eventType === 'death' && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cause of Death</label>
                        <textarea rows={3} className="w-full border border-gray-300 rounded-md px-3 py-2"></textarea>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <textarea rows={3} className="w-full border border-gray-300 rounded-md px-3 py-2"></textarea>
                    </div>
                  </>
                )}
                
                <div className="flex justify-end mt-6">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowEventModal(false);
                      setEventType(null);
                    }}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    disabled={eventType === null}
                    className={`px-4 py-2 rounded-md ${
                      eventType === null 
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    Log Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivestockPage; 