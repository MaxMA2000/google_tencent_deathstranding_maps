'use client';

import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

// Hong Kong map center coordinates (Victoria Harbour area)
const hongKongCenter = {
  lat: 22.2988,
  lng: 114.1722
};

// Causeway Bay coordinates
const causewayBay = {
  lat: 22.2808,
  lng: 114.1837
};

// Central coordinates
const central = {
  lat: 22.2816,
  lng: 114.1589
};

// Map container style
const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '10px'
};

// Map options
const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: 'all',
      elementType: 'geometry',
      stylers: [{ color: '#001e3c' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#00b4ff' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#0047ab' }]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#001e3c' }]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#00b4ff' }]
    }
  ]
};

export default function HongKongMap() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [showDirections, setShowDirections] = useState(false);

  // Callback when map is loaded
  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  // Callback for directions result
  const directionsCallback = useCallback(
    (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
      if (status === 'OK' && result) {
        setDirections(result);
      }
    },
    []
  );

  // Toggle directions
  const toggleDirections = () => {
    setShowDirections(!showDirections);
  };

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={hongKongCenter}
        zoom={13}
        options={mapOptions}
        onLoad={onMapLoad}
      >
        {/* Markers for Causeway Bay and Central */}
        <Marker
          position={causewayBay}
          label="A"
          icon={{
            url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="%2300b4ff" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />
        <Marker
          position={central}
          label="B"
          icon={{
            url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="%2300b4ff" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />

        {/* Directions Service and Renderer */}
        {showDirections && (
          <DirectionsService
            options={{
              destination: central,
              origin: causewayBay,
              travelMode: google.maps.TravelMode.DRIVING
            }}
            callback={directionsCallback}
          />
        )}

        {directions && showDirections && (
          <DirectionsRenderer
            options={{
              directions: directions,
              polylineOptions: {
                strokeColor: '#FF8C00',
                strokeWeight: 4
              },
              markerOptions: {
                visible: false
              }
            }}
          />
        )}
      </GoogleMap>

      {/* Navigation control button */}
      <button
        onClick={toggleDirections}
        className="absolute bottom-4 right-4 px-4 py-2 bg-[#001e3c] text-[#00b4ff] border border-[#00b4ff] rounded-md hover:bg-[#00b4ff]/20 transition-colors text-glow"
      >
        {showDirections ? 'Hide Route' : 'Show Route: Causeway Bay to Central'}
      </button>
    </div>
  );
} 