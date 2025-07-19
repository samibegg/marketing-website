import { FiMapPin, FiSun, FiCloud, FiDollarSign, FiAlertTriangle, FiLink } from 'react-icons/fi';
import { FaPlaneDeparture, FaHotel, FaInfoCircle, FaUserCheck, FaSubway, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day12({ data }) {
  const flight = data.items.find(i => i.type === 'flight');
  const accommodation = data.items.find(i => i.type === 'accommodation');
  const airportTransport = data.transportation.airport_to_city.metro_m2;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-red-800 text-white p-4" style={{ backgroundColor: '#C60C30' }}> {/* Danish Red */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 12: Copenhagen!</h2>
          <div className="text-lg font-semibold">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="opacity-90">{data.location}, Denmark</p>
      </div>

      <div className="p-4 space-y-5">
        {/* Step 1: Hotel Checkout */}
         <div className="flex">
            <FaSignOutAlt className="text-gray-500 mr-4 mt-1" size={24} />
            <div>
                <h3 className="font-bold text-lg">Check out of {accommodation.checkout_hotel.name}</h3>
                <p className="text-sm text-gray-600">Time: By {accommodation.checkout_hotel.checkout_time}</p>
            </div>
        </div>

        {/* Step 2: Flight */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-bold text-lg text-blue-800 flex items-center mb-2">
            <FaPlaneDeparture className="mr-3" /> Fly to Copenhagen (CPH)
          </h3>
          <p className="font-semibold text-sm">{flight.airline} {flight.flight_number}</p>
          <div className="text-sm mt-2 space-y-1">
            <p><span className="font-semibold">Departs BUD:</span> {flight.departure.time}</p>
            <p><span className="font-semibold">Arrives CPH:</span> {flight.arrival.time}</p>
          </div>
           <div className="grid grid-cols-2 gap-2 text-sm mt-3">
            <a href={flight.check_in_url} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white text-center font-bold py-2 px-3 rounded-lg flex items-center justify-center shadow-sm hover:bg-green-600">
                <FaUserCheck className="mr-2" /> Check-In
            </a>
            <a href={flight.flight_status_url} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white text-center font-bold py-2 px-3 rounded-lg flex items-center justify-center shadow-sm hover:bg-blue-600">
                <FiLink className="mr-2" /> Flight Status
            </a>
        </div>
        </div>

        {/* Step 3: Hotel Check-in */}
        <div className="flex">
          <FaSignInAlt className="text-gray-500 mr-4 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg">Check into {accommodation.checkin_hotel.name}</h3>
             <div className="flex items-center text-sm text-gray-600">
                <p>{accommodation.checkin_hotel.address}</p>
                <a href={createMapLink(accommodation.checkin_hotel.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                    <FiMapPin />
                </a>
            </div>
          </div>
        </div>
      </div>

      {/* Family Travel Tip */}
      <div className="p-4 bg-yellow-100 border-t">
          <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
          <p className="text-yellow-700 text-sm mt-1">
            Getting from CPH airport to the city is incredibly easy. The Metro (M2 line) is right in Terminal 3. You can tap a contactless credit card to pay for the whole family. Once checked in, a short walk to Nyhavn to see the famous colorful houses is a perfect, low-energy first activity.
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
         <div className="flex items-center">
          <FiDollarSign className="text-gray-500 mr-2" size={20}/>
          <div>
            <p className="font-semibold">Currency</p>
            <p>{data.currency} (DKK)</p>
          </div>
        </div>
        <div className="flex items-center">
          <FiAlertTriangle className="text-red-500 mr-2" size={20}/>
          <div>
            <p className="font-semibold">Emergency</p>
            <p>Call {data.emergency_number}</p>
          </div>
        </div>
         <div className="flex items-center col-span-2">
          <FaSubway className="text-gray-500 mr-2" size={20}/>
          <div>
            <p className="font-semibold">Airport Metro (M2)</p>
            <p className="text-xs">{airportTransport.duration} to city, runs every {airportTransport.frequency}</p>
          </div>
        </div>
      </div>
    </div>
  );
}