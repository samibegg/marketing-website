import { FiMapPin, FiSun, FiCloud, FiLink } from 'react-icons/fi';
import { FaHotel, FaTrain, FaCar, FaHiking, FaRegSnowflake, FaUtensils, FaInfoCircle } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day6({ data }) {
  const transfer = data.items.find(i => i.activity.includes('Hotel Transfer')).details;
  const drive = data.items.find(i => i.activity.includes('Drive Lauterbrunnen')).details;
  const firstHike = data.items.find(i => i.activity.includes('Grindelwald-First')).details;
  const pfingstegg = data.items.find(i => i.activity.includes('Pfingstegg Toboggan')).details;
  const returnTrip = data.items.find(i => i.activity.includes('Return to Wengen')).details;
  const dining = data.dining;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-blue-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 6: Grindelwald Trip</h2>
          <div className="text-lg font-semibold">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="text-blue-100">{data.location}</p>
      </div>

      <div className="p-4 space-y-5">
        {/* Step 1: Morning Logistics */}
        <div className="flex">
          <FaHotel className="text-gray-500 mr-4 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg">Morning: Hotel Swap & Depart</h3>
            <ol className="list-decimal list-inside text-sm text-gray-600 mt-1">
              <li>{transfer.step1}</li>
              <li>{transfer.step2}</li>
              <li>{transfer.step3}</li>
            </ol>
          </div>
        </div>
        
        {/* Step 2: Grindelwald Activities */}
        <div className="p-4 rounded-lg border-2 border-dashed border-gray-300">
            <h3 className="font-bold text-lg text-center text-gray-800 mb-3">Grindelwald Adventures</h3>
            <div className="space-y-3">
                <div className="bg-sky-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-sky-800 flex items-center mb-1"><FaHiking className="mr-2" /> {firstHike.name}</h4>
                    <p className="text-sm text-gray-700">Main attraction: {firstHike.attraction}.</p>
                    <a href={firstHike.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mt-1 inline-block">Website</a>
                    <div className="flex items-center text-sm mb-1">
                      <p>{firstHike.address}</p>
                      <a href={createMapLink(firstHike.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                        <FiMapPin />
                      </a>
                    </div>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-emerald-800 flex items-center mb-1"><FaRegSnowflake className="mr-2" /> {pfingstegg.name}</h4>
                    <p className="text-sm text-gray-700">{pfingstegg.note}</p>
                    <a href={pfingstegg.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mt-1 inline-block">Website</a>
                </div>
            </div>
        </div>
        
        {/* Step 3: Return to Wengen */}
         <div className="flex">
          <FaTrain className="text-gray-500 mr-4 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg">Evening: Return to Wengen</h3>
            <ol className="list-decimal list-inside text-sm text-gray-600 mt-1">
                <li>{returnTrip.step1}</li>
                <li>{returnTrip.step2}</li>
                <li>{returnTrip.step3}</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Dinner */}
       <div className="p-4 border-t">
        <h3 className="font-bold text-lg text-gray-800 flex items-center mb-2"><FaUtensils className="mr-3"/>Dinner in Wengen</h3>
        <div className="space-y-2">
            {dining.map((d,i) => (
                <div key={i} className="text-sm">
                  <div className="flex items-center font-semibold">
                    <p>{d.name}</p>
                     <a href={createMapLink(`${d.name}, Wengen, Switzerland`)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
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
            While in Grindelwald, the 'Sportzentrum' has an indoor swimming pool and ice rink that serves as a perfect rainy-day backup plan. For a classic café experience, stop by 'Bäckerei-Konditorei-Café Ringgenberg'. Comfortable, public restrooms are available at the Grindelwald-First gondola station.
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