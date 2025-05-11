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

    const addressString = `${address.street || ''}, ${address.city || ''}, ${address.stateOrProvince || ''}, ${address.postalCode || ''}, ${address.country || ''}`.trim().replace(/^,|,$/g, '').replace(/,{2,}/g, ',');
    
    if (addressString === "" || addressString === ",") { // Check if address string is effectively empty
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
            return {
                lat: location.lat + (Math.random() - 0.5) * 0.0001,
                lon: location.lng + (Math.random() - 0.5) * 0.0001,
            };
        } else {
            console.warn(`Geocoding failed for ${itemType} address: ${addressString}. Status: ${data.status}. Error: ${data.error_message || 'No results'}`);
            if (address.country && address.country.toUpperCase() !== "USA" && address.country.toUpperCase() !== "UNITED STATES") {
                return {
                    lat: INTERNATIONAL_DEFAULT_COORDS.lat + (Math.random() - 0.5) * 10, // Broader spread for international defaults
                    lon: INTERNATIONAL_DEFAULT_COORDS.lon + (Math.random() - 0.5) * 20,
                };
            }
            return DEFAULT_COORDS;
        }
    } catch (error) {
        console.error(`Error during geocoding for ${itemType} address: ${addressString}:`, error);
        return DEFAULT_COORDS;
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
        const { db } = await connectToDatabase();
        console.log(`Successfully connected to database: ${db.databaseName}`);

        // Fetch AI Summaries first and create a lookup map
        const aiSummariesData = await db.collection('linked_ai_summary').find({}).toArray();
        const summaryMap = new Map();
        aiSummariesData.forEach(summaryDoc => {
            if (summaryDoc.id && summaryDoc.type && summaryDoc.summary) {
                if (!summaryMap.has(summaryDoc.type)) {
                    summaryMap.set(summaryDoc.type, new Map());
                }
                summaryMap.get(summaryDoc.type).set(summaryDoc.id, summaryDoc.summary);
            }
        });
        console.log(`Loaded ${aiSummariesData.length} AI summaries into lookup map.`);

        const personsData = await db.collection('linked_persons_data').find({}).limit(20).toArray();
        const businessesData = await db.collection('linked_businesses_data').find({}).limit(20).toArray();
        const deviceLocationsData = await db.collection('linked_device_location_data').find({}).limit(50).toArray();

        const mapPoints = [];
        let geocodingPromises = [];

        // Process Persons
        for (const person of personsData) {
            const personSummary = summaryMap.get('PersonSummary')?.get(person.personId) || null;
            if (person.addresses && person.addresses.length > 0) {
                for (let i = 0; i < person.addresses.length; i++) {
                    const address = person.addresses[i];
                    geocodingPromises.push(
                        getPreciseCoords(address, `person ${person.personId} address ${i}`).then(coords => {
                            mapPoints.push({
                                id: person.personId, // Use personId for linking to summary on frontend if needed, or a more unique ID for the point itself
                                // If multiple addresses per person, you might want a more unique point ID like `${person.personId}_address_${i}`
                                // but the summary is per-person, so the core ID is person.personId.
                                // For this example, if a person has multiple addresses, they will share the same person-level summary.
                                // The frontend will use point.id (which is person.personId here) to find the summary.
                                // Let's make point.id unique for the map marker itself, but store personId in fullData for summary linking.
                                pointId: `${person.personId}_address_${i}`, // Unique ID for this specific address marker
                                entityId: person.personId, // ID of the entity this point represents (for summary lookup)
                                type: 'person', // Changed to lowercase to match getSummaryType on frontend
                                name: `${person.firstName} ${person.lastName} (${address.type || 'address'})`,
                                coordinates: [coords.lat, coords.lon],
                                color: 'green',
                                fullData: { ...person, currentAddressDisplay: address, aiSummary: personSummary },
                            });
                        })
                    );
                }
            } else { // Add person even if no address, using default coordinates
                 geocodingPromises.push(
                    getPreciseCoords(null, `person ${person.personId} no address`).then(coords => {
                        mapPoints.push({
                            pointId: `${person.personId}_default`,
                            entityId: person.personId,
                            type: 'person',
                            name: `${person.firstName} ${person.lastName} (No address data)`,
                            coordinates: [coords.lat, coords.lon],
                            color: 'darkgreen', // Different color for no address
                            fullData: { ...person, aiSummary: personSummary },
                        });
                    })
                );
            }
        }

        // Process Businesses
        for (const business of businessesData) {
            const businessSummary = summaryMap.get('BusinessSummary')?.get(business.businessId) || null;
            if (business.addresses && business.addresses.length > 0) {
                for (let i = 0; i < business.addresses.length; i++) {
                    const address = business.addresses[i];
                    geocodingPromises.push(
                        getPreciseCoords(address, `business ${business.businessId} address ${i}`).then(coords => {
                            mapPoints.push({
                                pointId: `${business.businessId}_address_${i}`,
                                entityId: business.businessId,
                                type: 'business',
                                name: `${business.legalName} (${address.type || 'address'})`,
                                coordinates: [coords.lat, coords.lon],
                                color: 'red',
                                fullData: { ...business, currentAddressDisplay: address, aiSummary: businessSummary },
                            });
                        })
                    );
                }
            } else { // Add business even if no address
                geocodingPromises.push(
                    getPreciseCoords(null, `business ${business.businessId} no address`).then(coords => {
                        mapPoints.push({
                            pointId: `${business.businessId}_default`,
                            entityId: business.businessId,
                            type: 'business',
                            name: `${business.legalName} (No address data)`,
                            coordinates: [coords.lat, coords.lon],
                            color: 'darkred',
                            fullData: { ...business, aiSummary: businessSummary },
                        });
                    })
                );
            }
        }
        
        console.log(`Starting ${geocodingPromises.length} geocoding operations...`);
        await Promise.all(geocodingPromises);
        console.log("All geocoding operations completed.");

        // Process Device Locations (each point in a window is a map point)
        deviceLocationsData.forEach(windowDoc => {
            // The summary is for the window/device, not individual points.
            // The ID in DeviceLocationSummary corresponds to windowDoc.windowId
            const deviceWindowSummary = summaryMap.get('DeviceLocationSummary')?.get(windowDoc.windowId) || null;
            
            if (windowDoc.locationPoints && windowDoc.locationPoints.length > 0) {
                windowDoc.locationPoints.forEach((point, index) => {
                    if (point.coordinates && point.coordinates.length === 2 && typeof point.coordinates[0] === 'number' && typeof point.coordinates[1] === 'number') {
                        mapPoints.push({
                            pointId: `${windowDoc.deviceId}_${windowDoc.windowId}_point_${index}`,
                            entityId: windowDoc.windowId, // The summary is for the window
                            type: 'device', // Changed to lowercase
                            name: `Device: ${windowDoc.deviceId} (Window ${windowDoc.windowId.substring(0,8)}... Point ${index + 1} at ${new Date(point.timestamp).toLocaleTimeString()})`,
                            coordinates: [point.coordinates[1], point.coordinates[0]], // Swap to [lat, lon]
                            color: 'blue',
                            fullData: {
                                ...point,
                                deviceId: windowDoc.deviceId,
                                windowId: windowDoc.windowId,
                                windowStartTime: windowDoc.windowStartTime,
                                windowEndTime: windowDoc.windowEndTime,
                                deviceInfo: windowDoc.deviceInfo,
                                aiSummary: deviceWindowSummary // Summary for the whole window
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
