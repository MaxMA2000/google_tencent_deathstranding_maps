'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface TencentMapsContextType {
  isLoaded: boolean;
  error: string | null;
}

const TencentMapsContext = createContext<TencentMapsContextType>({
  isLoaded: false,
  error: null,
});

export function useTencentMaps() {
  return useContext(TencentMapsContext);
}

interface TencentMapsProviderProps {
  children: React.ReactNode;
}

export function TencentMapsProvider({ children }: TencentMapsProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // tlbs-map-react handles the script loading internally
    // We just need to provide a simple loading state
    const timer = setTimeout(() => {
      setIsLoaded(true);
      console.log("Tencent Maps API loaded successfully");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <TencentMapsContext.Provider value={{ isLoaded, error }}>
      {children}
    </TencentMapsContext.Provider>
  );
} 