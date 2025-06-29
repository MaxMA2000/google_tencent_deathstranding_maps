# Google Maps API Integration Flow

This document outlines the sequence of interactions between components in our Google Maps integration.

## Component Interaction Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Page as Main Page
    participant HKCard as HongKongMapCard
    participant Provider as GoogleMapsProvider
    participant HKMap as HongKongMap
    participant GMAPI as Google Maps API

    User->>Page: Visit application
    Page->>HKCard: Render HongKongMapCard
    HKCard->>Provider: Initialize GoogleMapsProvider
    Provider->>GMAPI: Load Google Maps API with key
    
    alt API Loading Failed
        GMAPI-->>Provider: Return error
        Provider-->>HKCard: Display error message
    else API Loaded Successfully
        GMAPI-->>Provider: API loaded
        Provider->>HKMap: Render HongKongMap component
        HKMap->>GMAPI: Initialize map with Hong Kong center
        GMAPI-->>HKMap: Return map instance
        HKMap->>GMAPI: Add markers (Causeway Bay & Central)
        HKMap->>User: Display interactive map
        
        User->>HKMap: Click "Show Route" button
        HKMap->>GMAPI: Request directions (DirectionsService)
        GMAPI-->>HKMap: Return route data
        HKMap->>GMAPI: Render directions (DirectionsRenderer)
        HKMap->>User: Display route on map
    end
```

## API Key Flow

```mermaid
flowchart TD
    A[".env.local file"] -->|NEXT_PUBLIC_GOOGLE_MAPS_API_KEY| B["GoogleMapsProvider"]
    B -->|Pass key to useJsApiLoader| C["Google Maps API"]
    C -->|Return loaded API| D["HongKongMap Component"]
    D -->|Use Google Maps services| E["Interactive Map with Navigation"]
```

## Component Hierarchy

```mermaid
flowchart TD
    A["Main Page"] --> B["HongKongMapCard"]
    A --> C["Other MapCards"]
    B --> D["GoogleMapsProvider"]
    D --> E["HongKongMap"]
    E --> F["GoogleMap"]
    E --> G["Markers"]
    E --> H["DirectionsService"]
    E --> I["DirectionsRenderer"]
```

## User Interaction Flow

```mermaid
stateDiagram-v2
    [*] --> ViewMap: User loads the page
    ViewMap --> ShowingRoute: User clicks "Show Route"
    ShowingRoute --> ViewMap: User clicks "Hide Route"
    ViewMap --> [*]: User leaves the page
``` 