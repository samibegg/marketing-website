import itinerary from '../data/itinerary.json';
import Day1 from '../components/days/Day1';
import Day2 from '../components/days/Day2'; 
import Day3 from '../components/days/Day3'; 
import Day4 from '../components/days/Day4'; 
import Day5 from '../components/days/Day5'; 
import Day6 from '../components/days/Day6'; 
import Day7 from '../components/days/Day7'; 
import Day8 from '../components/days/Day8'; 
import Day9 from '../components/days/Day9'; 
import Day10 from '../components/days/Day10'; 
import Day11 from '../components/days/Day11'; 
import Day12 from '../components/days/Day12'; 
import Day13 from '../components/days/Day13'; 
import Day14 from '../components/days/Day14'; 
import Day15 from '../components/days/Day15'; 
import Day16 from '../components/days/Day16'; 
import Day17 from '../components/days/Day17'; 

export default function ItineraryPage() {

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Family Trip Itinerary
        </h1>
        
        <Day1 data={itinerary[0]} />
        <Day2 data={itinerary[1]} />
        <Day3 data={itinerary[2]} />
        <Day4 data={itinerary[3]} />
        <Day5 data={itinerary[4]} />
        <Day6 data={itinerary[5]} />
        <Day7 data={itinerary[6]} />
        <Day8 data={itinerary[7]} />
        <Day9 data={itinerary[8]} />
        <Day10 data={itinerary[9]} />
        <Day11 data={itinerary[10]} />
        <Day12 data={itinerary[11]} />
        <Day13 data={itinerary[12]} />
        <Day14 data={itinerary[13]} />
        <Day15 data={itinerary[14]} />
        <Day16 data={itinerary[15]} />
        <Day17 data={itinerary[16]} />

      </div>
    </div>
  );
}