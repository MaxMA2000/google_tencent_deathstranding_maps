# Death Stranding Maps Explorer

A sci-fi themed map explorer application with Google Maps integration.

## Features

- Interactive Google Maps integration
- Navigation from Causeway Bay to Central in Hong Kong
- Sci-fi UI design with animations and effects
- Responsive layout for all device sizes

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Google Maps API key

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd google_tencent_deathstranding_maps
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Google Maps API key:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

> **Important**: Never commit your `.env.local` file to version control. It's already added to `.gitignore` to prevent accidental commits.

### Getting a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Library"
4. Search for and enable the following APIs:
   - Maps JavaScript API
   - Directions API
   - Places API
5. Go to "APIs & Services" > "Credentials"
6. Click "Create credentials" > "API key"
7. Restrict the API key to the APIs you're using and to your domain for security
8. Copy the API key to your `.env.local` file

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Google Maps API
- React Google Maps API (@react-google-maps/api)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
