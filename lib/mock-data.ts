import { Location, Route, DecayPoint } from "./types";

// Base pool of Bengaluru locations for dynamic add-ons
export const MOCK_LOCATION_POOL: Omit<Location, "id" | "distance">[] = [
  {
    name: "Lalbagh Botanical Garden",
    category: "Nature",
    satisfaction: 0.95,
    lat: 12.9507,
    lng: 77.5848,
    description: "Historic 240-acre garden with a glass house modeled on London's Crystal Palace."
  },
  {
    name: "Cubbon Park",
    category: "Nature",
    satisfaction: 0.92,
    lat: 12.9738,
    lng: 77.5913,
    description: "Lush green park in the heart of the city, perfect for nature walks."
  },
  {
    name: "Bangalore Palace",
    category: "Culture",
    satisfaction: 0.89,
    lat: 12.9982,
    lng: 77.5920,
    description: "Royal palace owned by the Mysore royal family, featuring Tudor-style architecture."
  },
  {
    name: "Tipu Sultan's Summer Palace",
    category: "Culture",
    satisfaction: 0.86,
    lat: 12.9593,
    lng: 77.5737,
    description: "Beautiful teakwood palace representing Indo-Islamic architecture."
  },
  {
    name: "Vidhana Soudha",
    category: "Landmark",
    satisfaction: 0.91,
    lat: 12.9796,
    lng: 77.5906,
    description: "Seat of the state legislature, known for its majestic Neo-Dravidian architecture."
  },
  {
    name: "Visvesvaraya Industrial & Museum",
    category: "Culture",
    satisfaction: 0.88,
    lat: 12.9752,
    lng: 77.5962,
    description: "Interactive science museum with science exhibits and dinosaur displays."
  },
  {
    name: "Commercial Street",
    category: "Food",
    satisfaction: 0.83,
    lat: 12.9822,
    lng: 77.6083,
    description: "Bustling shopping street lined with local eateries and brand stores."
  },
  {
    name: "Ulsoor Lake",
    category: "Nature",
    satisfaction: 0.85,
    lat: 12.9815,
    lng: 77.6229,
    description: "One of the oldest lakes in Bengaluru, offering boating and walking paths."
  },
  {
    name: "Mavalli Tiffin Room (MTR)",
    category: "Food",
    satisfaction: 0.94,
    lat: 12.9553,
    lng: 77.5857,
    description: "Legendary restaurant serving traditional South Indian breakfast delicacies."
  },
  {
    name: "Corner House Ice Cream",
    category: "Food",
    satisfaction: 0.93,
    lat: 12.9698,
    lng: 77.6115,
    description: "Famous local dessert chain, home of the legendary 'Death by Chocolate' sundae."
  },
  {
    name: "National Gallery of Modern Art",
    category: "Culture",
    satisfaction: 0.87,
    lat: 12.9897,
    lng: 77.5883,
    description: "Heritage mansion housing a gallery of modern art and beautiful lawns."
  },
  {
    name: "HAL Aerospace Museum",
    category: "Landmark",
    satisfaction: 0.84,
    lat: 12.9562,
    lng: 77.6762,
    description: "India's first aerospace museum showcasing aviation history and models."
  }
];

// Helper to calculate decay points based on formula S_effective = S * e^(-k * d)
export function calculateDecayPoints(stops: Location[], k = 0.1): DecayPoint[] {
  let cumulativeDistance = 0;
  return stops.map((stop, index) => {
    // Accumulate distance.
    cumulativeDistance += stop.distance;
    const decayedSatisfaction = stop.satisfaction * Math.exp(-k * cumulativeDistance);
    const fatigue = 1 - Math.exp(-k * cumulativeDistance);
    return {
      stopName: stop.name,
      stopIndex: index + 1,
      baseSatisfaction: stop.satisfaction,
      decayedSatisfaction: decayedSatisfaction,
      cumulativeDistance: parseFloat(cumulativeDistance.toFixed(1)),
      fatigue: parseFloat(fatigue.toFixed(2))
    };
  });
}

// Helper to compile stops into a Route object
export function computeRoute(
  id: string,
  name: string,
  description: string,
  color: string,
  stops: Location[],
  k = 0.1
): Route {
  const totalDistance = parseFloat(stops.reduce((sum, s) => sum + s.distance, 0).toFixed(1));
  const decayPoints = calculateDecayPoints(stops, k);
  const avgSatisfaction = decayPoints.length > 0
    ? decayPoints.reduce((sum, dp) => sum + dp.decayedSatisfaction, 0) / decayPoints.length
    : 0;

  // Compute duration: 5 mins per km (Bangalore traffic) + activity times
  const travelTime = totalDistance * 5; 
  const visitingTime = stops.reduce((sum, s) => {
    if (s.category === "Nature") return sum + 45;
    if (s.category === "Culture") return sum + 60;
    if (s.category === "Food") return sum + 30;
    return sum + 40; // Landmark
  }, 0);
  const totalDuration = Math.round(travelTime + visitingTime);

  const categoryBreakdown: Record<string, number> = {};
  stops.forEach(s => {
    categoryBreakdown[s.category] = (categoryBreakdown[s.category] || 0) + 1;
  });

  // Efficiency Score formula balancing average satisfaction and distance
  const baseEfficiency = (avgSatisfaction * 100) - (totalDistance * 0.6);
  const efficiencyScore = Math.max(30, Math.min(98, Math.round(baseEfficiency + 12)));

  return {
    id,
    name,
    description,
    stops,
    totalDistance,
    totalDuration,
    avgSatisfaction,
    efficiencyScore,
    categoryBreakdown,
    color
  };
}

