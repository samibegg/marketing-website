import { useState } from 'react';
import { FiMapPin, FiSun, FiCloud, FiLink, FiAlertTriangle, FiDollarSign } from 'react-icons/fi';
import { FaMountain, FaWater, FaWalking, FaInfoCircle, FaTrain } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day7({ data }) {
  const jungfrau = data.items.find(i => i.activity.includes('Jungfraujoch')).details;
  const trummelbach = data.items.find(i => i.activity.includes('Trümmelbach')).details;
  const lauterbrunnen = data.items.find(i => i.activity.includes('Walk Lauterbrunnen')).route;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-red-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 7: High Alpine Trip</h2>
          <div className="text-lg font-semibold">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="text-red-100">{data.location} Day Trip Options</p>
      </div>

      <div className="p-4 space-y-5">
        {/* Option 1: Jungfraujoch */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-bold text-lg text-blue-800 flex items-center mb-2">
            <FaMountain className="mr-3" /> Optional: Jungfraujoch
          </h3>
          <p className="text-sm text-blue-700 font-semibold">{jungfrau.name}</p>
          <div className="mt-2 text-sm space-y-1">
              {/* CORRECTED LINE BELOW */}
              <p><FaTrain className="inline mr-2"/>~{jungfrau.train.duration} train each way</p>
              <p><FiDollarSign className="inline mr-2"/>{jungfrau.train.cost} return</p>
          </div>
          <div className="bg-red-100 text-red-800 p-2 mt-3 rounded-lg text-xs space-y-1">
             <p className="font-bold flex items-center"><FiAlertTriangle className="mr-2"/>Must Know:</p>
             <ul className="list-disc list-inside ml-1">
                {jungfrau.tips.map((tip, i) => <li key={i}>{tip}</li>)}
             </ul>
          </div>
           <div className="text-center mt-3">
             <a href={jungfrau.train.booking} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600">
              Book Jungfraujoch Tickets
            </a>
           </div>
        </div>

        {/* Option 2: Trümmelbach Falls */}
        <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
          <h3 className="font-bold text-lg text-teal-800 flex items-center mb-2">
            <FaWater className="mr-3" /> Visit Trümmelbach Falls
          </h3>
          <p className="text-sm">{trummelbach.description}</p>
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <p>{trummelbach.address}</p>
            <a href={createMapLink(trummelbach.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
              <FiMapPin />
            </a>
          </div>
           <p className="text-xs text-gray-500 mt-1">Access via {trummelbach.access}</p>
        </div>

        {/* Option 3: Lauterbrunnen Valley */}
         <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <h3 className="font-bold text-lg text-green-800 flex items-center mb-2">
            <FaWalking className="mr-3" /> Walk Lauterbrunnen Valley
          </h3>
          <p className="text-sm">A relaxing {lauterbrunnen.duration} walk on the valley floor.</p>
          <p className="text-xs text-gray-600 mt-1">Highlights: {lauterbrunnen.highlights.join(', ')}</p>
        </div>
      </div>

      {/* Family Travel Tip */}
      <div className="p-4 bg-yellow-100">
          <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
          <p className="text-yellow-700 text-sm mt-1">
            Before committing to the expensive Jungfraujoch trip, check the mountaintop webcams online that morning! If it's cloudy, you won't see a thing. Trümmelbach Falls is a fantastic "plan B" as it's just as impressive on a rainy day.
          </p>
      </div>

      {/* Vitals Section */}
      <div className="bg-gray-50 p-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center">
          <FiCloud className="text-gray-500 mr-2" size={20}/>
          <div>
            <p className="font-semibold">Weather</p>
            <p>{data.weather.temperature}</p>
            <p className="text-xs text-blue-600 font-bold">{data.weather.jungfraujoch}</p>
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