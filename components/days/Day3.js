import { useState } from 'react';
import { FiMapPin, FiClock, FiDollarSign, FiLink, FiAnchor, FiShoppingCart } from 'react-icons/fi';
import { FaTicketAlt, FaInfoCircle, FaHotel, FaWalking } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day3({ data }) {
  const getItem = (activityName) => data.items.find(item => item.activity.includes(activityName));
  const fifaInfo = getItem('FIFA Museum').details;
  const lindtInfo = getItem('Lindt Chocolate World').details;
  const hotelInfo = getItem('Ambassador Hotel').hotel;
  const eveningInfo = getItem('Evening walk').details;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-teal-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 3: {data.location}</h2>
          <div className="text-lg font-semibold">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="text-teal-100">A day of soccer, chocolate, and city sights!</p>
      </div>

      <div className="p-4 space-y-5">
        {/* FIFA Museum */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
          <h3 className="font-bold text-lg text-blue-800 flex items-center mb-2">
            <FaTicketAlt className="mr-3" /> Visit FIFA Museum
          </h3>
          <div className="flex items-center text-sm mb-1">
            <FiMapPin className="mr-2" />
            <p>{fifaInfo.address}</p>
            <a href={createMapLink(fifaInfo.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700 font-bold">Directions</a>
          </div>
          <p className="text-sm flex items-center mb-2"><FiClock className="mr-2" /> {fifaInfo.hours} (Suggested: {fifaInfo.suggested_time})</p>
          <div className="flex justify-between items-center text-sm">
            <p><FiDollarSign className="inline mr-1" />{fifaInfo.tickets}</p>
            <a href={fifaInfo.website} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white font-bold py-1 px-3 rounded-md hover:bg-blue-600 flex items-center">
              <FiLink className="mr-1" /> Tickets
            </a>
          </div>
        </div>

        {/* Lindt Chocolate World */}
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <h3 className="font-bold text-lg text-yellow-800 flex items-center mb-2">
            <FaTicketAlt className="mr-3" /> Tour Lindt Chocolate World
          </h3>
          <div className="flex items-center text-sm mb-1">
            <FiMapPin className="mr-2" />
            <p>{lindtInfo.address}</p>
            <a href={createMapLink(lindtInfo.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700 font-bold">Directions</a>
          </div>
          <p className="text-sm flex items-center mb-2"><FiClock className="mr-2" /> {lindtInfo.hours} (Suggested: {lindtInfo.suggested_time})</p>
          <div className="flex justify-between items-center text-sm">
            <p><FiDollarSign className="inline mr-1" />{lindtInfo.tickets}</p>
            <a href={lindtInfo.website} target="_blank" rel="noopener noreferrer" className="bg-yellow-600 text-white font-bold py-1 px-3 rounded-md hover:bg-yellow-700 flex items-center">
              <FiLink className="mr-1" /> Tickets
            </a>
          </div>
        </div>

        {/* Hotel Check-in */}
        <div className="flex">
          <FaHotel className="text-teal-500 mr-4 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg">Check into {hotelInfo.name}</h3>
            <div className="flex items-center text-sm text-gray-600">
                <p>{hotelInfo.address}</p>
                <a href={createMapLink(hotelInfo.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                  <FiMapPin />
                </a>
            </div>
            <p className="text-xs mt-1 bg-gray-100 p-1 rounded-md">{hotelInfo.location}</p>
          </div>
        </div>

        {/* Evening Walk */}
        <div className="flex">
          <FaWalking className="text-teal-500 mr-4 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg">Evening Walk</h3>
            <div className="text-sm mt-1 space-y-1">
              <p className="flex items-center"><FiAnchor className="mr-2 text-gray-600" /> Stroll along Lake Zurich</p>
              <p className="flex items-center"><FiShoppingCart className="mr-2 text-gray-600" /> Or explore Bahnhofstrasse shops</p>
            </div>
          </div>
        </div>
      </div>

       {/* Family Travel Tip */}
       <div className="p-4 bg-yellow-100">
           <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
           <p className="text-yellow-700 text-sm mt-1">
             While exploring Zurich, if you need a break, the iconic Sprüngli café at Paradeplatz is a must for hot chocolate and Luxemburgerli macarons. For a fantastic bookstore with a children's section, head to Orell Füssli on Bahnhofstrasse. If it's raining, the Swiss National Museum near the main station is an excellent, castle-like alternative with engaging exhibits.
           </p>
       </div>
    </div>
  );
}