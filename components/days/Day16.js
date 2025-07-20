import { FiMapPin, FiSun, FiCloud, FiLink, FiAlertTriangle } from 'react-icons/fi';
import { FaRoute, FaLandmark, FaWind, FaWater, FaInfoCircle, FaHorse, FaHotTub, FaGasPump } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day16({ data }) {
  const goldenCircle = data.items.find(i => i.name === 'Golden Circle');
  const stops = goldenCircle.route;
  const spas = data.items.find(i => i.name.includes('Secret Lagoon')).secret_lagoon;
  const tomatoFarm = data.special_experiences.friðheimar_tomato_farm;
  const driving = data.driving_essentials;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-yellow-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 16: Golden Circle</h2>
          <div className="text-lg font-semibold">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="text-yellow-100">{data.location}</p>
      </div>

      <div className="p-4">
          <div className="flex items-center text-center bg-gray-100 p-2 rounded-lg mb-4">
            <FaRoute className="text-gray-600 mr-3" size={20}/>
            <p className="text-sm text-gray-700">A full-day scenic drive ({goldenCircle.total_distance})</p>
          </div>

          {/* Stops Timeline */}
          <ol className="relative border-l border-gray-200 space-y-5">
            {stops.map((stop, index) => (
              <li key={index} className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                  <p className="font-bold text-blue-800">{index + 1}</p>
                </span>
                <h3 className="font-semibold text-lg">{stop.stop}</h3>
                <p className="text-xs text-gray-500">{stop.highlights}</p>
                 <a href={createMapLink(stop.address)} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-500 hover:text-blue-700 mt-1">
                    <FiMapPin size={14}/>
                </a>
              </li>
            ))}
          </ol>
      </div>
      
      {/* Optional Experiences */}
      <div className="p-4 border-t space-y-4">
        <h3 className="font-bold text-lg text-gray-800">Along the Way...</h3>
        <div className="bg-green-50 p-3 rounded-lg text-sm">
          <p className="font-semibold flex items-center"><FaHorse className="mr-2"/>Pet Icelandic Horses</p>
          <p className="text-xs">Look for farms offering respectful encounters.</p>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg text-sm">
           <p className="font-semibold flex items-center">Eat at {tomatoFarm.name}</p>
            <p className="text-xs">{tomatoFarm.specialty} ({tomatoFarm.reservation}!).</p>
             <a href={createMapLink(tomatoFarm.address)} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-500 hover:text-blue-700 mt-1">
                <FiMapPin size={14}/>
            </a>
        </div>
         <div className="bg-sky-50 p-3 rounded-lg text-sm">
          <p className="font-semibold flex items-center"><FaHotTub className="mr-2"/>Relax in a Geothermal Spa</p>
          <p className="text-xs">Try the <a href={spas.booking_url} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">Secret Lagoon</a> (less crowded alternative).</p>
        </div>
      </div>

      {/* Family Travel Tip & Driving Info */}
      <div className="p-4 border-t bg-gray-50">
          <div className="p-3 bg-yellow-100 rounded-lg">
              <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
              <p className="text-yellow-700 text-sm mt-1">
                On the Golden Circle route, the Visitor Centre at Þingvellir National Park has clean restrooms and a small café, making it a good first stop. At the Geysir area, the 'Geysir Center' across the street is a large complex with shops, multiple food options (from soup to sandwiches), and well-maintained bathrooms, perfect for a midway break.
              </p>
          </div>
          <div className="p-3 bg-red-100 rounded-lg mt-3">
              <h4 className="font-bold text-red-800 flex items-center"><FaGasPump className="mr-2"/>Driving Tip</h4>
              <p className="text-red-700 text-sm mt-1">{driving.fuel_stations.tip}. Most stations are self-serve and require a credit card with a PIN.</p>
          </div>
      </div>

      {/* Vitals Section */}
      <div className="bg-gray-100 p-4 grid grid-cols-2 gap-4 text-sm border-t">
        <div className="flex items-center">
          <FiCloud className="text-gray-500 mr-2" size={20}/>
          <div>
            <p className="font-semibold">Weather</p>
            <p>{data.weather}</p>
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