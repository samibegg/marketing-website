import { useState } from 'react';
import { FiMapPin, FiSun, FiCloud, FiLink } from 'react-icons/fi';
import { FaCar, FaParking, FaTrain, FaHotel, FaRegSnowflake, FaHiking, FaUtensils, FaInfoCircle } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day4({ data }) {
  const driveInfo = data.items.find(i => i.activity.includes('Drive from Zurich')).route;
  const tobogganInfo = data.items.find(i => i.activity.includes('Frakigaudi Summer')).details;
  const hikeInfo = data.items.find(i => i.activity.includes('Hike at Sörenberg')).details;
  const dinnerInfo = data.items.find(i => i.activity.includes('Dinner in Interlaken')).restaurant;
  const transportInfo = data.items.find(i => i.activity.includes('Park in Lauterbrunnen')).transport;
  const hotelInfo = data.items.find(i => i.activity.includes('Check into Hotel Edelweiss')).hotel;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-green-700 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 4: To the Alps!</h2>
          <div className="text-lg font-semibold">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="text-green-100">{data.location}</p>
      </div>

      <div className="p-4 space-y-5">
        {/* Highlight Tip */}
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
            <p className="font-bold">{data.tips[0]}</p>
        </div>

        {/* Step 1: Drive */}
        <div className="flex">
          <FaCar className="text-green-600 mr-4 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg">Drive from Zurich towards the Alps</h3>
            <p className="text-sm text-gray-600">{driveInfo.duration} ({driveInfo.distance})</p>
          </div>
        </div>
        
        {/* Activity Choices */}
        <div className="p-4 rounded-lg border-2 border-dashed border-gray-300">
            <h3 className="font-bold text-lg text-center text-gray-800 mb-1">Mid-Journey Activity Choice</h3>
            <p className="text-xs text-center text-gray-500 mb-3">{data.tips[1]}</p>
            <div className="space-y-3">
                <div className="bg-sky-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-sky-800 flex items-center mb-1"><FaRegSnowflake className="mr-2" /> Option 1: {tobogganInfo.name}</h4>
                      <div className="flex items-center text-sm mb-1">
                        <p>{tobogganInfo.address}</p>
                        <a href={createMapLink(tobogganInfo.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                          <FiMapPin />
                        </a>
                      </div>
                    <p className="text-sm text-gray-700">{tobogganInfo.note}</p>
                    <a href={tobogganInfo.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mt-1 inline-block">Website</a>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-emerald-800 flex items-center mb-1"><FaHiking className="mr-2" /> Option 2: {hikeInfo.name}</h4>
                    <p className="text-sm text-gray-700">{hikeInfo.note}</p>
                      <div className="flex items-center text-sm mb-1">
                        <p>{hikeInfo.address}</p>
                        <a href={createMapLink(hikeInfo.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                          <FiMapPin />
                        </a>
                      </div>
                    <a href={hikeInfo.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mt-1 inline-block">Website</a>
                </div>
            </div>
        </div>

       {/* Family Travel Tip */}
       <div className="p-4 bg-yellow-100">
           <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
           <p className="text-yellow-700 text-sm mt-1">
             During your stop in Interlaken before heading up the mountain, Café de Paris is a popular spot for a break with great pastries. For a good bookstore, seek out 'Bücher Lüthy' right on the main street, Höheweg. If rain foils your outdoor activity plans, the St. Beatus Caves, just a short drive from Interlaken, offer a dramatic and dry underground walk along waterfalls.
           </p>
       </div>

        {/* Dinner */}
        <div className="flex">
            <FaUtensils className="text-orange-500 mr-4 mt-1" size={24} />
            <div>
                <h3 className="font-bold text-lg">Dinner at {dinnerInfo.name}</h3>
                <div className="flex items-center text-sm text-gray-600">
                  <p>{dinnerInfo.address}</p>
                  <a href={createMapLink(dinnerInfo.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                      <FiMapPin />
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-1">{dinnerInfo.note}</p>
            </div>
        </div>

        {/* Final Leg */}
        <div className="flex">
          <FaTrain className="text-green-600 mr-4 mt-1" size={24} />
          <div className="flex-1">
            <h3 className="font-bold text-lg">Final Leg: Lauterbrunnen to Wengen</h3>
            <div className="bg-gray-100 p-3 rounded-lg mt-2">
              <h4 className="font-semibold text-gray-800 flex items-center"><FaParking className="mr-2"/>Parking</h4>
              <p className="text-sm mt-1">{transportInfo.parking.name}</p>
                <div className="flex items-center text-sm mb-1">
                  <p>{transportInfo.parking.address}</p>
                  <a href={createMapLink(transportInfo.parking.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                    <FiMapPin />
                  </a>
                </div>
                <a href={transportInfo.parking.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mt-1 inline-block">Website</a>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg mt-2">
              <h4 className="font-semibold text-blue-800 flex items-center"><FaTrain className="mr-2"/>Train</h4>
              <p className="text-xs text-blue-700 mt-1">{transportInfo.train.scenic_tip}</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg mt-2">
              <h4 className="font-semibold text-emerald-800 flex items-center"><FaHotel className="mr-2"/>Hotel</h4>
              <p className="text-sm mt-1">Check into {hotelInfo.name} in Wengen</p>
                <div className="flex items-center text-sm mb-1">
                  <p>{hotelInfo.address}</p>
                  <a href={createMapLink(hotelInfo.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                    <FiMapPin />
                  </a>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 grid grid-cols-2 gap-4 text-sm border-t">
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