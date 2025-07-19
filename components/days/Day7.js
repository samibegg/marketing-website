import { FiMapPin, FiSun, FiCloud, FiLink } from 'react-icons/fi';
import { FaRoute, FaChild, FaHiking, FaStore, FaInfoCircle } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day7({ data }) {
  const travel = data.items.find(i => i.activity.includes('Travel from Wengen')).details;
  const murrenActivities = data.items.find(i => i.activity.includes('Explore Mürren')).details;
  const hike = data.items.find(i => i.activity.includes('Hike from Mürren')).details;
  const gimmelwald = data.items.find(i => i.activity.includes('Visit Gimmelwald')).details[0];

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-purple-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 7: Mürren Adventure</h2>
          <div className="text-lg font-semibold">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="text-purple-100">{data.location}</p>
      </div>

      <div className="p-4 space-y-5">
        {/* Travel */}
        <div className="flex">
          <FaRoute className="text-gray-500 mr-4 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg">Getting There</h3>
            <p className="text-sm text-gray-600">{travel.route}</p>
            <p className="text-xs text-gray-500">{travel.note}</p>
          </div>
        </div>

        {/* Mürren Activities */}
        <div className="bg-sky-50 p-4 rounded-lg border-l-4 border-sky-500">
            <h3 className="font-bold text-lg text-sky-800 mb-2">In Mürren...</h3>
            <div className="space-y-3">
                {murrenActivities.map((activity, i) => (
                    <div key={i}>
                        <h4 className="font-semibold flex items-center"><FaChild className="mr-2"/>{activity.name}</h4>
                        <p className="text-sm text-gray-700">{activity.access}</p>
                        <a href={activity.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">Learn More</a>
                    </div>
                ))}
            </div>
        </div>

        {/* Hike */}
        <div className="flex">
            <FaHiking className="text-green-600 mr-4 mt-1" size={24} />
            <div>
                <h3 className="font-bold text-lg">Hike down to Gimmelwald</h3>
                <p className="text-sm text-gray-600">{hike.difficulty} ({hike.duration})</p>
                <p className="text-xs text-green-700 font-semibold">{hike.note}</p>
            </div>
        </div>

        {/* Gimmelwald */}
        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
            <h3 className="font-bold text-lg text-orange-800 flex items-center mb-2"><FaStore className="mr-3"/> {gimmelwald.name}</h3>
            <div className="flex items-center text-sm mb-1">
                <p>{gimmelwald.address}</p>
                <a href={createMapLink(gimmelwald.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                    <FiMapPin />
                </a>
            </div>
            <p className="text-xs text-orange-700 font-semibold">{gimmelwald.note}</p>
        </div>
      </div>
      
      {/* Family Travel Tip */}
      <div className="p-4 bg-yellow-100 border-t">
          <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
          <p className="text-yellow-700 text-sm mt-1">
            Let the kids burn off energy at the Flower Playground before you start the easy, paved walk down to Gimmelwald. The promise of picking a treat from the Honesty Shop is the perfect motivation to complete the walk!
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