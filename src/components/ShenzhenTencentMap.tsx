'use client';

import React, { useState, useRef, useCallback } from 'react';
import { TMap, MultiPolyline, MultiMarker } from 'tlbs-map-react';

// 深圳A点 - 深圳北站
const pointA = {
  lat: 22.6087,
  lng: 114.0298,
  name: "深圳北站"
};

// 深圳B点 - 深圳湾公园
const pointB = {
  lat: 22.4816,
  lng: 113.9356,
  name: "深圳湾公园"
};

// 深圳市中心坐标
const shenzhenCenter = {
  lat: 22.5431,
  lng: 114.0579
};

// 预定义路线（作为备用）
const routePath = [
  { lat: 22.6087, lng: 114.0298 }, // 深圳北站
  { lat: 22.6050, lng: 114.0250 },
  { lat: 22.6000, lng: 114.0200 },
  { lat: 22.5950, lng: 114.0150 },
  { lat: 22.5900, lng: 114.0100 },
  { lat: 22.5850, lng: 114.0050 },
  { lat: 22.5800, lng: 114.0000 },
  { lat: 22.5750, lng: 113.9950 },
  { lat: 22.5700, lng: 113.9900 },
  { lat: 22.5650, lng: 113.9850 },
  { lat: 22.5600, lng: 113.9800 },
  { lat: 22.5550, lng: 113.9750 },
  { lat: 22.5500, lng: 113.9700 },
  { lat: 22.5450, lng: 113.9650 },
  { lat: 22.5400, lng: 113.9600 },
  { lat: 22.5350, lng: 113.9550 },
  { lat: 22.5300, lng: 113.9500 },
  { lat: 22.5250, lng: 113.9450 },
  { lat: 22.5200, lng: 113.9400 },
  { lat: 22.4816, lng: 113.9356 }  // 深圳湾公园
];

// Custom map style for sci-fi theme
const mapStyle = {
  'styleId': 'style1',
  'mapStyleId': '1',
  'backgroundColor': '#001e3c',
  'features': [
    {
      'featureType': 'water',
      'elementType': 'all',
      'stylers': {
        'color': '#00b4ff'
      }
    },
    {
      'featureType': 'road',
      'elementType': 'geometry',
      'stylers': {
        'color': '#0047ab'
      }
    },
    {
      'featureType': 'building',
      'elementType': 'geometry',
      'stylers': {
        'color': '#001e3c'
      }
    },
    {
      'featureType': 'land',
      'elementType': 'all',
      'stylers': {
        'color': '#001e3c'
      }
    }
  ]
};

