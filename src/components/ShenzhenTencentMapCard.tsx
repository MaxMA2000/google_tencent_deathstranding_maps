'use client';

import { motion } from 'framer-motion';
import MapCard from './MapCard';
import ShenzhenTencentMap from './ShenzhenTencentMap';

export default function ShenzhenTencentMapCard() {
  return (
    <MapCard 
      title="深圳 - 腾讯地图 3D"
      description="从深圳北站导航到深圳湾公园"
    >
      <ShenzhenTencentMap />
    </MapCard>
  );
} 