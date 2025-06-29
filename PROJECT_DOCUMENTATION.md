# Death Stranding Maps Explorer

A sci-fi themed Next.js application featuring three different map integration approaches: Google Maps, Tencent Maps, and a custom Canvas-based Death Stranding map system.

## 🌟 Project Overview

This project demonstrates three distinct mapping technologies within a unified Death Stranding-inspired interface:

1. **Google Maps Integration** - Real-world navigation in Hong Kong
2. **Tencent Maps Integration** - Chinese mapping service for Shenzhen
3. **Custom Canvas Map** - Death Stranding game world with mock navigation API

## 🚀 Features

### 🗺️ Multi-Platform Map Support
- **Google Maps API** - Professional mapping with real-time navigation
- **Tencent Maps API** - Chinese market mapping solution with 3D capabilities
- **Custom Canvas Rendering** - Game-world mapping with pixel-perfect control

### 🎮 Death Stranding Theme
- Sci-fi dark blue color scheme with cyan accents
- Glowing text effects and scan line animations
- Monospace fonts (Courier New) for terminal aesthetics
- Grid overlays and futuristic UI components

### 🛣️ Navigation Systems
- **Real Navigation**: Google Maps directions API
- **Chinese Navigation**: Tencent Maps directions API with polyline decoding
- **Mock Navigation**: Custom pathfinding algorithm avoiding obstacles

### 🎨 Visual Effects
- Framer Motion animations
- CSS glow effects and shadows
- Animated scan lines
- Responsive grid layouts
- Glassmorphism effects

## 📁 Project Structure

```
google_tencent_deathstranding_maps/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── tencent-directions/route.ts      # Tencent Maps proxy API
│   │   │   └── death-stranding-navigation/route.ts # Mock navigation API
│   │   ├── globals.css                          # Global styles
│   │   ├── layout.tsx                           # App layout
│   │   └── page.tsx                             # Main page
│   ├── components/
│   │   ├── GoogleMapsProvider.tsx               # Google Maps API loader
│   │   ├── TencentMapsProvider.tsx              # Tencent Maps API loader
│   │   ├── Header.tsx                           # App header
│   │   ├── MapCard.tsx                          # Reusable map card component
│   │   ├── HongKongMap.tsx                      # Google Maps component
│   │   ├── HongKongMapCard.tsx                  # Google Maps card wrapper
│   │   ├── ShenzhenTencentMap.tsx               # Tencent Maps component
│   │   ├── ShenzhenTencentMapCard.tsx           # Tencent Maps card wrapper
│   │   ├── DeathStrandingMap.tsx                # Canvas map component
│   │   └── DeathStrandingMapCard.tsx            # Canvas map card wrapper
│   └── types/
│       └── tmap.d.ts                            # Tencent Maps type definitions
├── public/
│   ├── map.jpeg                                 # Death Stranding map image
│   └── map-placeholder.svg                     # Fallback map placeholder
├── .env.local                                   # Environment variables
└── next.config.ts                               # Next.js configuration
```

## 🛠️ Technologies Used

### Frontend
- **Next.js 15.3.4** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React 19** - Latest React features

### Mapping APIs
- **Google Maps JavaScript API** - `@react-google-maps/api`
- **Tencent Maps API** - `tlbs-map-react` (official React components)
- **HTML5 Canvas** - Custom map rendering

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Maps API key
- Tencent Maps API key

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd google_tencent_deathstranding_maps
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   NEXT_PUBLIC_TENCENT_MAPS_API_KEY=your_tencent_maps_api_key
   ```

4. **Add Death Stranding map image (optional)**
   Place your Death Stranding map image as `public/map.jpeg`
   - If not provided, a placeholder SVG will be used

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the application**
   Navigate to `http://localhost:3000`

## 🗺️ Map Components

### 1. Google Maps (Hong Kong)
**File**: `src/components/HongKongMap.tsx`

**Features**:
- Real-time navigation from Causeway Bay to Central
- Google Maps Directions API integration
- Responsive map controls
- Route visualization with polylines

**API Endpoint**: Google Maps Directions API

### 2. Tencent Maps (Shenzhen)
**File**: `src/components/ShenzhenTencentMap.tsx`

**Features**:
- 3D map rendering with official `tlbs-map-react` library
- Navigation from Shenzhen North Station to Shenzhen Bay Park
- Chinese localization
- Polyline decoding using Tencent's compression algorithm
- Automatic bounds adjustment

**API Endpoint**: `/api/tencent-directions`

### 3. Death Stranding Canvas Map
**File**: `src/components/DeathStrandingMap.tsx`

