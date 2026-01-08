import { MapPin } from 'lucide-react';

interface PropertyMapProps {
  location: string;
}

export const PropertyMap = ({ location }: PropertyMapProps) => {
  return (
    <div className="aspect-video bg-eerie-2 border border-white/10 flex items-center justify-center p-6">
      <div className="text-center space-y-4">
        <MapPin className="w-12 h-12 mx-auto text-primary" />
        <p className="text-muted-foreground">
          Interactive map coming soon
        </p>
        <p className="text-sm text-muted-foreground">
          {location}, Kenya
        </p>
      </div>
    </div>
  );
};
