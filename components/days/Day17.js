import { FiMapPin, FiSun, FiCloud, FiLink } from 'react-icons/fi';
import { FaPlaneArrival, FaCar, FaInfoCircle, FaUserCheck, FaGift, FaShoppingBag, FaCamera } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day17({ data }) {
  const carReturn = data.items.find(i => i.type === 'car_return');
  const flight = data.items.find(i => i.type === 'flight');
  const activities = data.items.find(i => i.type === 'activities');
  const dutyFree = data.duty_free_recommendations;

  // Note: JSON date is 8/12/2025, which is the 17th day of the trip.
  const displayDate = new Date("8/12/2025"); 

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-500 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 17: Homeward Bound</h2>
          <div className="text-lg font-semibold">{displayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="text-gray-200">{data.location}</p>
      </div>

      <div className="p-4 space-y-5">
        {/* Final Activities */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg text-gray-800 mb-2">Last Icelandic Adventures</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
                <FaShoppingBag className="mr-3 text-gray-600"/>
                <p>Last-minute souvenir shopping in Reykjavik.</p>
            </div>
            <div className="flex items-center">
                <FaCamera className="mr-3 text-gray-600"/>
                <p>Scenic drive to KEF through lava fields.</p>
            </div>
          </div>
        </div>

        {/* Car Return */}
        <div className="flex">
          <FaCar className="text-gray-600 mr-4 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg">{carReturn.description}</h3>
            <p className="text-sm text-gray-600">{carReturn.fuel_requirement}. Allow 15-20 mins.</p>
          </div>
        </div>

        {/* Flight Home */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-bold text-lg text-blue-800 flex items-center mb-2">
            <FaPlaneArrival className="mr-3" /> Fly KEF → IAD
          </h3>
          <p className="font-semibold text-sm">{flight.airline} {flight.flight_number}</p>
          <div className="text-sm mt-2 space-y-1">
            <p><span className="font-semibold">Departs KEF:</span> {flight.departure.time} GMT</p>
            <p><span className="font-semibold">Arrives IAD:</span> {flight.arrival.time} EDT</p>
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
      </div>

      {/* Duty Free */}
      <div className="p-4 border-t">
          <h4 className="font-bold text-gray-800 flex items-center"><FaGift className="mr-2"/>KEF Duty-Free Picks</h4>
          <div className="text-sm mt-1 text-gray-600">
            <p>Chocolate: {dutyFree.icelandic_chocolate}, Salts: {dutyFree.salts}, Skincare: {dutyFree.skincare}.</p>
          </div>
       </div>

      {/* Family Travel Tip */}
      <div className="p-4 bg-yellow-100">
          <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
          <p className="text-yellow-700 text-sm mt-1">
            At Keflavík Airport (KEF) after you check in, 'Joe & The Juice' is a great spot for a final healthy snack or coffee. There's a well-stocked 'Eymundsson' bookstore for last-minute Icelandic reads. The airport is modern and spacious, with plenty of clean restrooms and gate-side play areas for kids to use up their last bit of energy before the flight home.
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
      <div className="bg-green-600 text-white text-center p-3 font-bold">
        <p>Trip Complete!</p>
      </div>
    </div>
  );
}