**Features**:
- Custom Canvas rendering
- Game world locations (Capital Knot City, Port Knot City, etc.)
- Obstacle avoidance pathfinding
- Sci-fi visual effects with glow and scan lines
- Mock navigation API

**API Endpoint**: `/api/death-stranding-navigation`

## 🔌 API Endpoints

### `/api/tencent-directions`
Proxy endpoint for Tencent Maps Directions API to avoid CORS issues.

**Parameters**:
- `from`: Starting coordinates (lat,lng)
- `to`: Destination coordinates (lat,lng)  
- `mode`: Transportation mode (driving, walking, etc.)

**Response**: Decoded route with polyline coordinates

### `/api/death-stranding-navigation`
Mock navigation API simulating Google Maps API format.

**Parameters**:
- `from`: Starting location name
- `to`: Destination location name

**Response**:
```json
{
  "success": true,
  "route": [{"x": 400, "y": 300}, ...],
  "summary": {
    "distance": {"text": "245 pixel units", "value": 245},
    "duration": {"text": "~12 minutes", "value": 720},
    "difficulty": {"text": "Difficulty: 2.3/5.0", "value": 2.3}
  },
  "warnings": ["Path crosses dangerous areas"],
  "metadata": {...}
}
```

## 🎨 Design System

### Color Palette
- **Primary Background**: `#001e3c` (Dark Navy)
- **Secondary Background**: `#002a5c` (Medium Navy)
- **Accent Blue**: `#00b4ff` (Cyan Blue)
- **Success Green**: `#00ff41` (Bright Green)
- **Warning Red**: `#ff4444` (Bright Red)
- **Text Primary**: `#e6f1ff` (Light Blue White)

### Typography
- **Primary Font**: System fonts (Inter, sans-serif)
- **Monospace Font**: "Courier New", monospace
- **Glow Effect**: `text-shadow: 0 0 10px currentColor`

### Components
- **MapCard**: Reusable card container with sci-fi styling
- **Scan Lines**: CSS animations for futuristic effects
- **Grid Overlays**: SVG patterns for technical aesthetics
- **Glow Effects**: CSS shadows and filters

## 🔧 Configuration

### Next.js Configuration
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  devIndicators: {
    buildActivity: false,  // Removes dev indicator
  },
};
```

### Environment Variables
```env
# .env.local
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
NEXT_PUBLIC_TENCENT_MAPS_API_KEY=your_tencent_maps_key
```

### Tailwind Configuration
Custom classes for Death Stranding theme effects.

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Setup
Ensure all API keys are properly configured in your deployment environment.

### Static Assets
Make sure to include the Death Stranding map image (`map.jpeg`) in the `public` folder for full functionality.

## 🔍 Development Notes

### Google Maps Integration
- Uses `@react-google-maps/api` for React integration
- Implements DirectionsService for route calculation
- Handles API loading states and error conditions

### Tencent Maps Integration
- Uses official `tlbs-map-react` library
- Implements polyline decoding algorithm from Tencent documentation
- Handles Chinese localization and coordinate systems

### Canvas Map Implementation
- Pure HTML5 Canvas rendering
- Custom pathfinding algorithm with obstacle avoidance
- Implements Bézier curves for smooth route generation
- Game-world coordinate system

### Performance Considerations
- Lazy loading of map components
- Efficient Canvas rendering with requestAnimationFrame
- Debounced API calls to prevent rate limiting
- Optimized image loading with fallbacks

## 🐛 Troubleshooting

### Common Issues

1. **Maps not loading**
   - Check API keys in `.env.local`
   - Verify API key permissions and billing

2. **Canvas map not displaying**
   - Ensure `map.jpeg` is in `public/` folder
   - Check browser console for image loading errors

3. **Routes not calculating**
   - Verify API endpoints are accessible
   - Check network tab for API call failures

4. **Styling issues**
   - Ensure Tailwind CSS is properly configured
   - Check for CSS conflicts with map libraries

### Debug Mode
Enable detailed logging by checking browser console for component-specific debug messages.

## 📝 License

This project is for educational and demonstration purposes. Please ensure you comply with the respective API terms of service for Google Maps and Tencent Maps.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions, please check the troubleshooting section above or refer to the respective API documentation:

- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [Tencent Maps API](https://lbs.qq.com/javascript_v2/index.html)
- [tlbs-map-react Documentation](https://mapapi.qq.com/web/tlbs-map-react/)

---

**Built with ❤️ using Next.js, TypeScript, and multiple mapping APIs** 