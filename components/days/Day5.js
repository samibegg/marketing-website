import { useState } from 'react';
import { FiMapPin, FiSun, FiCloud, FiLink, FiTool, FiShoppingCart } from 'react-icons/fi';
import { FaHiking, FaTram, FaTrain, FaInfoCircle, FaMountain } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day5({ data }) {
  const trails = data.items.find(i => i.activity.includes('mountain trails')).trails;
  const cableCar = data.items.find(i => i.activity.includes('Männlichen cable car')).cable_car;
  const kleineScheidegg = data.items.find(i => i.activity.includes('Kleine Scheidegg')).details;
  const rental = data.equipment_rental;
  const grocery = data.grocery_store;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-cyan-700 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 5: Mountain Views</h2>
          <div className="text-lg font-semibold">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="text-cyan-100">{data.location} Adventures</p>
      </div>

      <div className="p-4 space-y-5">
        {/* Activity 1: Mountain Trails */}
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <h3 className="font-bold text-lg text-green-800 flex items-center mb-2">
            <FaHiking className="mr-3" /> Explore Mountain Trails
          </h3>
          <div className="space-y-3">
            {trails.map((trail, index) => (
              <div key={index} className="text-sm border-t pt-2">
                <p className="font-semibold">{trail.name}</p>
                <p className="text-xs text-gray-600">Difficulty: {trail.difficulty} ({trail.duration})</p>
                <p className="text-xs text-gray-600">Highlights: {trail.highlights.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity 2: Männlichen Cable Car */}
        <div className="bg-sky-50 p-4 rounded-lg border-l-4 border-sky-400">
          <h3 className="font-bold text-lg text-sky-800 flex items-center mb-2">
            <FaTram className="mr-3" /> Ride the Männlichen Cable Car
          </h3>
          <p className="text-sm">A quick {cableCar.duration} ride up for panoramic views.</p>
          <div className="flex justify-between items-center text-sm mt-2">
            <p className="font-semibold">{cableCar.cost} return</p>
            <a href={cableCar.website} target="_blank" rel="noopener noreferrer" className="bg-sky-500 text-white font-bold py-1 px-3 rounded-md hover:bg-sky-600 flex items-center">
              <FiLink className="mr-1" /> Website
            </a>
          </div>
        </div>
        
        {/* Activity 3: Visit Kleine Scheidegg */}
         <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <h3 className="font-bold text-lg text-yellow-800 flex items-center mb-2">
            <FaMountain className="mr-3" /> Visit Kleine Scheidegg
          </h3>
          <p className="text-sm">Access via a {kleineScheidegg.access}.</p>
          <p className="text-xs text-gray-600 mt-1">Attractions: {kleineScheidegg.attractions.join(', ')}.</p>
        </div>
      </div>

      {/* Practical Info Section */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-t">
          <div className="text-sm">
            <h4 className="font-bold text-gray-800 flex items-center"><FiTool className="mr-2"/>Equipment Rental</h4>
            <div className="flex items-center">
              <p>{rental.name} ({rental.address})</p>
              <a href={createMapLink(`${rental.name}, ${rental.address}`)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                  <FiMapPin />
              </a>
            </div>
            <p className="text-xs text-gray-500">Items: {rental.items.join(', ')}</p>
          </div>
           <div className="text-sm">
            <h4 className="font-bold text-gray-800 flex items-center"><FiShoppingCart className="mr-2"/>Grocery Store</h4>
            <div className="flex items-center">
              <p>{grocery.name}</p>
              <a href={createMapLink(`${grocery.name}, Wengen`)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                  <FiMapPin />
              </a>
            </div>
            <p className="text-xs text-gray-500">{grocery.hours}</p>
          </div>
      </div>

      {/* Family Travel Tip */}
      <div className="p-4 bg-yellow-100">
          <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
          <p className="text-yellow-700 text-sm mt-1">
            In Wengen village, Café Gruebi is a cozy spot for coffee and cake, perfect for a post-hike reward. The public restrooms at the Wengen train station are clean and well-maintained. On a rainy day when high trails are slick, the 'Trümmelbach Falls' down in the valley (Day 7's original plan) are a fantastic, mostly-covered alternative as the waterfalls are inside the mountain.
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