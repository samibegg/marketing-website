import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiMapPin, FiPhone, FiSun, FiCloud, FiAlertTriangle, FiDollarSign } from 'react-icons/fi';
import { FaPlaneArrival, FaCar, FaBed, FaHiking, FaUtensils, FaInfoCircle } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day2({ data }) {
  const [drivingTipsVisible, setDrivingTipsVisible] = useState(false);

  // Helper to find specific items
  const getItem = (activityName) => data.items.find(item => item.activity.includes(activityName));
  const rentalInfo = getItem('rental car').rental;
  const hotelInfo = getItem('Check into Hilton').hotel;
  const hikeInfo = getItem('Drive to Elm').destination;
  const dinnerInfo = getItem('Dinner at mit&ohne').restaurant;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 2: {data.location}</h2>
          <div className="text-lg font-semibold">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="text-purple-100">Arrival in Switzerland and an alpine adventure!</p>
      </div>

      {/* Timeline of Activities */}
      <div className="p-4 space-y-4">
        {/* Arrival */}
        <div className="flex">
          <FaPlaneArrival className="text-purple-500 mr-4 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg">Arrive ZRH @ 8:00 AM</h3>
            <p className="text-sm text-gray-600">Customs & currency exchange in arrivals hall.</p>
          </div>
        </div>

        {/* Car Rental */}
        <div className="flex">
          <FaCar className="text-purple-500 mr-4 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg">Pick up Rental Car</h3>
            <div className="flex items-center text-sm text-gray-600">
                <p>{rentalInfo.company} at {rentalInfo.location}</p>
                 <a href={createMapLink(rentalInfo.location)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                  <FiMapPin />
                </a>
            </div>
            <p className="text-sm text-gray-600 flex items-center"><FiPhone className="mr-1"/> {rentalInfo.phone}</p>
            <button onClick={() => setDrivingTipsVisible(!drivingTipsVisible)} className="text-sm text-purple-600 font-semibold flex items-center mt-1">
              {drivingTipsVisible ? <FiChevronUp className="mr-1" /> : <FiChevronDown className="mr-1" />}
              Swiss Driving Tips
            </button>
            {drivingTipsVisible && (
              <ul className="mt-2 text-xs bg-gray-50 p-2 rounded-lg list-disc list-inside space-y-1">
                {rentalInfo.swiss_driving_tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            )}
          </div>
        </div>

        {/* Hotel Check-in */}
        <div className="flex">
          <FaBed className="text-purple-500 mr-4 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg">Check into {hotelInfo.name}</h3>
            <div className="flex items-center text-sm text-gray-600">
                <p>{hotelInfo.address}</p>
                <a href={createMapLink(hotelInfo.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                  <FiMapPin />
                </a>
            </div>
            <p className="text-sm font-semibold text-red-500 bg-red-100 px-2 py-1 rounded-md mt-1 inline-block">{hotelInfo.note}</p>
          </div>
        </div>

        {/* Hiking Adventure */}
        <div className="flex">
          <FaHiking className="text-purple-500 mr-4 mt-1" size={24} />
          <div className="bg-green-50 p-3 rounded-lg flex-1">
            <h3 className="font-bold text-lg text-green-800">Hike in Elm</h3>
            <div className="flex items-center text-sm text-green-700 mb-2">
                <p>Drive to {hikeInfo.village.address}</p>
                <a href={createMapLink(hikeInfo.village.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                    <FiMapPin />
                </a>
            </div>
            <div className="text-sm border-t border-green-200 pt-2 mt-2">
              <p><span className="font-semibold">Trail:</span> {hikeInfo.hiking_info.trail_name}</p>
              <p><span className="font-semibold">Difficulty:</span> {hikeInfo.hiking_info.difficulty} ({hikeInfo.hiking_info.duration})</p>
              <p><span className="font-semibold">Bring:</span> {hikeInfo.hiking_info.what_to_bring.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Dinner */}
        <div className="flex">
          <FaUtensils className="text-purple-500 mr-4 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg">Dinner at {dinnerInfo.name}</h3>
            <div className="flex items-center text-sm text-gray-600">
                <p>{dinnerInfo.address}</p>
                <a href={createMapLink(dinnerInfo.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                  <FiMapPin />
                </a>
            </div>
            <p className="text-sm text-gray-600">Drive from hotel: ~{dinnerInfo.drive_from_hotel}</p>
          </div>
        </div>
      </div>

       {/* Family Travel Tip */}
       <div className="p-4 bg-yellow-100">
           <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
           <p className="text-yellow-700 text-sm mt-1">
            After a long flight, a hike is a great way to fight jet lag. For the kids, turn the Elm trail into a game: who can spot the most unique flower or find the coolest-looking rock? Promise a Swiss hot chocolate in the village afterwards as a reward.
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
          <div className="flex items-center">
              <FiDollarSign className="text-gray-500 mr-2" size={20}/>
              <div>
                <p className="font-semibold">Currency</p>
                <p>{data.currency.local} (Cards widely accepted)</p>
              </div>
          </div>
          <div className="flex items-center">
              <FiAlertTriangle className="text-red-500 mr-2" size={20}/>
              <div>
                <p className="font-semibold">Emergency</p>
                <p>Medical: 144, Police: 117</p>
              </div>
          </div>
      </div>
    </div>
  );
}