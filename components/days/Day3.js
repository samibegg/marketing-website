import { useState } from 'react';
import { FiMapPin, FiCloudDownload } from 'react-icons/fi';
import { FaTicketAlt, FaHotel, FaCoffee, FaInfoCircle } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day3({ data }) {
  // Safely find each piece of data from the JSON
  const fifaInfo = data.items.find(item => item.activity.includes('FIFA'))?.details;
  const sprungliInfo = data.items.find(item => item.activity.includes('Sprüngli'))?.details;
  const lindtInfo = data.items.find(item => item.activity.includes('Lindt'))?.details;
  const hotelInfo = data.items.find(item => item.activity.includes('Ambassador'))?.hotel;
  const alternatePlan = data.alternate_plans?.[0];

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-teal-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 3: {data.location}</h2>
          <div className="text-lg font-semibold">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="text-teal-100">Museums, chocolate, and city sights!</p>
      </div>

      <div className="p-4 space-y-5">
        <h3 className="font-bold text-lg text-gray-800 text-center">Main Plan</h3>
        
        {/* FIFA Museum */}
        {fifaInfo && (
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-semibold text-lg text-blue-800 flex items-center mb-2">
              <FaTicketAlt className="mr-3" /> Visit FIFA Museum
            </h4>
            <div className="flex items-center text-sm mb-1">
              <p>{fifaInfo.address}</p>
              <a href={createMapLink(fifaInfo.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                <FiMapPin />
              </a>
            </div>
            <p className="text-xs text-gray-600 mt-1"><span className="font-semibold">Time:</span> {fifaInfo.suggested_time}</p>
          </div>
        )}
        
        {/* Sprüngli Cafe */}
        {sprungliInfo && (
          <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-400">
            <h4 className="font-semibold text-lg text-pink-800 flex items-center mb-2">
              <FaCoffee className="mr-3" /> Visit {sprungliInfo.name}
            </h4>
            <div className="flex items-center text-sm mb-1">
              <p>{sprungliInfo.address}</p>
              <a href={createMapLink(sprungliInfo.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                <FiMapPin />
              </a>
            </div>
            <p className="text-xs text-gray-600">{sprungliInfo.note}</p>
          </div>
        )}

        {/* Lindt Chocolate World */}
        {lindtInfo && (
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <h4 className="font-semibold text-lg text-yellow-800 flex items-center mb-2">
              <FaTicketAlt className="mr-3" /> Tour Lindt Chocolate World
            </h4>
            <div className="flex items-center text-sm mb-1">
              <p>{lindtInfo.address}</p>
              <a href={createMapLink(lindtInfo.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                <FiMapPin />
              </a>
            </div>
            <p className="text-lg font-bold text-red-600 mt-1">{lindtInfo.suggested_time}</p>
          </div>
        )}

        {/* Hotel Check-in */}
        {hotelInfo && (
            <div className="flex pt-4 border-t">
              <FaHotel className="text-teal-500 mr-4 mt-1" size={24} />
              <div>
                  <h4 className="font-bold text-lg">Check into {hotelInfo.name}</h4>
                  <div className="flex items-center text-sm text-gray-600">
                      <p>{hotelInfo.address}</p>
                      <a href={createMapLink(hotelInfo.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                        <FiMapPin />
                      </a>
                  </div>
              </div>
            </div>
        )}
      </div>

       {/* Family Travel Tip */}
       <div className="p-4 bg-yellow-100">
           <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
           <p className="text-yellow-700 text-sm mt-1">
            While in Zurich, if you need a break, the iconic Sprüngli café at Paradeplatz is a must for hot chocolate and Luxemburgerli macarons. For a fantastic bookstore with a children's section, head to Orell Füssli on Bahnhofstrasse. If it's raining, the Swiss National Museum near the main station is an excellent, castle-like alternative with engaging exhibits.
           </p>
       </div>

      {/* Alternate Plan Section */}
      {alternatePlan && (
        <div className="p-4 border-t-2 border-dashed bg-gray-50">
            <h3 className="font-bold text-gray-800 flex items-center">{alternatePlan.name}</h3>
            <div className="bg-white p-3 mt-2 rounded-lg shadow-sm">
                <h4 className="font-semibold">{alternatePlan.details?.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{alternatePlan.details?.note}</p>
                 <div className="flex items-center text-sm mt-1">
                    <FiMapPin className="mr-2" />
                    <p>{alternatePlan.details?.address}</p>
                    <a href={createMapLink(alternatePlan.details?.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700 font-bold">
                        <FiMapPin />
                    </a>
                </div>
            </div>
        </div>
      )}
      
    </div>
  );
}