// pages/api/map-data.js
import connectToDatabase from '../../lib/mongodb'; // Use the default export

// Default coordinates for items that can't be geocoded precisely or if geocoding fails
const DEFAULT_COORDS = { lat: 39.8283, lon: -98.5795 }; // Center of US
const INTERNATIONAL_DEFAULT_COORDS = { lat: 0, lon: 0}; // For non-US addresses if geocoding fails

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

async function getPreciseCoords(address, itemType = "unknown") {
    if (!address || !GOOGLE_MAPS_API_KEY) {
        console.warn(`Address object for ${itemType} or Google Maps API Key missing, returning default coordinates.`);
        return DEFAULT_COORDS;
    }

    // Construct the address string for the API
    const addressString = `${address.street || ''}, ${address.city || ''}, ${address.stateOrProvince || ''}, ${address.postalCode || ''}, ${address.country || ''}`.trim();
    
    if (addressString === ", , , ,") { // Check if address string is effectively empty
        console.warn(`Empty address string for ${itemType}, returning default coordinates.`);
        return DEFAULT_COORDS;
    }

    const encodedAddress = encodeURIComponent(addressString);
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`;

    try {
        console.log(`Geocoding ${itemType} address: ${addressString}`);
        const response = await fetch(geocodingUrl);
        const data = await response.json();

        if (data.status === 'OK' && data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            // Add a tiny random offset to prevent exact overlaps for identical geocoded addresses
            return {
                lat: location.lat + (Math.random() - 0.5) * 0.0001,
                lon: location.lng + (Math.random() - 0.5) * 0.0001,
            };
        } else {
            console.warn(`Geocoding failed for ${itemType} address: ${addressString}. Status: ${data.status}. Error: ${data.error_message || 'No results'}`);
            // Fallback for failed geocoding
            if (address.country && address.country !== "USA") {
                return {
                    lat: INTERNATIONAL_DEFAULT_COORDS.lat + (Math.random() - 0.5) * 10,
                    lon: INTERNATIONAL_DEFAULT_COORDS.lon + (Math.random() - 0.5) * 20,
                };
            }
            return DEFAULT_COORDS;
        }
    } catch (error) {
        console.error(`Error during geocoding for ${itemType} address: ${addressString}:`, error);
        return DEFAULT_COORDS; // Fallback on network error or other issues
    }
}


export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    if (!GOOGLE_MAPS_API_KEY) {
        console.error("Google Maps API Key is not configured on the server.");
        return res.status(500).json({ error: 'Server configuration error: Missing Google Maps API Key' });
    }

    try {
        // Use your connectToDatabase function to get the db instance for 'forge'
        const { db } = await connectToDatabase(); 
        console.log(`Successfully connected to database: ${db.databaseName}`);


        // Fetching data - keep limits reasonable for geocoding
        const personsData = await db.collection('linked_persons_data').find({}).limit(20).toArray(); 
        const businessesData = await db.collection('linked_businesses_data').find({}).limit(20).toArray();
        // For device locations, we might fetch more windows but process points within them
        const deviceLocationsData = await db.collection('linked_device_location_data').find({}).limit(50).toArray(); 

        const mapPoints = [];
        let geocodingPromises = [];

        // Process Persons - Geocode all their addresses
        for (const person of personsData) {
            if (person.addresses && person.addresses.length > 0) {
                for (let i = 0; i < person.addresses.length; i++) {
                    const address = person.addresses[i];
                    // Create a promise for each geocoding call
                    geocodingPromises.push(
                        getPreciseCoords(address, `person ${person.personId} address ${i}`).then(coords => {
                            mapPoints.push({
                                id: `${person.personId}_address_${i}`, // Unique ID for each address point
                                type: 'individual',
                                name: `${person.firstName} ${person.lastName} (${address.type || 'address'})`,
                                coordinates: [coords.lat, coords.lon],
                                color: 'green',
                                fullData: { ...person, currentAddress: address }, // Include current address in fullData for context
                            });
                        })
                    );
                }
            }
        }

        // Process Businesses - Geocode all their addresses
        for (const business of businessesData) {
            if (business.addresses && business.addresses.length > 0) {
                for (let i = 0; i < business.addresses.length; i++) {
                    const address = business.addresses[i];
                    geocodingPromises.push(
                        getPreciseCoords(address, `business ${business.businessId} address ${i}`).then(coords => {
                            mapPoints.push({
                                id: `${business.businessId}_address_${i}`, // Unique ID for each address point
                                type: 'business',
                                name: `${business.legalName} (${address.type || 'address'})`,
                                coordinates: [coords.lat, coords.lon],
                                color: 'red',
                                fullData: { ...business, currentAddress: address },
                            });
                        })
                    );
                }
            }
        }
        
        // Wait for all geocoding calls to complete
        // This can be slow if there are many addresses.
        // Consider rate limiting or queuing in a production app.
        console.log(`Starting ${geocodingPromises.length} geocoding operations...`);
        await Promise.all(geocodingPromises);
        console.log("All geocoding operations completed.");


        // Process Device Locations (iterate through all points in all windows)
        deviceLocationsData.forEach(windowDoc => {
            if (windowDoc.locationPoints && windowDoc.locationPoints.length > 0) {
                windowDoc.locationPoints.forEach((point, index) => {
                    if (point.coordinates && point.coordinates.length === 2) {
                        mapPoints.push({
                            // Create a more unique ID for each location point
                            id: `${windowDoc.deviceId}_${windowDoc.windowId}_point_${index}`,
                            type: 'device',
                            name: `Device: ${windowDoc.deviceId} (Point ${index + 1} at ${new Date(point.timestamp).toLocaleTimeString()})`,
                            coordinates: [point.coordinates[1], point.coordinates[0]], // Swap to [lat, lon]
                            color: 'blue',
                            // For device points, fullData could be the point itself, or the whole window
                            // Let's use the point data, and add window/device context
                            fullData: { 
                                ...point, 
                                deviceId: windowDoc.deviceId, 
                                windowId: windowDoc.windowId,
                                windowStartTime: windowDoc.windowStartTime,
                                windowEndTime: windowDoc.windowEndTime
                            }, 
                        });
                    }
                });
            }
        });
        
        console.log(`Total map points to return: ${mapPoints.length}`);
        res.status(200).json(mapPoints);

    } catch (e) {
        console.error("API Error fetching map data:", e);
        res.status(500).json({ error: 'Failed to fetch map data', details: e.message });
    }
}

