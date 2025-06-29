'use client';

import { useEffect, useState } from 'react';

export default function TencentMapsDebug() {
  const [apiStatus, setApiStatus] = useState<string>('Checking API status...');
  const [serviceStatus, setServiceStatus] = useState<string>('Checking service status...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if TMap is loaded
    if (!window.TMap) {
      setApiStatus('❌ TMap not loaded');
      setError('TMap API is not available. Check if the script loaded correctly.');
      return;
    }
    
    setApiStatus('✅ TMap API loaded');
    
    // Check if Direction service is available
    try {
      if (!window.TMap.service) {
        setServiceStatus('❌ TMap.service not available');
        setError('TMap.service namespace is missing. The Direction service might not be loaded.');
        return;
      }
      
      if (!window.TMap.service.Direction) {
        setServiceStatus('❌ TMap.service.Direction not available');
        setError('Direction service is not available. Make sure you included the service library.');
        return;
      }
      
      setServiceStatus('✅ Direction service available');
    } catch (err) {
      setServiceStatus('❌ Error checking service');
      setError(`Error checking TMap services: ${err instanceof Error ? err.message : String(err)}`);
    }
  }, []);

  return (
    <div className="fixed bottom-4 left-4 p-4 bg-black/80 text-white rounded-md z-50 text-xs font-mono">
      <h3 className="font-bold mb-2">Tencent Maps Debug</h3>
      <div className="mb-1">{apiStatus}</div>
      <div className="mb-1">{serviceStatus}</div>
      {error && (
        <div className="text-red-400 mt-2">
          Error: {error}
        </div>
      )}
      <button 
        className="mt-2 px-2 py-1 bg-blue-600 text-white rounded text-xs"
        onClick={() => {
          console.log('TMap object:', window.TMap);
          console.log('TMap.service:', window.TMap?.service);

        }}
      >
        Log TMap to Console
      </button>
    </div>
  );
} 