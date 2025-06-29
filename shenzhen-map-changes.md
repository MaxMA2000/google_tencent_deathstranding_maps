# 深圳地图修改说明

## 修改概述

已成功将腾讯地图从香港位置修改为深圳位置，并设置了新的A、B两点进行导航。

## 主要修改内容

### 1. 地理位置更改

#### 原来的香港坐标：
- **A点（旺角）**: 22.3193, 114.1694
- **B点（中环）**: 22.2816, 114.1589
- **地图中心（香港）**: 22.3000, 114.1700

#### 新的深圳坐标：
- **A点（深圳北站）**: 22.6087, 114.0298
- **B点（深圳湾公园）**: 22.4816, 113.9356
- **地图中心（深圳）**: 22.5431, 114.0579

### 2. 文件重命名

- `HongKongTencentMap.tsx` → `ShenzhenTencentMap.tsx`
- `HongKongTencentMapCard.tsx` → `ShenzhenTencentMapCard.tsx`
- 组件名称：`HongKongTencentMap` → `ShenzhenTencentMap`
- 组件名称：`HongKongTencentMapCard` → `ShenzhenTencentMapCard`

### 3. 界面文本更新

#### 地图卡片标题和描述：
- **标题**: "Hong Kong - Tencent Maps 3D" → "深圳 - 腾讯地图 3D"
- **描述**: "Navigation from Mong Kok to Central" → "从深圳北站导航到深圳湾公园"

#### 按钮文本：
- "Show Route: Mong Kok to Central" → "显示路线: 深圳北站 → 深圳湾公园"
- "Hide Route" → "隐藏路线"
- "Loading..." → "加载中..."

#### 调试信息：
- "Map: Loaded/Loading | Route: Visible/Hidden" → "深圳地图: 已加载/加载中 | 路线: 显示/隐藏"

### 4. 地点信息

#### A点 - 深圳北站
- **坐标**: 22.6087, 114.0298
- **描述**: 深圳市的主要高铁站，连接广深港高铁和多条地铁线路
- **重要性**: 深圳北部重要的交通枢纽

#### B点 - 深圳湾公园
- **坐标**: 22.4816, 113.9356
- **描述**: 深圳著名的海滨公园，可以远眺香港
- **重要性**: 深圳南部的休闲娱乐地标

### 5. 导航路线

**路线类型**: 驾车导航
**预计距离**: 约15-20公里
**行驶方向**: 从北向南，穿越深圳市区

### 6. 技术实现

#### API调用更新：
```javascript
// 原来的API调用
`/api/tencent-directions?from=${mongKok.lat},${mongKok.lng}&to=${central.lat},${central.lng}&mode=driving`

// 新的API调用
`/api/tencent-directions?from=${pointA.lat},${pointA.lng}&to=${pointB.lat},${pointB.lng}&mode=driving`
```

#### 标记点更新：
```javascript
// A点标记
{
  id: 'pointA',
  position: new window.TMap.LatLng(22.6087, 114.0298),
  title: '深圳北站'
}

// B点标记
{
  id: 'pointB', 
  position: new window.TMap.LatLng(22.4816, 113.9356),
  title: '深圳湾公园'
}
```

## 功能特性

1. **3D地图显示**: 显示深圳市区的3D地形
2. **实时路线规划**: 使用腾讯地图API计算最优路线
3. **交互式标记**: A、B两点的可视化标记
4. **中文界面**: 完全中文化的用户界面
5. **错误处理**: 如果API调用失败，会显示预定义的备用路线

## 使用方法

1. 打开应用程序：`http://localhost:3000`
2. 找到"深圳 - 腾讯地图 3D"卡片
3. 点击"显示路线: 深圳北站 → 深圳湾公园"按钮
4. 查看从深圳北站到深圳湾公园的导航路线

## 注意事项

- 需要有效的腾讯地图API密钥
- 确保网络连接正常以获取实时路线数据
- 如果API调用失败，系统会自动使用预定义的备用路线 