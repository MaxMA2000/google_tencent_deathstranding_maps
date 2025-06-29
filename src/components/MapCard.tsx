import { motion } from 'framer-motion';
import { MapIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

export interface MapCardProps {
  title: string;
  description: string;
  index?: number;
  icon?: string;
  children?: ReactNode;
}

export default function MapCard({ title, description, index = 0, icon, children }: MapCardProps) {
  return (
    <motion.div 
      className="map-container relative flex flex-col w-full h-[400px] rounded-xl overflow-hidden border border-[#00b4ff]/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      {children ? (
        // If children are provided, render them
        <div className="absolute inset-0">
          {children}
        </div>
      ) : (
        // Otherwise show the placeholder icon
        <div className="absolute inset-0 flex items-center justify-center">
          {icon ? (
            <img src={icon} alt={title} className="w-24 h-24 opacity-40" />
          ) : (
            <MapIcon className="w-24 h-24 text-[#00b4ff]/40" />
          )}
        </div>
      )}
      
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#001e3c] to-transparent p-4 z-10 pointer-events-none">
        <h3 className="text-xl font-bold text-glow">{title}</h3>
        <p className="text-sm text-[#e6f1ff]/70">{description}</p>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4 bg-gradient-to-t from-[#001e3c] to-transparent z-10 pointer-events-none">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-[#00b4ff] animate-pulse"></div>
          <span className="text-xs font-mono">SECTOR {index + 1}</span>
        </div>
        {!children && (
          <button className="px-3 py-1 text-xs rounded-full bg-[#00b4ff]/20 hover:bg-[#00b4ff]/40 transition-colors border border-[#00b4ff]/50 text-glow pointer-events-auto">
            EXPLORE
          </button>
        )}
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLCAxODAsIDI1NSwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-50 pointer-events-none z-0"></div>
      
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="w-full h-[2px] bg-[#00b4ff]/20 animate-[scanline_4s_linear_infinite]"></div>
      </div>
    </motion.div>
  );
} 