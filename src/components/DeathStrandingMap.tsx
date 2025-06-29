'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

// 死亡搁浅地图上的关键位置点
const mapLocations = {
  capitalKnot: { x: 400, y: 300, name: "首都结点城" },
  portKnot: { x: 200, y: 400, name: "港口结点城" },
  lakeKnot: { x: 600, y: 200, name: "湖结点城" },
  mountainKnot: { x: 500, y: 150, name: "山地结点城" },
  southKnot: { x: 350, y: 500, name: "南方结点城" }
};

interface RoutePoint {
  x: number;
  y: number;
  name?: string;
}

interface DeathStrandingMapProps {
  className?: string;
}

export default function DeathStrandingMap({ className = "" }: DeathStrandingMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mapImage, setMapImage] = useState<HTMLImageElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showRoute, setShowRoute] = useState(false);
  const [routeData, setRouteData] = useState<RoutePoint[]>([]);
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<{from: string, to: string} | null>(null);

  // 默认路线：从首都结点城到港口结点城
  const defaultFrom = mapLocations.capitalKnot;
  const defaultTo = mapLocations.portKnot;

  // 加载地图图片
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setMapImage(img);
      setIsLoading(false);
      console.log("Death Stranding map loaded successfully");
    };
    img.onerror = () => {
      console.warn("map.jpeg not found, trying placeholder");
      // 尝试加载占位符
      const placeholderImg = new Image();
      placeholderImg.onload = () => {
        setMapImage(placeholderImg);
        setIsLoading(false);
        console.log("Death Stranding placeholder loaded");
      };
      placeholderImg.onerror = () => {
        console.error("Failed to load Death Stranding map and placeholder");
        setIsLoading(false);
      };
      placeholderImg.src = '/map-placeholder.svg';
    };
    img.src = '/map.jpeg';
  }, []);

  // 绘制地图和路线
  const drawMap = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !mapImage) return;

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制地图背景
    ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);

    // 添加科幻效果滤镜
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = 'rgba(0, 30, 60, 0.3)'; // 深蓝色滤镜
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';

    // 绘制位置标记点
    Object.values(mapLocations).forEach(location => {
      drawLocationMarker(ctx, location.x, location.y, location.name);
    });

    // 绘制路线
    if (showRoute && routeData.length > 1) {
      drawRoute(ctx, routeData);
    }
  }, [mapImage, showRoute, routeData]);

  // 绘制位置标记
  const drawLocationMarker = (ctx: CanvasRenderingContext2D, x: number, y: number, name: string) => {
    // 发光效果
    ctx.shadowColor = '#00b4ff';
    ctx.shadowBlur = 15;
    
    // 绘制外圈
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0, 180, 255, 0.3)';
    ctx.fill();
    
    // 绘制内圈
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#00b4ff';
    ctx.fill();
    
    // 重置阴影
    ctx.shadowBlur = 0;
    
    // 绘制标签
    ctx.font = '12px "Courier New", monospace';
    ctx.fillStyle = '#00b4ff';
    ctx.textAlign = 'center';
    ctx.fillText(name, x, y - 20);
  };

  // 绘制路线
  const drawRoute = (ctx: CanvasRenderingContext2D, route: RoutePoint[]) => {
    if (route.length < 2) return;

    // 设置路线样式
    ctx.strokeStyle = '#00ff41'; // 绿色，死亡搁浅风格
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // 发光效果
    ctx.shadowColor = '#00ff41';
    ctx.shadowBlur = 10;

    // 绘制路线
    ctx.beginPath();
    ctx.moveTo(route[0].x, route[0].y);
    
    for (let i = 1; i < route.length; i++) {
      ctx.lineTo(route[i].x, route[i].y);
    }
    
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 绘制起点标记
    drawStartEndMarker(ctx, route[0], '起点', '#00ff41');
    
    // 绘制终点标记
    drawStartEndMarker(ctx, route[route.length - 1], '终点', '#ff4444');
  };

  // 绘制起点/终点标记
  const drawStartEndMarker = (ctx: CanvasRenderingContext2D, point: RoutePoint, label: string, color: string) => {
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
    
    ctx.beginPath();
    ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.font = '10px "Courier New", monospace';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(label, point.x, point.y + 25);
  };

  // 重绘地图
  useEffect(() => {
    drawMap();
  }, [drawMap]);

  // 获取路线数据（模拟API调用）
  const fetchRouteData = async () => {
    setIsRouteLoading(true);
    console.log("Fetching Death Stranding route data...");

    try {
      const response = await fetch(`/api/death-stranding-navigation?from=${defaultFrom.name}&to=${defaultTo.name}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Received Death Stranding route data:", data);
      
      if (data.success && data.route) {
        setRouteData(data.route);
        setCurrentRoute({ from: defaultFrom.name, to: defaultTo.name });
        console.log("Route loaded successfully with", data.route.length, "points");
      } else {
        throw new Error("Invalid route data received");
      }
    } catch (error) {
      console.error("Error fetching route data:", error);
      
      // 使用备用路线数据
      const fallbackRoute = generateFallbackRoute(defaultFrom, defaultTo);
      setRouteData(fallbackRoute);
      setCurrentRoute({ from: defaultFrom.name, to: defaultTo.name });
      console.log("Using fallback route with", fallbackRoute.length, "points");
    } finally {
      setIsRouteLoading(false);
    }
  };

  // 生成备用路线（简单的贝塞尔曲线路径）
  const generateFallbackRoute = (from: RoutePoint, to: RoutePoint): RoutePoint[] => {
    const route: RoutePoint[] = [];
    const steps = 20;
    
    // 创建一个稍微弯曲的路径
    const midX = (from.x + to.x) / 2 + (Math.random() - 0.5) * 100;
    const midY = (from.y + to.y) / 2 + (Math.random() - 0.5) * 100;
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = Math.pow(1 - t, 2) * from.x + 2 * (1 - t) * t * midX + Math.pow(t, 2) * to.x;
      const y = Math.pow(1 - t, 2) * from.y + 2 * (1 - t) * t * midY + Math.pow(t, 2) * to.y;
      route.push({ x, y });
    }
    
    return route;
  };

  // 切换路线显示
  const toggleRoute = async () => {
    if (showRoute) {
      setShowRoute(false);
      setRouteData([]);
      setCurrentRoute(null);
    } else {
      await fetchRouteData();
      setShowRoute(true);
    }
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-[#001e3c] rounded-lg ${className}`}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-t-2 border-[#00b4ff] rounded-full animate-spin mx-auto mb-2"></div>
          <span className="text-[#00b4ff] text-sm">加载死亡搁浅地图中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-[#001e3c] rounded-lg overflow-hidden ${className}`}>
      {/* Canvas地图 */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="w-full h-full object-contain"
        style={{ 
          filter: 'contrast(1.1) brightness(0.9)',
          imageRendering: 'pixelated' 
        }}
      />

      {/* 控制按钮 */}
      <button
        onClick={toggleRoute}
        disabled={isRouteLoading}
        className="absolute bottom-4 right-4 px-4 py-2 bg-[#001e3c] text-[#00b4ff] border border-[#00b4ff] rounded-md hover:bg-[#00b4ff]/20 transition-colors text-glow z-10"
        style={{ 
          fontFamily: '"Courier New", monospace',
          textShadow: '0 0 10px #00b4ff'
        }}
      >
        {isRouteLoading 
          ? '计算路线中...' 
          : showRoute 
            ? '隐藏路线' 
            : `导航: ${defaultFrom.name} → ${defaultTo.name}`
        }
      </button>

      {/* 状态信息 */}
      <div 
        className="absolute top-4 left-4 bg-black/50 text-[#00ff41] p-2 rounded text-xs z-10"
        style={{ fontFamily: '"Courier New", monospace' }}
      >
        <div>死亡搁浅地图系统</div>
        <div>状态: {showRoute ? '导航激活' : '待机'}</div>
        {currentRoute && (
          <div>路线: {currentRoute.from} → {currentRoute.to}</div>
        )}
        <div>路径点: {routeData.length}</div>
      </div>

      {/* 科幻扫描线效果 */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              90deg,
              transparent 0%,
              rgba(0, 180, 255, 0.03) 50%,
              transparent 100%
            )
          `,
          animation: 'scan 3s linear infinite'
        }}
      />

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .text-glow {
          text-shadow: 0 0 10px currentColor;
        }
      `}</style>
    </div>
  );
} 