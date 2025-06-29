"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import MapCard from "@/components/MapCard";
import HongKongMapCard from "@/components/HongKongMapCard";
import ShenzhenTencentMapCard from "@/components/ShenzhenTencentMapCard";

const mapData = [
  {
    title: "Mountain Region",
    description: "Treacherous terrain with steep cliffs and unpredictable weather patterns"
  },
  {
    title: "Timefall Farm",
    description: "Agricultural zone with specialized facilities to harness timefall properties"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-glow mb-2">TERRAIN ANALYSIS</h2>
          <p className="text-[#e6f1ff]/70 max-w-2xl">
            Access detailed topographical data and route planning for critical delivery paths. 
            Select a region to view detailed terrain information and BT concentration levels.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <HongKongMapCard />
          <ShenzhenTencentMapCard />
          {mapData.map((map, index) => (
            <MapCard 
              key={index}
              title={map.title}
              description={map.description}
              index={index}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-12 p-4 border border-[#00b4ff]/30 rounded-lg bg-[#001e3c]/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#00b4ff] animate-pulse"></div>
            <h3 className="text-sm font-mono text-[#00b4ff]">SYSTEM STATUS</h3>
          </div>
          <p className="text-xs text-[#e6f1ff]/70">
            Chiral network connection: <span className="text-[#00b4ff]">STABLE</span> • 
            Data synchronization: <span className="text-[#00b4ff]">87%</span> • 
            Last updated: <span className="text-[#00b4ff]">23 minutes ago</span>
          </p>
        </motion.div>
      </main>
      
      <footer className="py-4 px-6 text-center text-xs text-[#e6f1ff]/50">
        <p>BRIDGES CARTOGRAPHIC DIVISION • CONFIDENTIAL • AUTHORIZED ACCESS ONLY</p>
      </footer>
    </div>
  );
}
