import { FiMapPin, FiSun, FiCloud, FiLink } from 'react-icons/fi';
import { FaMagic, FaAnchor, FaCookieBite, FaInfoCircle, FaShip, FaLandmark } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day13({ data }) {
  const tivoli = data.items.find(i => i.name === 'Tivoli Gardens');
  const nyhavn = data.items.find(i => i.name === 'Nyhavn');
  const pastries = data.items.find(i => i.type === 'food');
  const nearby = data.nearby_attractions.rosenborg_castle;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-purple-700 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 13: Tivoli & Nyhavn</h2>
          <div className="text-lg font-semibold">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="text-purple-100">{data.location}</p>
      </div>

      <div className="p-4 space-y-5">
        {/* Tivoli Gardens */}
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-bold text-lg text-yellow-800 flex items-center mb-2">
                <FaMagic className="mr-3" /> Visit Tivoli Gardens
            </h3>
            <div className="flex items-center text-sm mb-1">
                <p>{tivoli.address}</p>
                <a href={createMapLink(tivoli.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                    <FiMapPin />
                </a>
            </div>
            <p className="text-xs text-gray-500">Hours: {tivoli.hours}</p>
            <p className="text-xs text-gray-500 mt-1">{tivoli.special_notes}</p>
             <div className="text-center mt-3">
             <a href={tivoli.booking_url} target="_blank" rel="noopener noreferrer" className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600">
              Buy Tickets
            </a>
           </div>
        </div>

        {/* Nyhavn */}
        <div className="bg-sky-50 p-4 rounded-lg border-l-4 border-sky-500">
            <h3 className="font-bold text-lg text-sky-800 flex items-center mb-2">
                <FaAnchor className="mr-3" /> Explore Nyhavn
            </h3>
            <p className="text-sm">{nyhavn.description}</p>
            <div className="flex items-center text-sm text-gray-600 mt-2">
                <FaShip className="mr-2"/>
                <p>Canal tours available ({nyhavn.canal_tours.duration}, ~{nyhavn.canal_tours.cost})</p>
            </div>
        </div>
        
        {/* Pastries */}
        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
            <h3 className="font-bold text-lg text-orange-800 flex items-center mb-2">
                <FaCookieBite className="mr-3" /> Eat Danish Pastries
            </h3>
            <div className="space-y-1 text-sm">
                {pastries.recommended_locations.map((loc, i) => (
                    <div key={i} className="flex items-center">
                        <p>{loc.name} ({loc.specialty})</p>
                        <a href={createMapLink(`${loc.name} ${loc.address}`)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                            <FiMapPin />
                        </a>
                    </div>
                ))}
            </div>
        </div>
      </div>
      
      {/* Nearby */}
      <div className="p-4 border-t">
          <h4 className="font-bold text-gray-800 flex items-center"><FaLandmark className="mr-2"/>Also Nearby</h4>
          <div className="text-sm mt-1 text-gray-600">
            <p className="font-semibold">Rosenborg Castle (Crown Jewels)</p>
            <p className="text-xs">{nearby.address}</p>
          </div>
       </div>


      {/* Family Travel Tip */}
      <div className="p-4 bg-yellow-100">
          <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
          <p className="text-yellow-700 text-sm mt-1">
            Near Tivoli Gardens, 'Conditori La Glace' is Copenhagen's oldest and most famous confectionary, an unforgettable stop for cake and coffee. 'Politikens Boghal' is a great bookstore right near the main walking street, Strøget. For a rainy day, the 'Ripley's Believe It or Not!' right on City Hall Square is a fun and quirky indoor alternative.
          </p>
      </div>

      {/* Vitals Section */}
      <div className="bg-gray-50 p-4 grid grid-cols-2 gap-4 text-sm">
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