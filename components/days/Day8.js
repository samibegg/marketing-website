import { useState } from 'react';
import { FiMapPin, FiSun, FiCloud, FiAlertTriangle } from 'react-icons/fi';
import { FaTrain, FaCar, FaHotel, FaWalking, FaInfoCircle, FaLandmark } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day8({ data }) {
  const travel = data.items.find(i => i.activity.includes('Train to Lauterbrunnen')).route;
  const hotel = data.items.find(i => i.activity.includes('Check into Homely')).hotel;
  const evening = data.items.find(i => i.activity.includes('stroll by the Rhine')).details;
  const attractions = data.attractions;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-red-700 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 8: Basel Bound</h2>
          <div className="text-lg font-semibold">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="text-red-100">{data.location}</p>
      </div>

      <div className="p-4 space-y-5">
        {/* Travel */}
        <div className="flex">
          <FaCar className="text-red-600 mr-4 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg">Travel to Basel</h3>
            <p className="text-sm text-gray-600"><FaTrain className="inline mr-1"/>{travel.train}</p>
            <p className="text-sm text-gray-600"><FaCar className="inline mr-1"/>{travel.drive}</p>
          </div>
        </div>

        {/* Hotel Check-in */}
        <div className="flex">
          <FaHotel className="text-red-600 mr-4 mt-1" size={24} />
          <div className="flex-1">
            <h3 className="font-bold text-lg">Check into {hotel.name}</h3>
            <div className="flex items-center text-sm text-gray-600">
                <p>{hotel.address}</p>
                <a href={createMapLink(hotel.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                    <FiMapPin />
                </a>
            </div>
            <div className="bg-orange-100 text-orange-800 p-2 mt-2 rounded-lg text-xs">
                <p className="font-bold flex items-center"><FiAlertTriangle className="mr-2"/>Cross-Border Note</p>
                [cite_start]<p className="mt-1">{hotel.location_note} [cite: 53] Passport may be required for check-in. [cite_start]Currency is Euro (EUR)[cite: 53].</p>
            </div>
          </div>
        </div>

        {/* Evening Stroll */}
        <div className="flex">
          <FaWalking className="text-red-600 mr-4 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg">Evening Stroll by the Rhine</h3>
            [cite_start]<p className="text-sm text-gray-600">Route: {evening.route} [cite: 55]</p>
          </div>
        </div>
      </div>

      {/* Basel Sights */}
       <div className="p-4 border-t">
          <h4 className="font-bold text-gray-800 flex items-center mb-2"><FaLandmark className="mr-2"/>Quick Sights in Basel</h4>
          <div className="space-y-2 text-sm">
             {attractions.map((attraction, i) => (
                <div key={i} className="flex items-center text-gray-600">
                   <p>{attraction.name} ({attraction.highlights ? attraction.highlights.join(', ') : attraction.description})</p>
                    <a href={createMapLink(`${attraction.name}, Basel, Switzerland`)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                        <FiMapPin />
                    </a>
                </div>
             ))}
          </div>
       </div>

      {/* Family Travel Tip */}
      <div className="p-4 bg-yellow-100">
          <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
          <p className="text-yellow-700 text-sm mt-1">
            Make the border crossing fun for the kids: "We're sleeping in France tonight!" It's a great chance to talk about how close countries are in Europe. The Tinguely Fountain is a must-see for children—the playful, clanking sculptures are endlessly entertaining.
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