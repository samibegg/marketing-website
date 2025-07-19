import { FiMapPin, FiSun, FiCloud } from 'react-icons/fi';
import { FaGem, FaShoppingBag, FaEye, FaInfoCircle, FaBicycle, FaHotdog } from 'react-icons/fa';

// Helper function to create a Google Maps link
const createMapLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Day14({ data }) {
  const mermaid = data.items.find(i => i.name.includes('Mermaid'));
  const stroget = data.items.find(i => i.name.includes('Strøget'));
  const roundTower = data.items.find(i => i.name.includes('Round Tower'));
  const bikeRental = data.transportation.bike_rental.donkey_republic;
  const streetFood = data.food.street_food.hot_dogs;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="bg-teal-700 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Day 14: Mermaids & Bikes</h2>
          <div className="text-lg font-semibold">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <p className="text-teal-100">{data.location}</p>
      </div>

      <div className="p-4 space-y-5">
        {/* Little Mermaid */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <h3 className="font-bold text-lg text-blue-800 flex items-center mb-2">
                <FaGem className="mr-3" /> See the Little Mermaid
            </h3>
            <div className="flex items-center text-sm mb-1">
                <p>{mermaid.address}</p>
                <a href={createMapLink(mermaid.address)} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                    <FiMapPin />
                </a>
            </div>
            <p className="text-xs font-semibold text-blue-700">Best Time: {mermaid.best_time}</p>
        </div>

        {/* Strøget */}
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
            <h3 className="font-bold text-lg text-gray-800 flex items-center mb-2">
                <FaShoppingBag className="mr-3" /> Walk Strøget Shopping Street
            </h3>
            <p className="text-sm">{stroget.description} ({stroget.length} long).</p>
        </div>
        
        {/* Round Tower */}
        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
            <h3 className="font-bold text-lg text-orange-800 flex items-center mb-2">
                <FaEye className="mr-3" /> Climb the Round Tower (Rundetaarn)
            </h3>
            <p className="text-sm">Get panoramic city views from this {roundTower.height} tower.</p>
            <p className="text-xs text-orange-700 mt-1 font-semibold">{roundTower.special_feature} - great for kids!</p>
        </div>
      </div>
      
      {/* Local Experience */}
       <div className="p-4 border-t">
          <h4 className="font-bold text-gray-800 flex items-center mb-2">Explore Like a Local</h4>
          <div className="space-y-3">
              <div className="flex items-center text-sm">
                <FaBicycle size={20} className="mr-3 text-gray-600"/>
                <div>
                    <p className="font-semibold">Rent Bikes via "{bikeRental.app}" App</p>
                    <p className="text-xs text-gray-500">Approx. {bikeRental.cost}</p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <FaHotdog size={20} className="mr-3 text-gray-600"/>
                <div>
                    <p className="font-semibold">Try a Danish Hot Dog</p>
                    <p className="text-xs text-gray-500">Find vendors at {streetFood.popular_spots}</p>
                </div>
              </div>
          </div>
       </div>

      {/* Family Travel Tip */}
      <div className="p-4 bg-yellow-100">
          <h4 className="font-bold text-yellow-800 flex items-center"><FaInfoCircle className="mr-2"/>Family Travel Tip</h4>
          <p className="text-yellow-700 text-sm mt-1">
            Turn the travel between sights into an adventure. Rent bikes with the Donkey Republic app to get from the Round Tower to the Little Mermaid. Copenhagen's bike lanes are safe and it's the most authentic way to see the city. The kids will love it!
          </p>
      </div>

      {/* Vitals Section */}
      <div className="bg-gray-50 p-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center">
          <FiCloud className="text-gray-500 mr-2" size={20}/>
          <div>
            <p className="font-semibold">Weather</p>
            <p>{data.weather}</p>
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