// pages/data-map-explorer.js
import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic'; // For client-side only rendering of Leaflet map
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS here if not in _app.js

// --- Dynamically import react-leaflet components ---
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Tooltip = dynamic(() => import('react-leaflet').then((mod) => mod.Tooltip), {ssr: false});

// We will initialize L and DefaultIcon inside useEffect to ensure client-side only
let L; // Will be assigned on client

export default function DataMapExplorerPage() {
    const [mapData, setMapData] = useState([]);
    const [selectedPointData, setSelectedPointData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Start with loading true
    const [error, setError] = useState(null);
    const [defaultIcon, setDefaultIcon] = useState(null); // State for the icon

    // Initial map settings
    const initialPosition = [39.8283, -98.5795]; // Center of US
    const initialZoom = 4;

    // Effect to initialize Leaflet icon on client-side
    useEffect(() => {
        import('leaflet').then(leaflet => {
            L = leaflet; 
            setDefaultIcon(
                L.icon({
                    iconUrl: '/marker-icon.png',
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
            setError("Map icon could not be loaded."); // Set an error state
        });
    }, []); 


    useEffect(() => {
        const fetchData = async () => {
            // setIsLoading(true); // Already true initially
            setError(null);
            try {
                const response = await fetch('/api/map-data');
                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.error || `Failed to fetch data: ${response.statusText}`);
                }
                const data = await response.json();
                setMapData(data);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const markers = useMemo(() => {
        if (!defaultIcon || mapData.length === 0) return null;

        return mapData.map((point) => {
            if (!point.coordinates || point.coordinates.length !== 2 || point.coordinates.some(c => c === null || c === undefined)) {
                console.warn("Skipping point with invalid coordinates:", point);
                return null;
            }
            return (
                <Marker
                    key={point.id}
                    position={point.coordinates} 
                    icon={defaultIcon} 
                    eventHandlers={{
                        click: () => {
                            setSelectedPointData(point.fullData);
                        },
                    }}
                >
                    <Tooltip>
                        <strong style={{ color: point.color, textTransform: 'capitalize' }}>{point.type}:</strong> {point.name}
                        <br />
                        Lat: {point.coordinates[0].toFixed(4)}, Lon: {point.coordinates[1].toFixed(4)}
                    </Tooltip>
                </Marker>
            );
        }).filter(marker => marker !== null); 
    }, [mapData, defaultIcon]); 

    // The `if (typeof window === 'undefined')` block that returned early has been removed.
    // The `dynamic` imports with `ssr: false` handle client-side only rendering for map components.
    // The initial `isLoading` state will show a loading message.

    return (
        <>
            <Head>
                <title>Data Map Explorer</title>
                <meta name="description" content="Visualize interconnected data on a map" />
            </Head>

            <div className="flex flex-col h-screen font-sans"> {/* This root div structure is now consistent */}
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
                            {/* MapContainer is dynamically imported with ssr: false, so it won't render on server */}
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
                                {markers} {/* Markers will be null initially on server/client until defaultIcon and mapData are ready */}
                            </MapContainer>
                        </div>

                        {/* Data Display Area */}
                        <div className="w-full md:w-1/3 h-1/2 md:h-full p-4 bg-gray-100 overflow-y-auto">
                            <h2 className="text-xl font-semibold mb-3 text-gray-700 border-b pb-2">Selected Item Data</h2>
                            {selectedPointData ? (
                                <pre className="bg-white p-3 rounded shadow-sm text-xs whitespace-pre-wrap break-all">
                                    {JSON.stringify(selectedPointData, null, 2)}
                                </pre>
                            ) : (
                                <p className="text-gray-500">Click a marker on the map to see its details.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
