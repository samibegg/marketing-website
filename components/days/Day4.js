import { useState } from 'react';
import { FiMapPin, FiSun, FiCloud, FiInfo } from 'react-icons/fi';
import { FaCar, FaParking, FaTrain, FaHotel, FaInfoCircle, FaCamera } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day4({ data }) {
  const driveInfo = data.items.find(i => i.activity.includes('Drive Zurich')).route;
  const transportInfo = data.items.find(i => i.activity.includes('Park in Lauterbrunnen')).transport;
  const hotelInfo = data.items.find(i => i.activity.includes('Check into Hotel Edelweiss')).hotel;
  const nearbyAttraction = data.attractions_nearby[0];

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

      {/* Timeline of Travel */}
      <div className="p-4 space-y-5">
        {/* Step 1: Drive */}
        <div className="flex">
          <FaCar className="text-green-600 mr-4 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg">Drive Zurich → Lauterbrunnen</h3>
            <p className="text-sm text-gray-600">{driveInfo.duration} ({driveInfo.distance})</p>
            <p className="text-xs mt-1 text-gray-500">Scenic stops: {driveInfo.scenic_stops.join(', ')}</p>
          </div>
        </div>

        {/* Step 2: Park & Train */}
        <div className="flex">
          <FaTrain className="text-green-600 mr-4 mt-1" size={24} />
          <div className="flex-1">
            <h3 className="font-bold text-lg">Park & Take Train to Wengen</h3>
            {/* Parking Info */}
            <div className="bg-gray-100 p-3 rounded-lg mt-2">
              <h4 className="font-semibold text-gray-800 flex items-center"><FaParking className="mr-2"/>Park in Lauterbrunnen</h4>
              <div className="flex items-center text-sm mt-1">
                  <p>{transportInfo.parking.name}</p>
                  <a href={createMapLink(transportInfo.parking.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                    <FiMapPin />
                  </a>
              </div>
              <p className="text-xs text-gray-600">{transportInfo.parking.cost}</p>
            </div>
            {/* Train Info */}
            <div className="bg-blue-50 p-3 rounded-lg mt-2">
              <h4 className="font-semibold text-blue-800 flex items-center"><FaTrain className="mr-2"/>Train to Wengen</h4>
              <p className="text-sm mt-1">{transportInfo.train.duration} ride via {transportInfo.train.operator}</p>
              <p className="text-xs text-gray-600">Runs every {transportInfo.train.frequency}, ~{transportInfo.train.cost}</p>
              <p className="font-bold text-xs text-blue-700 mt-1">{transportInfo.train.scenic_tip}</p>
            </div>
          </div>
        </div>

        {/* Step 3: Hotel Check-in */}
        <div className="flex">
          <FaHotel className="text-green-600 mr-4 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg">Check into {hotelInfo.name}</h3>
             <div className="flex items-center text-sm text-gray-600">
                <p>{hotelInfo.address}</p>
                <a href={createMapLink(`${hotelInfo.name}, ${hotelInfo.address}`)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                    <FiMapPin />
                </a>
            </div>
            <p className="text-xs mt-1 text-red-600 bg-red-100 p-1 rounded-md inline-block font-semibold">{hotelInfo.note}</p>
          </div>
        </div>
      </div>

       {/* Nearby Attraction */}
       <div className="p-4 border-t">
          <h4 className="font-bold text-gray-800 flex items-center"><FaCamera className="mr-2"/>Don't Miss</h4>
          <div className="text-sm mt-1 text-gray-600">
            <p className="font-semibold">{nearbyAttraction.name}</p>
            <p>{nearbyAttraction.access} from the Lauterbrunnen train station.</p>
          </div>
       </div>

      {/* Family Travel Tip */}
      <div className="p-4 bg-yellow-100">
          <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
          <p className="text-yellow-700 text-sm mt-1">
            Make the train ride up to Wengen an event! Challenge the kids to be the first to spot a waterfall from the left side of the train. In Lauterbrunnen, pack essentials for the first night in backpacks and leave larger suitcases in the car to retrieve later if needed, simplifying the luggage transport in car-free Wengen.
          </p>
      </div>

      {/* Vitals Section */}
      <div className="bg-gray-50 p-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center">
          <FiCloud className="text-gray-500 mr-2" size={20}/>
          <div>
            <p className="font-semibold">Weather</p>
            <p>{data.weather.temperature} (Mountain weather!)</p>
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