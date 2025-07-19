import { useState } from 'react';
import { FiMapPin, FiSun, FiCloud } from 'react-icons/fi';
import { FaHotel, FaSignOutAlt, FaSignInAlt, FaWalking, FaSpa, FaUtensils, FaInfoCircle } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day6({ data }) {
  const hotels = data.items.find(i => i.activity.includes('Check out')).hotels;
  const strollHighlights = data.items.find(i => i.activity.includes('Stroll')).highlights;
  const spaInfo = data.items.find(i => i.activity.includes('Relax or spa')).spa_options;
  const dining = data.dining;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 6: Relax & Recharge</h2>
          <div className="text-lg font-semibold">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="text-indigo-100">{data.location}</p>
      </div>

      <div className="p-4 space-y-5">
        {/* Hotel Transfer */}
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-400">
          <h3 className="font-bold text-lg text-indigo-800 flex items-center mb-2">
            <FaHotel className="mr-3" /> Hotel Transfer
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <FaSignOutAlt className="mr-3 mt-1 text-gray-500" />
              <div>
                <p className="font-semibold">Check out of {hotels.checkout.hotel}</p>
                <p className="text-sm text-gray-600">Time: By {hotels.checkout.time}</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaSignInAlt className="mr-3 mt-1 text-gray-500" />
              <div>
                <p className="font-semibold">Check into {hotels.checkin.hotel}</p>
                 <div className="flex items-center text-sm text-gray-600">
                    <p>{hotels.checkin.address}</p>
                    <a href={createMapLink(`${hotels.checkin.hotel}, ${hotels.checkin.address}`)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                        <FiMapPin />
                    </a>
                </div>
                <p className="text-sm text-gray-600">Time: After {hotels.checkin.check_in}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Leisure Activities */}
        <div className="p-4 rounded-lg">
          <h3 className="font-bold text-lg text-gray-800 mb-2">Afternoon Options</h3>
           <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <FaWalking className="mr-3 text-gray-500"/>
                <p>Stroll around Wengen village & see the sights</p>
              </div>
              <div className="flex items-center">
                <FaSpa className="mr-3 text-gray-500"/>
                <p>Relax at the {spaInfo.hotel_spa}</p>
              </div>
           </div>
        </div>
        
        {/* Dining Suggestions */}
        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
            <h3 className="font-bold text-lg text-orange-800 flex items-center mb-2">
              <FaUtensils className="mr-3" /> Dinner Ideas
            </h3>
            <div className="space-y-2">
              {dining.map((d, i) => (
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
      </div>

      {/* Family Travel Tip */}
      <div className="p-4 bg-yellow-100">
          <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
          <p className="text-yellow-700 text-sm mt-1">
            A "nothing" day is essential on a long family trip. Frame the hotel change as an adventure to a "new castle." Let the kids pick the dinner spot from the suggestions. This gives them ownership and makes a simple meal feel like a special treat.
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