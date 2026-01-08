import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PropertyMapProps {
  location: string;
}

// Location coordinates for properties
const locationCoordinates: Record<string, [number, number]> = {
  "Karen, Nairobi": [-1.3189, 36.7126],
  "Kahawa Sukari, Nairobi": [-1.1833, 36.9333],
  "Westlands, Nairobi": [-1.2673, 36.8112],
  "Kilimani, Nairobi": [-1.2890, 36.7856],
  "Lavington, Nairobi": [-1.2774, 36.7696],
  "Runda, Nairobi": [-1.2167, 36.8167],
};

export const PropertyMap = ({ location }: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Get coordinates based on location - default to Karen if not found
  const getCoordinates = (): [number, number] => {
    for (const [key, coords] of Object.entries(locationCoordinates)) {
      if (location.toLowerCase().includes(key.toLowerCase().split(',')[0].toLowerCase())) {
        return coords;
      }
    }
    // Default to Karen, Nairobi
    return locationCoordinates["Karen, Nairobi"];
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      const coordinates = getCoordinates();
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [coordinates[1], coordinates[0]], // [lng, lat]
        zoom: 14,
        pitch: 45,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add marker
      new mapboxgl.Marker({ color: '#C6A961' })
        .setLngLat([coordinates[1], coordinates[0]])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div style="color: #000; padding: 8px;">
              <strong>${location}</strong><br/>
              <span style="color: #666;">Lakashe Homes Property</span>
            </div>`
          )
        )
        .addTo(map.current);

      map.current.on('load', () => {
        setIsMapLoaded(true);
        setShowTokenInput(false);
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      setShowTokenInput(true);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      initializeMap();
    }
  };

  if (showTokenInput && !isMapLoaded) {
    return (
      <div className="aspect-video bg-eerie-2 border border-white/10 flex items-center justify-center p-6">
        <div className="text-center max-w-md w-full space-y-4">
          <MapPin className="w-12 h-12 mx-auto text-primary" />
          <p className="text-muted-foreground text-sm">
            Enter your Mapbox public token to view the interactive map.
            <br />
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Get your free token at mapbox.com
            </a>
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="pk.your_mapbox_token..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="bg-eerie-1 border-white/10"
            />
            <Button onClick={handleTokenSubmit} className="shrink-0">
              Load Map
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {location}, Kenya
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video border border-white/10 overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};
