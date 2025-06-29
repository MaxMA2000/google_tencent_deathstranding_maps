'use client';

import React from 'react';
import MapCard from './MapCard';
import DeathStrandingMap from './DeathStrandingMap';

export default function DeathStrandingMapCard() {
  return (
    <MapCard 
      title="死亡搁浅 Death Stranding 地图"
      description="自定义Canvas渲染 | 模拟导航API"
    >
      <DeathStrandingMap className="w-full h-full" />
    </MapCard>
  );
} 