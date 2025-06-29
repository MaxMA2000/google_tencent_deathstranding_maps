# Maps API Comparison: Google vs Tencent

## Overview

This document compares the Google Maps API and Tencent Maps API implementations used in our project.

## Google Maps API

### Key Features Used
- Map initialization with custom styling
- Markers for locations
- DirectionsService for route planning
- DirectionsRenderer for displaying routes

### Implementation Notes
- Uses the `@react-google-maps/api` library for React integration
- Requires an API key from the Google Cloud Console
- Handles navigation between two points with waypoints support
- Provides real-time traffic data

## Tencent Maps API

### Key Features Used
- 3D map visualization
- Marker placement
- Route planning with the Direction API
- Custom styling for routes

### Implementation Notes
- Uses the Tencent Maps JavaScript API (GL version)
- Requires an API key from the Tencent Maps Console
- Supports 3D terrain visualization
- Provides route planning through WebService API

### Direction API Details

The Tencent Maps Direction API provides route planning capabilities for various transportation modes:

1. **Driving (driving)**: Supports real-time traffic, toll-free routes, and avoids highways
2. **Walking (walking)**: Pedestrian route planning
3. **Bicycling (bicycling)**: Routes optimized for bicycles
4. **E-bicycling (ebicycling)**: Routes for electric bicycles
5. **Transit (transit)**: Public transportation options including buses and subways
6. **E-driving (edriving)**: Electric vehicle routing with charging stations (premium service)

#### API Endpoint Format
```
https://apis.map.qq.com/ws/direction/v1/[mode]/?from=[lat,lng]&to=[lat,lng]&key=[your_key]
```

#### Example Request for Driving Directions
```
https://apis.map.qq.com/ws/direction/v1/driving/?from=22.3193,114.1694&to=22.2816,114.1589&output=json&key=YOUR_KEY
```

#### Response Structure
The API returns a JSON response with the following key components:

1. **status**: Status code (0 = success)
2. **message**: Status message
3. **result**: Contains the route data including:
   - **routes**: Array of possible routes
   - **polyline**: Encoded path coordinates
   - **coors**: Coordinate array (needs decoding)
   - **distance**: Total distance in meters
   - **duration**: Estimated travel time in seconds

#### Polyline Decoding
The polyline coordinates are compressed using forward differencing. To decode:

```javascript
const decodePolyline = (polyline) => {
  const coors = [...polyline];
  for (let i = 2; i < coors.length; i++) {
    coors[i] = coors[i - 2] + coors[i] / 1000000;
  }
  
  // Convert to path array
  const path = [];
  for (let i = 0; i < coors.length; i += 2) {
    path.push({ lat: coors[i], lng: coors[i + 1] });
  }
  
  return path;
};
```

### Implementation Challenges

1. **CORS Limitations**: The Tencent Maps Direction API doesn't support direct client-side requests due to CORS restrictions. Server-side proxying is recommended.

2. **API Availability**: The Direction Service might not be available in all regions or for all transportation modes.

3. **Documentation**: Most documentation is in Chinese, which can make implementation challenging for non-Chinese speakers.

4. **Error Handling**: Proper error handling is essential as the API may return different error codes based on request validity and service availability.

## Comparison Table

| Feature | Google Maps API | Tencent Maps API |
|---------|----------------|------------------|
| Global Coverage | Excellent | Strong in China, limited elsewhere |
| Documentation | Extensive (multi-language) | Primarily in Chinese |
| 3D Capabilities | Limited in standard API | Strong 3D support |
| Route Planning | Comprehensive | Comprehensive within supported regions |
| Traffic Data | Real-time global | Real-time in supported regions |
| API Structure | Object-oriented client API | Mix of client and WebService APIs |
| CORS Support | Yes | Limited, may require server proxy |
| Pricing | Pay-as-you-go with free tier | Similar structure with region-specific pricing |

## Implementation Recommendations

1. **For global applications**: Use Google Maps as the primary provider with Tencent Maps as a fallback for China-specific regions.

2. **For China-focused applications**: Use Tencent Maps as the primary provider.

3. **For hybrid solutions**: Implement both APIs with a region-detection system to select the appropriate provider.

4. **Server-side integration**: For Tencent Maps Direction API, implement server-side proxying to avoid CORS issues. 