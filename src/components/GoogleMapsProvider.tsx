'use client';

import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { ReactNode } from 'react';

// Define libraries to load from Google Maps API
const libraries: Libraries = ['places'];

// Google Maps Provider component to handle API loading
export function GoogleMapsProvider({ children }: { children: ReactNode }) {
  // Load the Google Maps JavaScript API asynchronously
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries,
  });

  if (loadError) {
    return (
      <div className="p-4 text-red-500 bg-red-100 rounded-md">
        Error loading Google Maps. Please check your API key and try again.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="w-6 h-6 border-2 border-t-2 border-[#00b4ff] rounded-full animate-spin"></div>
        <span className="ml-2 text-[#00b4ff]">Loading maps...</span>
      </div>
    );
  }

  // Return children when API is loaded
  return <>{children}</>;
} 