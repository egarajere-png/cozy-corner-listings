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
          Find Me here
        </p>
        <p className="text-sm text-muted-foreground">
          {location}, Kenya
        </p>
        <a
                    href="https://www.google.com/maps/place/Baraka+Court,+5th+Avenue,+Kiu+River+Road/@-1.1994711,36.9505306,17z/data=!4m15!1m8!3m7!1s0x182f3f8a58405c1b:0xb3c5f23125ae29be!2sKiu+River+Rd!3b1!8m2!3d-1.1978943!4d36.9507774!16s%2Fg%2F12vrml3dc!3m5!1s0x182f3f0043c8f5c9:0x61b54779848cf5a9!8m2!3d-1.199932!4d36.9508305!16s%2Fg%2F11w8qssw_3?entry=ttu&g_ep=EgoyMDI2MDEyMC4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D"
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