export default function ShenzhenTencentMap() {
  const [showRoute, setShowRoute] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState<{ lat: number; lng: number }[]>([]);
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const mapRef = useRef<any>(null);

  // Decode polyline from Tencent Maps Direction API
  const decodePolyline = (polyline: number[]) => {
    if (!polyline || polyline.length < 2) {
      console.error("Invalid polyline data:", polyline);
      return [];
    }
    
    console.log("Decoding polyline with", polyline.length, "elements");
    console.log("First few elements:", polyline.slice(0, 10));
    
    // According to Tencent Maps documentation, polyline uses forward differencing compression
    // The first two values are absolute coordinates, subsequent values are relative offsets
    const coordinates = [...polyline];
    const path: { lat: number; lng: number }[] = [];
    
    try {
      // Apply forward differencing decompression: coors[i] = coors[i-2] + coors[i]/1000000
      for (let i = 2; i < coordinates.length; i++) {
        coordinates[i] = coordinates[i - 2] + coordinates[i] / 1000000;
      }
      
      console.log("Decompressed coordinates:", coordinates.slice(0, 10));
      
      // Convert to coordinate objects - 确保格式正确
      for (let i = 0; i < coordinates.length; i += 2) {
        if (i + 1 < coordinates.length) {
          const lat = Number(coordinates[i]);
          const lng = Number(coordinates[i + 1]);
          
          // Validate coordinates
          if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
            // 根据 tlbs-map-react 文档，使用 lat/lng 格式
            path.push({ lat: lat, lng: lng });
          }
        }
      }
      
      console.log("Successfully decoded", path.length, "coordinate points");
      console.log("First coordinate:", path[0]?.lat, path[0]?.lng);
      console.log("Last coordinate:", path[path.length - 1]?.lat, path[path.length - 1]?.lng);
      
      return path;
    } catch (error) {
      console.error("Error decoding polyline:", error);
      return [];
    }
  };

  // Fetch route data from Tencent Maps API
  const fetchRouteData = async () => {
    setIsRouteLoading(true);
    console.log("Fetching route data from Tencent Maps API...");
    
    try {
      const response = await fetch(`/api/tencent-directions?from=${pointA.lat},${pointA.lng}&to=${pointB.lat},${pointB.lng}&mode=driving`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Received route data:", data);
      
      if (data.status === 0 && data.result?.routes?.length > 0) {
        const route = data.result.routes[0];
        const routeCoordinates = decodePolyline(route.polyline);
        
        if (routeCoordinates.length > 0) {
          console.log("Decoded route coordinates:", routeCoordinates.length, "points");
          setRouteCoordinates(routeCoordinates);
          
          // 自动调整地图视野以显示完整路线
          setTimeout(() => {
            if (mapRef.current && routeCoordinates.length > 1) {
              console.log("Adjusting map bounds to show route...");
              
              // 计算路线的边界
              let minLat = routeCoordinates[0].lat;
              let maxLat = routeCoordinates[0].lat;
              let minLng = routeCoordinates[0].lng;
              let maxLng = routeCoordinates[0].lng;
              
              routeCoordinates.forEach(coord => {
                minLat = Math.min(minLat, coord.lat);
                maxLat = Math.max(maxLat, coord.lat);
                minLng = Math.min(minLng, coord.lng);
                maxLng = Math.max(maxLng, coord.lng);
              });
              
              // 添加一些边距
              const padding = 0.01;
              
              // 根据官方文档，创建正确的 LatLngBounds 对象
              const sw = new (window as any).TMap.LatLng(minLat - padding, minLng - padding);
              const ne = new (window as any).TMap.LatLng(maxLat + padding, maxLng + padding);
              const bounds = new (window as any).TMap.LatLngBounds(sw, ne);
              
              console.log("Route bounds:", bounds);
              
              try {
                // 使用 fitBounds 方法调整视野
                mapRef.current.fitBounds(bounds, { padding: 50 });
                console.log("Map bounds adjusted successfully");
              } catch (error) {
                console.error("Error adjusting map bounds:", error);
                // 回退到设置中心点
                const centerLat = (minLat + maxLat) / 2;
                const centerLng = (minLng + maxLng) / 2;
                const routeCenterLatLng = new (window as any).TMap.LatLng(centerLat, centerLng);
                mapRef.current.setCenter(routeCenterLatLng);
                mapRef.current.setZoom(12);
              }
            }
          }, 500); // 延迟确保路线已渲染
          
          return;
        } else {
          throw new Error("No route coordinates found in response");
        }
      } else {
        throw new Error("No routes found in response");
      }
    } catch (error) {
      console.error("Error fetching route data:", error);
      
      // Fallback to predefined route
      console.log("Using fallback predefined route");
      const fallbackRoute = [
        pointA,
        { lat: 22.5431, lng: 114.0579 }, // Center point
        pointB
      ];
      setRouteCoordinates(fallbackRoute);
    } finally {
      setIsRouteLoading(false);
    }
  };

  // Toggle route display
  const toggleRoute = useCallback(async () => {
    console.log("=== Toggle route clicked ===");
    console.log("Current showRoute state:", showRoute);
    
    if (showRoute) {
      // Hide route
      console.log("Hiding route...");
      setShowRoute(false);
      setRouteCoordinates([]);
      
      // 重新聚焦到深圳中心
      setTimeout(() => {
        if (mapRef.current) {
          // 使用 TMap.LatLng 对象设置中心点
          const centerLatLng = new (window as any).TMap.LatLng(shenzhenCenter.lat, shenzhenCenter.lng);
          mapRef.current.setCenter(centerLatLng);
          mapRef.current.setZoom(13);
          console.log("Map reset to Shenzhen center");
        }
      }, 100);
    } else {
      // Show route
      console.log("Showing route...");
      await fetchRouteData();
      setShowRoute(true);
    }
  }, [showRoute]);

  // Marker data - 根据 tlbs-map-react 文档格式
  const markerGeometries = [
    {
      id: 'pointA',
      styleId: 'marker',
      position: { lat: pointA.lat, lng: pointA.lng },
      properties: {
        title: pointA.name
      }
    },
    {
      id: 'pointB', 
      styleId: 'marker',
      position: { lat: pointB.lat, lng: pointB.lng },
      properties: {
        title: pointB.name
      }
    }
  ];

  // Marker styles - 根据 tlbs-map-react 文档格式
  const markerStyles = {
    marker: {
      width: 30,
      height: 30,
      anchor: { x: 15, y: 30 },
      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="%2300b4ff" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>'
    }
  };

  // Polyline geometries - 根据官方文档格式
  const polylineGeometries = showRoute && routeCoordinates.length > 0 ? [
    {
      id: 'route-line',
      styleId: 'route', // 添加 styleId 引用样式
      paths: routeCoordinates
    }
  ] : [];

  // Polyline styles - 根据官方文档格式
  const polylineStyles = {
    route: {
      color: '#00b4ff',
      width: 6,
      borderWidth: 2,
      borderColor: '#ffffff',
      lineCap: 'round',
      lineJoin: 'round'
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* 腾讯地图 - 根据官方文档使用 options 属性 */}
      <TMap
        ref={mapRef}
        apiKey={process.env.NEXT_PUBLIC_TENCENT_MAP_KEY || ''}
        className="w-full h-full"
        options={{
          center: shenzhenCenter,
          zoom: 13,
          viewMode: "2D",
          pitch: 0
        }}
        control={{
          zoom: {
            position: 'bottomRight',
            className: 'tmap-zoom-control-box',
            numVisible: true,
          },
          scale: {
            position: 'bottomLeft'
          }
        }}
        onLoad={() => {
          console.log("TMap loaded with options, center:", shenzhenCenter);
          console.log("Map should be centered on Shenzhen automatically");
        }}
      >
        {/* 标记点 */}
        <MultiMarker
          geometries={markerGeometries}
          styles={markerStyles}
        />
        
        {/* 测试路线 - 简单的直线 */}
        {showRoute && (
          <MultiPolyline
            geometries={[
              {
                id: 'test-line',
                styleId: 'testRoute',
                paths: [
                  { lat: pointA.lat, lng: pointA.lng },
                  { lat: pointB.lat, lng: pointB.lng }
                ]
              }
            ]}
            styles={{
              testRoute: {
                color: '#ff0000', // 红色测试线
                width: 8,
                borderWidth: 0,
                lineCap: 'round'
              }
            }}
            onLoad={() => {
              console.log("Test MultiPolyline loaded successfully");
            }}
          />
        )}
        
        {/* 实际路线 */}
        {showRoute && routeCoordinates.length > 0 && (
          <MultiPolyline
            geometries={polylineGeometries}
            styles={polylineStyles}
            onLoad={() => {
              console.log("Route MultiPolyline loaded successfully");
              console.log("Route coordinates count:", routeCoordinates.length);
              console.log("First few coordinates:", routeCoordinates.slice(0, 5));
            }}
          />
        )}
      </TMap>

      {/* 控制按钮 - 与 Google Maps 样式保持一致 */}
      <button
        onClick={toggleRoute}
        disabled={isRouteLoading}
        className="absolute bottom-4 right-4 px-4 py-2 bg-[#001e3c] text-[#00b4ff] border border-[#00b4ff] rounded-md hover:bg-[#00b4ff]/20 transition-colors text-glow z-[1000]"
        style={{ 
          position: 'absolute',
          zIndex: 1000,
          pointerEvents: 'auto'
        }}
      >
        {isRouteLoading 
          ? '加载中...' 
          : showRoute 
            ? '隐藏路线' 
            : '显示路线: 深圳北站 → 深圳湾公园'
        }
      </button>
    </div>
  );
} 