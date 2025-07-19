import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiMapPin, FiSun, FiCloud } from 'react-icons/fi';
import { FaPlaneDeparture, FaPlaneArrival, FaInfoCircle, FaTicketAlt, FaSuitcase, FaUserCheck } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day1({ data }) {
  const [flightDetailsVisible, setFlightDetailsVisible] = useState(true);
  const flight = data.items.find(item => item.flight).flight;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 1: {data.location}</h2>
          <div className="text-lg font-semibold">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="text-blue-100">{data.items[0].activity}</p>
      </div>

      {/* Flight Info Card */}
      <div className="p-4 border-b">
        <div className="flex items-center mb-3">
          <FaPlaneDeparture className="text-blue-500 mr-3" size={24} />
          <h3 className="text-xl font-semibold text-gray-800">Flight Details: {flight.airline} ({flight.flight_number})</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <a href={flight.check_in} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white text-center font-bold py-2 px-4 rounded-lg flex items-center justify-center shadow-md hover:bg-green-600 transition-transform transform hover:scale-105">
                <FaUserCheck className="mr-2" /> Check-In
            </a>
            <a href={flight.flight_status} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white text-center font-bold py-2 px-4 rounded-lg flex items-center justify-center shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105">
                <FaInfoCircle className="mr-2" /> Flight Status
            </a>
        </div>

        {/* Departure and Arrival */}
        <div className="space-y-3">
          <div className="flex items-start">
            <FaPlaneDeparture className="text-gray-500 mt-1 mr-3" size={20}/>
            <div>
              <p className="font-bold text-gray-700">Departure</p>
              <div className="flex items-center">
                <p>{flight.departure.airport}</p>
                <a href={createMapLink(flight.departure.airport)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                  <FiMapPin />
                </a>
              </div>
              <p className="font-semibold text-red-500">{flight.departure.time}</p>
              <p className="text-xs text-gray-500">Gate: {flight.departure.gate}</p>
            </div>
          </div>
          <div className="flex items-start">
            <FaPlaneArrival className="text-gray-500 mt-1 mr-3" size={20}/>
            <div>
              <p className="font-bold text-gray-700">Arrival</p>
              <div className="flex items-center">
                <p>{flight.arrival.airport}</p>
                 <a href={createMapLink(flight.arrival.airport)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                  <FiMapPin />
                </a>
              </div>
              <p className="font-semibold text-green-500">{flight.arrival.time}</p>
            </div>
          </div>
        </div>

        {/* Collapsible Details */}
        <button onClick={() => setFlightDetailsVisible(!flightDetailsVisible)} className="w-full text-left mt-4 text-blue-600 font-semibold flex items-center">
          {flightDetailsVisible ? <FiChevronUp className="mr-2" /> : <FiChevronDown className="mr-2" />}
          More Flight Info
        </button>
        {flightDetailsVisible && (
          <div className="mt-3 bg-gray-50 p-3 rounded-lg text-sm space-y-2">
            <p><span className="font-semibold">Confirmation:</span> <span className="font-mono bg-gray-200 px-1 rounded">{flight.confirmation}</span></p>
            <p><span className="font-semibold">Duration:</span> {flight.flight_duration}</p>
            <p><span className="font-semibold">Aircraft:</span> {flight.aircraft}</p>
            <p><span className="font-semibold">Baggage:</span> {flight.baggage_info}</p>
            <a href={flight.seat_selection} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Manage Seats</a>
          </div>
        )}
      </div>

      {/* Family Travel Tip */}
       <div className="p-4 bg-yellow-100">
           <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
           <p className="text-yellow-700 text-sm mt-1">
             To make the overnight flight more comfortable for the kids, consider bringing their favorite small pillow or blanket. Download a few new movies or games onto a tablet beforehand. Don't forget lollipops for takeoff and landing to help with ear pressure!
           </p>
       </div>

      {/* Tips Section */}
      <div className="p-4">
        <h4 className="font-bold text-gray-800">Reminders & Tips</h4>
        <ul className="list-disc list-inside mt-2 text-sm text-gray-600 space-y-1">
          {data.tips.map((tip, index) => <li key={index}>{tip}</li>)}
          <li>{data.items[1]}</li>
        </ul>
      </div>

      {/* Weather & Vitals */}
      <div className="bg-gray-50 p-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center">
          <FiCloud className="text-gray-500 mr-2" size={20}/>
          <div>
            <p className="font-semibold">Weather</p>
            <p>{data.weather.temperature}, {data.weather.humidity} humidity</p>
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