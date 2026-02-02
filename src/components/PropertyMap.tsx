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
          Find our Offices here
        </p>
        <p className="text-sm text-muted-foreground">
          {location}, Kenya
        </p>
        <a
                    href="https://www.google.com/maps/place/Felma+Shopping+centre/@-1.195364,36.9435365,17z/data=!3m1!4b1!4m6!3m5!1s0x182f3f8ef1b25b0f:0x8fbe763cbcbdc94d!8m2!3d-1.195364!4d36.9461114!16s%2Fg%2F11fy_9j7yj?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 text-primary hover:underline"
                  >
                    Open in Google Maps →
                  </a>
      </div>
    </div>
  );
};