// 1. OPTIMAL TOUR (Balanced mix of everything)
const STOPS_OPTIMAL: Location[] = [
  {
    id: 1,
    name: "Cubbon Park",
    category: "Nature",
    satisfaction: 0.92,
    distance: 1.2, // starting from near MG Road Metro Station
    lat: 12.9738,
    lng: 77.5913,
    description: "Lush green park in the heart of the city, perfect for nature walks."
  },
  {
    id: 2,
    name: "National Gallery of Modern Art",
    category: "Culture",
    satisfaction: 0.87,
    distance: 2.1,
    lat: 12.9897,
    lng: 77.5883,
    description: "Heritage mansion housing a gallery of modern art and beautiful lawns."
  },
  {
    id: 3,
    name: "Bangalore Palace",
    category: "Culture",
    satisfaction: 0.89,
    distance: 1.5,
    lat: 12.9982,
    lng: 77.5920,
    description: "Royal palace owned by the Mysore royal family, featuring Tudor-style architecture."
  },
  {
    id: 4,
    name: "Vidhana Soudha",
    category: "Landmark",
    satisfaction: 0.91,
    distance: 2.2,
    lat: 12.9796,
    lng: 77.5906,
    description: "Seat of the state legislature, known for its majestic Neo-Dravidian architecture."
  },
  {
    id: 5,
    name: "Commercial Street",
    category: "Food",
    satisfaction: 0.83,
    distance: 2.8,
    lat: 12.9822,
    lng: 77.6083,
    description: "Bustling shopping street lined with local eateries and brand stores."
  }
];

// 2. HERITAGE & CULTURE EXPLORER (High satisfaction cultural sites, longer distance)
const STOPS_CULTURE: Location[] = [
  {
    id: 1,
    name: "Vidhana Soudha",
    category: "Landmark",
    satisfaction: 0.91,
    distance: 2.0,
    lat: 12.9796,
    lng: 77.5906,
    description: "Seat of the state legislature, known for its majestic Neo-Dravidian architecture."
  },
  {
    id: 2,
    name: "National Gallery of Modern Art",
    category: "Culture",
    satisfaction: 0.87,
    distance: 1.6,
    lat: 12.9897,
    lng: 77.5883,
    description: "Heritage mansion housing a gallery of modern art and beautiful lawns."
  },
  {
    id: 3,
    name: "Bangalore Palace",
    category: "Culture",
    satisfaction: 0.89,
    distance: 1.5,
    lat: 12.9982,
    lng: 77.5920,
    description: "Royal palace owned by the Mysore royal family, featuring Tudor-style architecture."
  },
  {
    id: 4,
    name: "Tipu Sultan's Summer Palace",
    category: "Culture",
    satisfaction: 0.86,
    distance: 5.5,
    lat: 12.9593,
    lng: 77.5737,
    description: "Beautiful teakwood palace representing Indo-Islamic architecture."
  },
  {
    id: 5,
    name: "Lalbagh Botanical Garden",
    category: "Nature",
    satisfaction: 0.95,
    distance: 1.8,
    lat: 12.9507,
    lng: 77.5848,
    description: "Historic 240-acre garden with a glass house modeled on London's Crystal Palace."
  },
  {
    id: 6,
    name: "Mavalli Tiffin Room (MTR)",
    category: "Food",
    satisfaction: 0.94,
    distance: 0.8,
    lat: 12.9553,
    lng: 77.5857,
    description: "Legendary restaurant serving traditional South Indian breakfast delicacies."
  }
];

// 3. URBAN EXPRESS (Quick stops, compact distance)
const STOPS_EXPRESS: Location[] = [
  {
    id: 1,
    name: "Cubbon Park",
    category: "Nature",
    satisfaction: 0.92,
    distance: 1.2,
    lat: 12.9738,
    lng: 77.5913,
    description: "Lush green park in the heart of the city, perfect for nature walks."
  },
  {
    id: 2,
    name: "Visvesvaraya Industrial & Museum",
    category: "Culture",
    satisfaction: 0.88,
    distance: 0.8,
    lat: 12.9752,
    lng: 77.5962,
    description: "Interactive science museum with science exhibits and dinosaur displays."
  },
  {
    id: 3,
    name: "Commercial Street",
    category: "Food",
    satisfaction: 0.83,
    distance: 1.9,
    lat: 12.9822,
    lng: 77.6083,
    description: "Bustling shopping street lined with local eateries and brand stores."
  },
  {
    id: 4,
    name: "Corner House Ice Cream",
    category: "Food",
    satisfaction: 0.93,
    distance: 1.5,
    lat: 12.9698,
    lng: 77.6115,
    description: "Famous local dessert chain, home of the legendary 'Death by Chocolate' sundae."
  }
];

// Compute standard mock routes with k=0.1
export const MOCK_ROUTES: Route[] = [
  computeRoute(
    "optimal",
    "Optimal Garden Tour",
    "Balanced itinerary matching high-satisfaction landmarks, greenery, and dining spots within close proximity.",
    "emerald",
    STOPS_OPTIMAL,
    0.1
  ),
  computeRoute(
    "culture",
    "Heritage & Culture Explorer",
    "Deep dive into royal palaces, art galleries, and historic dining spots, featuring high initial satisfaction but longer travel distances.",
    "indigo",
    STOPS_CULTURE,
    0.1
  ),
  computeRoute(
    "express",
    "Urban Express",
    "Quick, compact route covering parks, museums, and desserts in the central business district.",
    "cyan",
    STOPS_EXPRESS,
    0.1
  )
];
