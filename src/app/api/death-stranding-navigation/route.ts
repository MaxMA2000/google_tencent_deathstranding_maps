import { NextRequest, NextResponse } from 'next/server';

// 死亡搁浅地图上的位置数据
const locations = {
  "首都结点城": { x: 400, y: 300 },
  "港口结点城": { x: 200, y: 400 },
  "湖结点城": { x: 600, y: 200 },
  "山地结点城": { x: 500, y: 150 },
  "南方结点城": { x: 350, y: 500 }
};

// 模拟地形障碍和路径难度
const terrainObstacles = [
  { x: 300, y: 250, radius: 50, type: "BT区域" },
  { x: 450, y: 350, radius: 30, type: "时雨区" },
  { x: 250, y: 300, radius: 40, type: "峭壁" }
];

// 生成路径点，避开障碍
function generateRoute(from: {x: number, y: number}, to: {x: number, y: number}) {
  const route = [];
  const steps = 25;
  
  // 计算直线路径
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    let x = from.x + dx * t;
    let y = from.y + dy * t;
    
    // 检查是否接近障碍，如果是则偏移路径
    for (const obstacle of terrainObstacles) {
      const distToObstacle = Math.sqrt(
        Math.pow(x - obstacle.x, 2) + Math.pow(y - obstacle.y, 2)
      );
      
      if (distToObstacle < obstacle.radius + 20) {
        // 根据障碍类型调整偏移
        const offsetMultiplier = obstacle.type === "BT区域" ? 2 : 1.5;
        const angle = Math.atan2(y - obstacle.y, x - obstacle.x);
        const offset = (obstacle.radius + 30) * offsetMultiplier;
        
        x = obstacle.x + Math.cos(angle) * offset;
        y = obstacle.y + Math.sin(angle) * offset;
      }
    }
    
    // 添加一些随机变化，模拟真实路径
    if (i > 0 && i < steps) {
      x += (Math.random() - 0.5) * 15;
      y += (Math.random() - 0.5) * 15;
    }
    
    route.push({ x: Math.round(x), y: Math.round(y) });
  }
  
  return route;
}

// 计算路线统计信息
function calculateRouteStats(route: {x: number, y: number}[]) {
  let totalDistance = 0;
  let estimatedTime = 0;
  let difficultyScore = 1;
  
  for (let i = 1; i < route.length; i++) {
    const dx = route[i].x - route[i-1].x;
    const dy = route[i].y - route[i-1].y;
    const segmentDistance = Math.sqrt(dx * dx + dy * dy);
    totalDistance += segmentDistance;
    
    // 检查路径段是否经过危险区域
    const midX = (route[i].x + route[i-1].x) / 2;
    const midY = (route[i].y + route[i-1].y) / 2;
    
    for (const obstacle of terrainObstacles) {
      const distToObstacle = Math.sqrt(
        Math.pow(midX - obstacle.x, 2) + Math.pow(midY - obstacle.y, 2)
      );
      
      if (distToObstacle < obstacle.radius + 50) {
        difficultyScore += obstacle.type === "BT区域" ? 0.5 : 0.3;
      }
    }
  }
  
  // 估算时间（基于距离和难度）
  estimatedTime = Math.round((totalDistance * difficultyScore) / 10);
  
  return {
    distance: Math.round(totalDistance),
    estimatedTime,
    difficultyScore: Math.round(difficultyScore * 10) / 10,
    obstacles: terrainObstacles.length
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  
  console.log(`Death Stranding Navigation API called: ${from} -> ${to}`);
  
  // 验证参数
  if (!from || !to) {
    return NextResponse.json({
      success: false,
      error: 'Missing required parameters: from and to'
    }, { status: 400 });
  }
  
  // 检查位置是否存在
  const fromLocation = locations[from as keyof typeof locations];
  const toLocation = locations[to as keyof typeof locations];
  
  if (!fromLocation || !toLocation) {
    return NextResponse.json({
      success: false,
      error: 'Invalid location. Available locations: ' + Object.keys(locations).join(', ')
    }, { status: 400 });
  }
  
  try {
    // 模拟API处理时间
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    
    // 生成路线
    const route = generateRoute(fromLocation, toLocation);
    const stats = calculateRouteStats(route);
    
    // 模拟Google Maps API响应格式
    const response = {
      success: true,
      status: "OK",
      route: route,
      summary: {
        distance: {
          text: `${stats.distance} 像素单位`,
          value: stats.distance
        },
        duration: {
          text: `约 ${stats.estimatedTime} 分钟`,
          value: stats.estimatedTime * 60
        },
        difficulty: {
          text: `难度: ${stats.difficultyScore}/5.0`,
          value: stats.difficultyScore
        }
      },
      warnings: [
        stats.difficultyScore > 2 ? "路径经过危险区域，建议携带充足装备" : null,
        stats.obstacles > 2 ? "检测到多个障碍区域，请小心行进" : null,
        "时雨可能影响行进速度"
      ].filter(Boolean),
      metadata: {
        from: from,
        to: to,
        generated_at: new Date().toISOString(),
        terrain_analysis: {
          obstacles_detected: stats.obstacles,
          bt_zones: terrainObstacles.filter(o => o.type === "BT区域").length,
          timefall_areas: terrainObstacles.filter(o => o.type === "时雨区").length,
          cliff_areas: terrainObstacles.filter(o => o.type === "峭壁").length
        },
        route_quality: stats.difficultyScore < 2 ? "optimal" : stats.difficultyScore < 3 ? "moderate" : "challenging"
      }
    };
    
    console.log(`Route generated successfully: ${route.length} waypoints, difficulty: ${stats.difficultyScore}`);
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error generating Death Stranding route:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error while generating route'
    }, { status: 500 });
  }
} 