'use client';

import { motion } from 'framer-motion';
import { GoogleMapsProvider } from './GoogleMapsProvider';
import HongKongMap from './HongKongMap';

export default function HongKongMapCard() {
  return (
    <motion.div 
      className="map-container relative flex flex-col w-full h-[400px] rounded-xl overflow-hidden border border-[#00b4ff]/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0">
        <GoogleMapsProvider>
          <HongKongMap />
        </GoogleMapsProvider>
      </div>
      
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#001e3c] to-transparent p-4 z-10 pointer-events-none">
        <h3 className="text-xl font-bold text-glow">Google Maps</h3>
        <p className="text-sm text-[#e6f1ff]/70">Navigate from Causeway Bay to Central</p>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4 bg-gradient-to-t from-[#001e3c] to-transparent z-10 pointer-events-none">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-[#00b4ff] animate-pulse"></div>
          <span className="text-xs font-mono">REAL-TIME DATA</span>
        </div>
      </div>
    </motion.div>
  );
} 