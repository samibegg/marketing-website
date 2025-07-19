import { FiMapPin, FiSun, FiCloud, FiLink } from 'react-icons/fi';
import { FaSwimmer, FaTree, FaCampground, FaInfoCircle, FaTicketAlt } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day11({ data }) {
  const baths = data.items.find(i => i.activity.includes('Széchenyi')).details;
  const park = data.items.find(i => i.activity.includes('City Park')).details;
  const circus = data.items.find(i => i.activity.includes('Circus')).details;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 11: Baths & Park Fun</h2>
          <div className="text-lg font-semibold">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="text-blue-100">{data.location}</p>
      </div>

      <div className="p-4 space-y-5">
        {/* Szechenyi Baths */}
        <div className="bg-sky-50 p-4 rounded-lg border-l-4 border-sky-400">
            <h3 className="font-bold text-lg text-sky-800 flex items-center mb-2">
                <FaSwimmer className="mr-3" /> Visit Széchenyi Thermal Baths
            </h3>
            <div className="flex items-center text-sm mb-1">
                <p>{baths.address}</p>
                <a href={createMapLink(baths.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                    <FiMapPin />
                </a>
            </div>
            <p className="text-xs text-gray-500">Hours: {baths.hours}</p>
            <div className="bg-sky-100 p-2 mt-2 rounded-md text-sm">
                <p className="font-semibold">What to Bring:</p>
                <p className="text-xs">{baths.what_to_bring.join(', ')}</p>
            </div>
             <div className="text-center mt-3">
             <a href={baths.website} target="_blank" rel="noopener noreferrer" className="bg-sky-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-600">
              Visit Website
            </a>
           </div>
        </div>

        {/* City Park */}
        <div className="flex">
            <FaTree className="text-green-600 mr-4 mt-1" size={24} />
            <div>
                <h3 className="font-bold text-lg">Relax in City Park (Városliget)</h3>
                <p className="text-sm text-gray-600">Attractions: {park.attractions.join(', ')}</p>
            </div>
        </div>
        
        {/* Circus */}
        <div className="flex">
            <FaCampground className="text-red-600 mr-4 mt-1" size={24} />
            <div>
                <h3 className="font-bold text-lg">{circus.name} at 5 PM</h3>
                <p className="text-sm text-gray-600">{circus.show_duration} show, suitable for all ages.</p>
                <p className="text-xs text-red-700 font-semibold mt-1">Book tickets in advance!</p>
            </div>
        </div>
      </div>
      
      {/* Family Travel Tip */}
      <div className="p-4 bg-yellow-100 border-t">
          <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
          <p className="text-yellow-700 text-sm mt-1">
            The outdoor pools at Széchenyi are best for kids. The large "whirlpool" that spins you around in a circle is a huge hit! Don't worry about staying for hours; even a 90-minute visit is a memorable experience before heading to the park.
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