import { FiMapPin, FiSun, FiCloud, FiDollarSign, FiAlertTriangle, FiLink, FiDownload, FiCheckSquare } from 'react-icons/fi';
import { FaPlaneDeparture, FaCar, FaHotel, FaInfoCircle, FaUserCheck, FaHotTub } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day15({ data }) {
  const flight = data.items.find(i => i.type === 'flight');
  const carRental = data.items.find(i => i.type === 'car_rental');
  const accommodation = data.items.find(i => i.type === 'accommodation');
  const bookings = data.advance_bookings;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 15: To Iceland!</h2>
          <div className="text-lg font-semibold">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="text-gray-300">{data.location}</p>
      </div>

      <div className="p-4 space-y-5">
        {/* Flight */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-bold text-lg text-blue-800 flex items-center mb-2">
            <FaPlaneDeparture className="mr-3" /> Fly CPH → KEF
          </h3>
          <p className="font-semibold text-sm">{flight.airline} {flight.flight_number}</p>
          <div className="text-sm mt-2 space-y-1">
            <p><span className="font-semibold">Departs CPH:</span> {flight.departure.time} CET</p>
            <p><span className="font-semibold">Arrives KEF:</span> {flight.arrival.time} GMT</p>
          </div>
           <div className="grid grid-cols-2 gap-2 text-sm mt-3">
            <a href={flight.check_in_url} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white text-center font-bold py-2 px-3 rounded-lg flex items-center justify-center shadow-sm hover:bg-green-600">
                <FaUserCheck className="mr-2" /> Check-In
            </a>
            <a href={flight.flight_status_url} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white text-center font-bold py-2 px-3 rounded-lg flex items-center justify-center shadow-sm hover:bg-blue-600">
                <FiLink className="mr-2" /> Flight Status
            </a>
            <p><span className="font-semibold">Confirmation:</span> <span className="font-mono bg-gray-200 px-1 rounded">{flight.confirmation}</span></p>
          </div>
        </div>
        
        {/* Car & Hotel */}
        <div className="flex">
          <FaCar className="text-gray-600 mr-4 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg">Pick up {carRental.company} Car</h3>
            <p className="text-sm text-gray-600">Location: {carRental.location}</p>
          </div>
        </div>
        <div className="flex">
          <FaHotel className="text-gray-600 mr-4 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg">Check in to Hotel</h3>
            <p className="text-sm text-gray-600">e.g., {accommodation.estimated_hotels[0].name} or {accommodation.estimated_hotels[1].name}</p>
          </div>
        </div>
      </div>
      
      {/* Crucial Info */}
      <div className="p-4 border-t space-y-4">
        <div className="bg-red-100 text-red-800 p-3 rounded-lg">
          <h4 className="font-bold flex items-center"><FiAlertTriangle className="mr-2"/>Book in Advance!</h4>
          <div className="text-sm mt-2">
            <FaHotTub className="inline mr-2"/>
            <a href={bookings.blue_lagoon.booking_url} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">Blue Lagoon</a> or <a href={bookings.sky_lagoon.booking_url} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">Sky Lagoon</a>
            <p className="text-xs">{bookings.blue_lagoon.advance_notice}</p>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <h4 className="font-bold text-gray-800 flex items-center"><FiDownload className="mr-2"/>Essential Apps & Packing</h4>
          <div className="text-sm mt-2">
            <p><span className="font-semibold">Apps:</span> {data.useful_apps.weather.name} (weather), {data.useful_apps.road_conditions.website} (road conditions)</p>
            <p className="mt-1"><span className="font-semibold">Pack:</span> {data.packing_essentials.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Family Travel Tip */}
      <div className="p-4 bg-yellow-100">
          <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
          <p className="text-yellow-700 text-sm mt-1">
            Upon arriving in Reykjavik, 'Brauð & Co.' is a must-visit bakery known for its incredible cinnamon buns—a perfect welcome snack. For a great bookstore with a cozy café inside, find 'Eymundsson' on Austurstræti. If it's a rainy evening, the 'Perlan' museum offers an amazing indoor ice cave exhibit and a 360° view of the city.
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
            <p>{data.currency} (ISK)</p>
          </div>
        </div>
        <div className="flex items-center">
          <FiAlertTriangle className="text-red-500 mr-2" size={20}/>
          <div>
            <p className="font-semibold">Emergency</p>
            <p>Call {data.emergency_number}</p>
          </div>
        </div>
      </div>
    </div>
  );
}