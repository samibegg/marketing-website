// pages/data-map-explorer.js
import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// --- Dynamically import react-leaflet components ---
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Tooltip = dynamic(() => import('react-leaflet').then((mod) => mod.Tooltip), {ssr: false});

let L; // Will be assigned on client-side

export default function DataMapExplorerPage() {
    const [mapData, setMapData] = useState([]);
    const [selectedPointData, setSelectedPointData] = useState(null);
    const [currentSummary, setCurrentSummary] = useState(null); // State for the AI summary
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [defaultIcon, setDefaultIcon] = useState(null);

    const initialPosition = [39.8283, -98.5795]; // Center of US
    const initialZoom = 4;

    // Effect to initialize Leaflet icon on client-side
    useEffect(() => {
        import('leaflet').then(leaflet => {
            L = leaflet;
            setDefaultIcon(
                L.icon({
                    iconUrl: '/marker-icon.png', // Ensure these paths are correct in your public folder
                    iconRetinaUrl: '/marker-icon-2x.png',
                    shadowUrl: '/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    tooltipAnchor: [16, -28],
                    shadowSize: [41, 41]
                })
            );
        }).catch(err => {
            console.error("Failed to load Leaflet dynamically for icon:", err);
            setError("Map icon could not be loaded.");
        });
    }, []);

    // Effect to fetch map data from the API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/map-data'); // API endpoint
                if (!response.ok) {
                    const errData = await response.json().catch(() => ({ error: "Failed to parse error response" }));
                    throw new Error(errData.error || `Failed to fetch map data: ${response.statusText}`);
                }
                const data = await response.json();
                setMapData(data);
            } catch (err) {
                console.error("Fetch error for map data:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Memoized markers for performance
    const markers = useMemo(() => {
        if (!defaultIcon || mapData.length === 0) return null;

        return mapData.map((point) => {
            // Validate coordinates
            if (!point.coordinates || point.coordinates.length !== 2 || point.coordinates.some(c => typeof c !== 'number')) {
                console.warn("Skipping point with invalid coordinates:", point);
                return null;
            }
            return (
                <Marker
                    key={point.pointId || point.id} // Use pointId from API if available, fallback to id
                    position={point.coordinates}
                    icon={defaultIcon}
                    eventHandlers={{
                        click: () => {
                            setSelectedPointData(point.fullData);
                            // Directly use the AI summary provided by the API
                            setCurrentSummary(point.fullData?.aiSummary || null);
                        },
                    }}
                >
                    <Tooltip>
                        <strong style={{ color: point.color || 'blue', textTransform: 'capitalize' }}>
                            {point.type || 'Unknown Type'}:
                        </strong> {point.name || 'Unnamed Point'}
                        <br />
                        Lat: {point.coordinates[0].toFixed(4)}, Lon: {point.coordinates[1].toFixed(4)}
                    </Tooltip>
                </Marker>
            );
        }).filter(marker => marker !== null);
    }, [mapData, defaultIcon]);

    return (
        <>
            <Head>
                <title>Data Map Explorer</title>
                <meta name="description" content="Visualize interconnected data on a map" />
            </Head>

            <div className="flex flex-col h-screen font-sans">
                <header className="bg-gray-800 text-white p-4 text-center">
                    <h1 className="text-2xl font-bold">Interconnected Data Map Explorer</h1>
                </header>

                {isLoading && !error && (
                    <div className="flex-grow flex items-center justify-center">
                        <p className="text-xl text-gray-600">Loading map data...</p>
                    </div>
                )}
                {error && (
                    <div className="flex-grow flex items-center justify-center p-4">
                        <p className="text-xl text-red-600 bg-red-100 p-3 rounded-md">Error: {error}</p>
                    </div>
                )}

                {!isLoading && !error && (
                    <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
                        {/* Map Area */}
                        <div className="w-full md:w-2/3 h-1/2 md:h-full relative">
                            <MapContainer
                                center={initialPosition}
                                zoom={initialZoom}
                                scrollWheelZoom={true}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {markers}
                            </MapContainer>
                        </div>

                        {/* Data Display and Summary Panel Area */}
                        <div className="w-full md:w-1/3 h-1/2 md:h-full p-4 bg-gray-100 overflow-y-auto space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-3 text-gray-700 border-b pb-2">Selected Item Details</h2>
                                
                                {/* AI Summary Section */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium mb-2 text-gray-600">AI Summary</h3>
                                    {currentSummary ? (
                                        <div className="bg-white p-3 rounded shadow-sm text-sm prose max-w-none">
                                            <p>{currentSummary}</p>
                                        </div>
                                    ) : (
                                        selectedPointData ? 
                                        <p className="text-gray-500 italic">No AI summary available for this item.</p>
                                        :
                                        <p className="text-gray-500 italic">Click a marker to see its AI summary.</p>
                                    )}
                                </div>

                                {/* Raw Data Section */}
                                <div>
                                    <h3 className="text-lg font-medium mb-2 text-gray-600">Raw Data</h3>
                                    {selectedPointData ? (
                                        <pre className="bg-white p-3 rounded shadow-sm text-xs whitespace-pre-wrap break-all max-h-60 overflow-y-auto">
                                            {JSON.stringify(selectedPointData, null, 2)}
                                        </pre>
                                    ) : (
                                        <p className="text-gray-500 italic">Click a marker on the map to see its raw details.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
