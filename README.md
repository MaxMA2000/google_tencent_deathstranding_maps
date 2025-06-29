# Death Stranding Maps Explorer

A Next.js application featuring a sci-fi themed interface for exploring maps using both Google Maps and Tencent Maps APIs. The application showcases navigation capabilities with a dark, futuristic Death Stranding-inspired design.

![Demo](demo.gif)

## Features

- **Sci-Fi UI Theme**: Dark blue color scheme with glowing effects and grid overlays
- **Google Maps Integration**: Interactive map with navigation from Causeway Bay to Central (Hong Kong)
- **Tencent Maps 3D Integration**: 3D map visualization with navigation from Mong Kok to Central (Hong Kong)
- **Real-time Route Planning**: Dynamic route calculation and display
- **Responsive Design**: Works on desktop and mobile devices
- **Animated Components**: Smooth animations using Framer Motion

## Tech Stack

- **Framework**: Next.js 15.3.4 with TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Google Maps API, Tencent Maps API
- **Animations**: Framer Motion
- **Icons**: Heroicons

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd google_tencent_deathstranding_maps
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add your API keys:

```env
# Tencent Maps API Key
# Get your API key from: https://lbs.qq.com/console/mykey.html
NEXT_PUBLIC_TENCENT_MAP_KEY=your_tencent_maps_api_key_here

# Google Maps API Key (optional)
# Get your API key from: https://console.cloud.google.com/
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 4. Getting API Keys

#### Tencent Maps API Key
1. Visit [Tencent Maps Console](https://lbs.qq.com/console/mykey.html)
2. Create an account or log in
3. Create a new application
4. Enable the following services:
   - WebService API (for direction services)
   - JavaScript API GL (for map display)
5. Copy your API key to the `.env.local` file

#### Google Maps API Key (Optional)
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Maps JavaScript API
4. Create credentials (API key)
5. Restrict the API key to your domain for security
6. Copy your API key to the `.env.local` file

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## API Integration

### Tencent Maps Direction API

The application uses the Tencent Maps WebService API for route planning. The implementation includes:

- **Server-side API Route**: `/api/tencent-directions` to avoid CORS issues
- **Polyline Decoding**: Proper decoding of compressed route coordinates
- **Multiple Transportation Modes**: Support for driving, walking, transit, etc.
- **Error Handling**: Graceful fallback to predefined routes

#### API Endpoint Format
```
GET /api/tencent-directions?from=lat,lng&to=lat,lng&mode=driving
```

#### Supported Modes
- `driving`: Car navigation
- `walking`: Pedestrian routes
- `transit`: Public transportation
- `bicycling`: Bicycle routes

### Google Maps API

Uses the standard Google Maps JavaScript API with:
- DirectionsService for route calculation
- DirectionsRenderer for route display
- Custom styling for the sci-fi theme

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── tencent-directions/
│   │       └── route.ts          # Tencent Maps API proxy
│   ├── globals.css               # Global styles and animations
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── components/
│   ├── GoogleMapsProvider.tsx    # Google Maps context
│   ├── Header.tsx                # Navigation header
│   ├── HongKongMap.tsx           # Google Maps component
│   ├── HongKongMapCard.tsx       # Google Maps card wrapper
│   ├── HongKongTencentMap.tsx    # Tencent Maps component
│   ├── HongKongTencentMapCard.tsx # Tencent Maps card wrapper
│   ├── MapCard.tsx               # Reusable map card component
│   └── TencentMapsProvider.tsx   # Tencent Maps context
└── types/
    └── tmap.d.ts                 # TypeScript definitions for Tencent Maps
```

## Features in Detail

### Map Components

1. **Google Maps Card**: Shows navigation from Causeway Bay to Central using public transit
2. **Tencent Maps Card**: Displays 3D navigation from Mong Kok to Central using driving directions
3. **Placeholder Cards**: Additional themed cards for future map implementations

### Sci-Fi Theme Elements

- **Grid Overlay**: Animated grid pattern on all map cards
- **Scan Line Effect**: Moving scan line animation
- **Glow Effects**: Text and border glow effects
- **Color Scheme**: Dark blue (#001e3c) background with cyan (#00b4ff) accents
- **Typography**: Monospace fonts for technical feel

### Animations

- **Card Entrance**: Staggered fade-in animation for map cards
- **Hover Effects**: Scale animation on card hover
- **Loading States**: Animated spinners for API calls
- **Pulse Effects**: Animated status indicators

## Troubleshooting

### Common Issues

1. **Maps not loading**: Check if API keys are correctly set in `.env.local`
2. **CORS errors**: Ensure you're using the server-side API route for Tencent Maps
3. **Route not displaying**: Check browser console for API response errors
4. **Styling issues**: Verify Tailwind CSS is properly configured

### Debug Information

The application includes debug information in the map components showing:
- Map loading status
- Route visibility status
- API call results in browser console

## License

This project is for educational and demonstration purposes.
