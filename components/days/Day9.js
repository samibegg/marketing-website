import { useState } from 'react';
import { FiMapPin, FiSun, FiCloud, FiDollarSign, FiAlertTriangle, FiLink, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaPlaneDeparture, FaCar, FaHotel, FaInfoCircle, FaUserCheck, FaBus } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day9({ data }) {
  const carReturn = data.items.find(i => i.activity.includes('Return car')).car_rental;
  const flight = data.items.find(i => i.activity.includes('Fly BSL')).flight;
  const hotel = data.items.find(i => i.activity.includes('Check into Hilton')).hotel;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-green-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 9: To Budapest!</h2>
          <div className="text-lg font-semibold">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="text-green-100">{data.location}, Hungary</p>
      </div>

      <div className="p-4 space-y-5">
        {/* Step 1: Car Return */}
        <div className="flex">
            <FaCar className="text-gray-500 mr-4 mt-1" size={24} />
            <div>
                <h3 className="font-bold text-lg">Return Rental Car</h3>
                <p className="text-sm text-gray-600">Location: {carReturn.location}</p>
                <p className="text-xs text-gray-500">Allow 30 mins for inspection</p>
            </div>
        </div>
      
        {/* Step 2: Flight */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-bold text-lg text-blue-800 flex items-center mb-2">
            <FaPlaneDeparture className="mr-3" /> Fly to Budapest (BUD)
          </h3>
          <p className="font-semibold text-sm">{flight.airline} {flight.flight_number}</p>
          <div className="text-sm mt-2 space-y-1">
            <p><span className="font-semibold">Departs BSL:</span> {flight.departure.time}</p>
            <p><span className="font-semibold">Arrives BUD:</span> {flight.arrival.time}</p>
          </div>
           <div className="grid grid-cols-2 gap-2 text-sm mt-3">
            <a href={flight.check_in} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white text-center font-bold py-2 px-3 rounded-lg flex items-center justify-center shadow-sm hover:bg-green-600">
                <FaUserCheck className="mr-2" /> Check-In
            </a>
            <a href={flight.flight_status} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white text-center font-bold py-2 px-3 rounded-lg flex items-center justify-center shadow-sm hover:bg-blue-600">
                <FiLink className="mr-2" /> Flight Status
            </a>
            <p><span className="font-semibold">Confirmation:</span> <span className="font-mono bg-gray-200 px-1 rounded">{flight.confirmation}</span></p>
        </div>
        </div>

        {/* Step 3: Hotel Check-in */}
        <div className="flex">
          <FaHotel className="text-green-700 mr-4 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-lg">Check into {hotel.name}</h3>
             <div className="flex items-center text-sm text-gray-600">
                <p>{hotel.address}</p>
                <a href={createMapLink(hotel.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                    <FiMapPin />
                </a>
            </div>
            <p className="text-xs mt-1 text-green-800 bg-green-100 p-1 rounded-md inline-block font-semibold">{hotel.location}</p>
          </div>
        </div>
      </div>

      {/* Family Travel Tip */}
      <div className="p-4 bg-yellow-100 border-t">
          <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
          <p className="text-yellow-700 text-sm mt-1">
            After checking into your hotel in the Castle District, 'Ruszwurm Cukrászda' is one of Budapest's oldest and most famous pastry shops—a perfect first taste of Hungary. For a rainy arrival evening, consider a short taxi to the 'House of Houdini' museum, a magical and intriguing stop right in the Castle District.
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
            <p>{data.currency.local} (HUF)</p>
          </div>
        </div>
        <div className="flex items-center">
          <FiAlertTriangle className="text-red-500 mr-2" size={20}/>
          <div>
            <p className="font-semibold">Emergency</p>
            <p>Police: 107, Medical: 104</p>
          </div>
        </div>
         <div className="flex items-center col-span-2">
          <FaBus className="text-gray-500 mr-2" size={20}/>
          <div>
            <p className="font-semibold">Airport to City</p>
            <p className="text-xs">{data.transport.airport_to_city[0]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}