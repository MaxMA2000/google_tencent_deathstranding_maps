import { motion } from 'framer-motion';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <motion.header 
      className="relative z-10 py-6 px-4 md:px-8 flex justify-between items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-3">
        <motion.div
          className="w-10 h-10 rounded-full bg-[#001e3c] border border-[#00b4ff]/50 flex items-center justify-center border-glow"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <GlobeAltIcon className="w-6 h-6 text-[#00b4ff]" />
        </motion.div>
        <div>
          <h1 className="text-xl font-bold text-glow tracking-wider">DEATH STRANDING</h1>
          <p className="text-xs text-[#e6f1ff]/70 font-mono">CARTOGRAPHIC INTERFACE v1.0</p>
        </div>
      </div>
      
      <div className="hidden md:flex items-center space-x-6">
        <NavLink label="MAPS" active={true} />
        <NavLink label="DATA" active={false} />
        <NavLink label="SETTINGS" active={false} />
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-[#00b4ff] animate-pulse"></div>
        <span className="text-xs font-mono hidden sm:inline">SYSTEM ONLINE</span>
      </div>
    </motion.header>
  );
}

function NavLink({ label, active }: { label: string; active: boolean }) {
  return (
    <button 
      className={`text-sm font-medium tracking-wider relative ${
        active ? 'text-[#00b4ff] text-glow' : 'text-[#e6f1ff]/70 hover:text-[#e6f1ff]'
      }`}
    >
      {label}
      {active && (
        <motion.div 
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00b4ff]"
          layoutId="activeTab"
        />
      )}
    </button>
  );
} 