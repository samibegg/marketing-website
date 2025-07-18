import { useState } from 'react';

const itineraryData = [
  {
    "date": "7/27/2025",
    "location": "Washington, DC",
    "items": [
      "Depart IAD at 5:45 PM (United I6321Q)",
      "Check-in Hilton Airport",
      "Pack essentials for overnight flight"
    ],
    "tips": [
      "Arrive early at IAD to avoid summer travel congestion.",
      "Use United’s lounge if eligible.",
      "Pack snacks and chargers."
    ],
    "weather": "Hot, ~88°F (31°C)",
    "sunset": "8:25 PM"
  },
  {
    "date": "7/28/2025",
    "location": "Zurich, Switzerland",
    "items": [
      "Arrive ZRH at 8:00 AM",
      "Pick up rental car (Budget via Expedia)",
      "Check into hotel in Zurich"
    ],
    "tips": [
      "Use SBB app for public transport info.",
      "Swiss tap water is drinkable everywhere.",
      "Drive along Lake Zurich or visit Uetliberg for views."
    ],
    "weather": "72–80°F (22–27°C)",
    "sunset": "9:00 PM"
  },
  {
    "date": "7/29/2025",
    "location": "Zurich",
    "items": [
      "Visit FIFA Museum",
      "Tour Lindt Chocolate World",
      "Walk along Lake Zurich or Bahnhofstrasse"
    ],
    "tips": [
      "Get museum tickets online in advance.",
      "Try hot chocolate at Lindt Café.",
      "Consider a short ferry ride on the lake."
    ],
    "weather": "Mild, 75°F (24°C)",
    "sunset": "9:00 PM"
  },
  {
    "date": "7/30/2025",
    "location": "Wengen via Lauterbrunnen",
    "items": [
      "Drive Zurich → Lauterbrunnen",
      "Park in Lauterbrunnen and take train to Wengen",
      "Check out of Zurich, check into Hotel Edelweiss"
    ],
    "tips": [
      "Staubbach Falls is right outside Lauterbrunnen station.",
      "Sit on the left side of the train to Wengen for best views.",
      "Wengen is car-free — enjoy the alpine peace."
    ],
    "weather": "Cooler, 68°F (20°C)",
    "sunset": "8:55 PM"
  },
  {
    "date": "7/31/2025",
    "location": "Wengen",
    "items": [
      "Explore mountain trails",
      "Ride the Männlichen cable car",
      "Visit Kleine Scheidegg"
    ],
    "tips": [
      "Wear hiking shoes — trails can be muddy.",
      "Look out for marmots!",
      "Buy picnic items from Coop and lunch outdoors."
    ],
    "weather": "60–70°F (16–21°C)",
    "sunset": "8:55 PM"
  },
  {
    "date": "8/1/2025",
    "location": "Wengen (Hotel Transfer)",
    "items": [
      "Check out of Edelweiss, check into Belvedere",
      "Stroll around Wengen village",
      "Relax or spa if hotel has wellness"
    ],
    "tips": [
      "Try local Alpine cheese or rösti.",
      "Check for live music at restaurants.",
      "Sunsets can be stunning from your hotel balcony."
    ],
    "weather": "Mild, 67°F (19°C)",
    "sunset": "8:50 PM"
  },
  {
    "date": "8/2/2025",
    "location": "Wengen",
    "items": [
      "Optional day trip to Jungfraujoch",
      "Visit Trümmelbach Falls",
      "Walk Lauterbrunnen Valley"
    ],
    "tips": [
      "Jungfraujoch is expensive — book in advance.",
      "Trümmelbach is inside a mountain — wear layers.",
      "Watch for cows with bells in the valley!"
    ],
    "weather": "Cool in mountains, ~62°F (17°C)",
    "sunset": "8:45 PM"
  },
  {
    "date": "8/3/2025",
    "location": "Basel",
    "items": [
      "Train to Lauterbrunnen → drive to Basel",
      "Check into Homely Basel",
      "Evening stroll by the Rhine"
    ],
    "tips": [
      "Stop in Bern for lunch if time allows.",
      "Basel has great public art — look out for Tinguely fountains.",
      "Rathaus (Town Hall) is a colorful landmark worth seeing."
    ],
    "weather": "Warm, 75–80°F (24–27°C)",
    "sunset": "8:45 PM"
  },
  {
    "date": "8/4/2025",
    "location": "Budapest, Hungary",
    "items": [
      "Fly BSL → BUD (5:10 PM → 6:50 PM, Wizzair)",
      "Return car in Basel",
      "Check into Hilton Budapest"
    ],
    "tips": [
      "Buy Forint at airport or use ATM.",
      "Try Hungarian goulash for dinner.",
      "Enjoy panoramic view from Fisherman's Bastion."
    ],
    "weather": "Hot, 88°F (31°C)",
    "sunset": "8:00 PM"
  },
  {
    "date": "8/5/2025",
    "location": "Budapest",
    "items": [
      "Visit Buda Castle and Castle Hill",
      "Walk across Chain Bridge",
      "Explore Parliament or Central Market"
    ],
    "tips": [
      "Take funicular up Castle Hill.",
      "Market is great for paprika and souvenirs.",
      "Sunset views from Gellért Hill are incredible."
    ],
    "weather": "Sunny, ~90°F (32°C)",
    "sunset": "7:55 PM"
  },
  {
    "date": "8/6/2025",
    "location": "Budapest",
    "items": [
      "Visit Széchenyi Thermal Baths",
      "Relax in City Park",
      "Budapest Circus Show at 5 PM"
    ],
    "tips": [
      "Bring flip-flops and towel for baths.",
      "Explore Vajdahunyad Castle nearby.",
      "Arrive early to the circus for best seats."
    ],
    "weather": "Hot, ~88°F (31°C)",
    "sunset": "7:50 PM"
  },
  {
    "date": "8/7/2025",
    "location": "Copenhagen, Denmark",
    "items": [
      "Fly BUD → CPH (7:35 PM → 9:30 PM, Ryanair)",
      "Check out Hilton, check into SLH Copenhagen"
    ],
    "tips": [
      "Use contactless card for train from airport to city.",
      "Evening stroll around Nyhavn is magical.",
      "Try smørrebrød (open-face sandwiches) for late dinner."
    ],
    "weather": "Mild, 70°F (21°C)",
    "sunset": "8:55 PM"
  },
  {
    "date": "8/8/2025",
    "location": "Copenhagen",
    "items": [
      "Visit Tivoli Gardens",
      "Explore Nyhavn",
      "Try Danish pastries"
    ],
    "tips": [
      "Tivoli is great in the evening too—live shows and lights.",
      "Hop on a harbor canal boat tour.",
      "Rosenborg Castle and crown jewels are nearby."
    ],
    "weather": "68–72°F (20–22°C)",
    "sunset": "8:50 PM"
  },
  {
    "date": "8/9/2025",
    "location": "Copenhagen",
    "items": [
      "See Little Mermaid statue early",
      "Walk Stroget shopping street",
      "Climb the Round Tower"
    ],
    "tips": [
      "Expect crowds at popular spots—go early.",
      "Rent a bike using Donkey Republic app.",
      "Try local hot dogs from street vendors."
    ],
    "weather": "Sunny, ~70°F (21°C)",
    "sunset": "8:45 PM"
  },
  {
    "date": "8/10/2025",
    "location": "Reykjavik, Iceland",
    "items": [
      "Fly CPH → KEF (12:35 PM → 1:55 PM, FlyPlay)",
      "Pick up Enterprise rental car (Expedia)",
      "Check in to Iceland hotel"
    ],
    "tips": [
      "Check weather using Veður app before driving.",
      "Book Blue Lagoon or Sky Lagoon in advance.",
      "Pack layers—it can be cold even in August."
    ],
    "weather": "50–60°F (10–16°C), wind possible",
    "sunset": "10:00 PM"
  },
  {
    "date": "8/11/2025",
    "location": "Iceland",
    "items": [
      "Drive Golden Circle (Þingvellir, Geysir, Gullfoss)",
      "Pet Icelandic horses",
      "Stop at Secret Lagoon or Fontana Spa"
    ],
    "tips": [
      "Fuel up at self-serve gas stations — credit card with PIN required.",
      "Look for northern lights forecast (chances are slim but possible).",
      "Stop at tomato farm (Friðheimar) for soup and fresh produce."
    ],
    "weather": "Cool, ~56°F (13°C)",
    "sunset": "9:55 PM"
  },
  {
    "date": "8/12/2025",
    "location": "Iceland → Washington, DC",
    "items": [
      "Return car at KEF",
      "Fly KEF → IAD (7:45 PM → 8:10 PM, Icelandair)",
      "Final day: souvenirs, scenic drive to airport"
    ],
    "tips": [
      "Allow 2–2.5 hours at KEF for international departures.",
      "Great duty-free deals on Icelandic chocolate and salts.",
      "Enjoy final views of lava fields along the coastal drive."
    ],
    "weather": "Windy, ~55°F (13°C)",
    "sunset": "9:45 PM"
  }
];

export default function ItineraryPage() {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Summer 2025 Travel Itinerary</h1>
      {itineraryData.map((day, index) => (
        <div
          key={index}
          className="border rounded-2xl shadow-md mb-4 p-4 bg-white hover:shadow-lg transition-all"
        >
          <div
            onClick={() => toggleExpand(index)}
            className="cursor-pointer flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold">{day.date} — {day.location}</p>
              <p className="text-sm text-gray-500">Click to {expanded === index ? 'collapse' : 'expand'}</p>
            </div>
            <span className="text-xl">{expanded === index ? '-' : '+'}</span>
          </div>
          {expanded === index && (
            <div className="mt-4 space-y-3">
              <div>
                <h3 className="font-semibold">Activities / Travel</h3>
                <ul className="list-disc list-inside text-sm">
                  {day.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Local Tips</h3>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {day.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                </ul>
              </div>
              <p className="text-sm text-gray-500">☀️ Weather: {day.weather} | 🌇 Sunset: {day.sunset}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

