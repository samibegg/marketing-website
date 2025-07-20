import { FiMapPin, FiSun, FiCloud, FiLink } from 'react-icons/fi';
// CORRECTED: Replaced FaBridge with FaWater
import { FaLandmark, FaUtensils, FaInfoCircle, FaWater, FaUniversity, FaStore } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day10({ data }) {
  const castle = data.items.find(i => i.activity.includes('Buda Castle')).details;
  const bridge = data.items.find(i => i.activity.includes('Chain Bridge')).details;
  const options = data.items.find(i => i.activity.includes('Parliament or Central Market')).options;
  const dining = data.dining_recommendations;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-red-900 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 10: Budapest Sights</h2>
          <div className="text-lg font-semibold">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="text-red-100">{data.location}</p>
      </div>

      <div className="p-4 space-y-5">
        {/* Buda Castle */}
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
            <h3 className="font-bold text-lg text-gray-800 flex items-center mb-2">
                <FaLandmark className="mr-3" /> Visit Buda Castle & Castle Hill
            </h3>
            <p className="text-sm font-semibold">Access:</p>
            <p className="text-sm text-gray-600">{castle.access.join(' / ')}</p>
            <p className="text-sm font-semibold mt-2">Attractions:</p>
            <p className="text-sm text-gray-600">{castle.attractions.join(', ')}</p>
        </div>

        {/* Chain Bridge */}
        <div className="flex">
            {/* CORRECTED: Replaced FaBridge with FaWater */}
            <FaWater className="text-blue-500 mr-4 mt-1" size={24} />
            <div>
                <h3 className="font-bold text-lg">Walk across the {bridge.name}</h3>
                <p className="text-sm text-gray-600">A {bridge.length} walk with great Danube views.</p>
                <p className="text-xs text-gray-500 mt-1">{bridge.photo_tip}</p>
            </div>
        </div>

        {/* Afternoon Choice */}
        <div className="p-4 rounded-lg border-2 border-dashed border-gray-300">
            <h3 className="font-bold text-lg text-center text-gray-800 mb-3">Afternoon Choice</h3>
            <div className="grid grid-cols-2 gap-3 text-center">
                {/* Parliament */}
                <div>
                    <FaUniversity className="mx-auto text-gray-600" size={28}/>
                    <h4 className="font-semibold mt-1">{options[0].name}</h4>
                    <a href={options[0].booking} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">Book Tours</a>
                </div>
                {/* Central Market */}
                <div>
                    <FaStore className="mx-auto text-gray-600" size={28}/>
                    <h4 className="font-semibold mt-1">{options[1].name}</h4>
                    <p className="text-xs text-gray-500">{options[1].highlights.join(', ')}</p>
                </div>
            </div>
        </div>
      </div>
      
      {/* Dining */}
      <div className="p-4 border-t">
        <h3 className="font-bold text-lg text-gray-800 flex items-center mb-2"><FaUtensils className="mr-3"/>Dining Recommendations</h3>
        <div className="space-y-2">
            {dining.map((d,i) => (
                <div key={i} className="text-sm">
                  <div className="flex items-center font-semibold">
                    <p>{d.name}</p>
                     <a href={createMapLink(d.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                        <FiMapPin />
                    </a>
                  </div>
                  <p className="text-xs text-gray-600">Specialty: {d.specialty}</p>
                </div>
            ))}
        </div>
      </div>

      {/* Family Travel Tip */}
      <div className="p-4 bg-yellow-100">
          <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
          <p className="text-yellow-700 text-sm mt-1">
            Near the Central Market Hall, the 'Central Café' (Centrál Kávéház) is a beautifully restored historic coffee house great for a relaxing break. If you're looking for an English-language bookstore with a cozy atmosphere, 'Massolit Books & Café' in the Jewish Quarter is a fantastic find. For a comfortable and clean public restroom, use the facilities inside the Market Hall itself.
          </p>
      </div>

      {/* Vitals Section */}
      <div className="bg-gray-50 p-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center">
          <FiCloud className="text-gray-500 mr-2" size={20}/>
          <div>
            <p className="font-semibold">Weather</p>
            <p>{data.weather.temperature}</p>
          </div>
        </div>
        <div className="flex items-center">
          <FiSun className="text-gray-500 mr-2" size={20}/>
          <div>
            <p className="font-semibold">Sunset</p>
            <p>{data.sunset}</p>
          </div>
        </div>
      </div>
    </div>
  );
}