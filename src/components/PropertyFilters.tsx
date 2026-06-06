import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useProperties } from "@/lib/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const parsePrice = (price: string): number => {
  const n = Number(String(price).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

export const PropertyFiltersGrid = () => {
  const { properties, loading } = useProperties();

  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("all");
  const [location, setLocation] = useState<string>("all");
  const [beds, setBeds] = useState<string>("any");
  const [baths, setBaths] = useState<string>("any");
  const [amenity, setAmenity] = useState<string>("all");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const priceBounds = useMemo(() => {
    const prices = properties.map((p) => parsePrice(p.price)).filter((n) => n > 0);
    if (prices.length === 0) return [0, 1_000_000_000] as [number, number];
    return [Math.min(...prices), Math.max(...prices)] as [number, number];
  }, [properties]);

  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const effectivePrice = priceRange ?? priceBounds;

  const types = useMemo(
    () => Array.from(new Set(properties.map((p) => p.type).filter(Boolean))).sort(),
    [properties],
  );
  const locations = useMemo(
    () => Array.from(new Set(properties.map((p) => p.location).filter(Boolean))).sort(),
    [properties],
  );
  const amenities = useMemo(
    () =>
      Array.from(
        new Set(
          properties.flatMap((p) => (p.amenities ?? []).map((a) => a.label).filter(Boolean)),
        ),
      ).sort(),
    [properties],
  );

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (query) {
        const q = query.toLowerCase();
        const hay = `${p.title} ${p.location} ${p.type}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (type !== "all" && p.type !== type) return false;
      if (location !== "all" && p.location !== location) return false;
      if (beds !== "any" && p.bedrooms < Number(beds)) return false;
      if (baths !== "any" && p.bathrooms < Number(baths)) return false;
      if (amenity !== "all") {
        const has = (p.amenities ?? []).some((a) => a.label === amenity);
        if (!has) return false;
      }
      const price = parsePrice(p.price);
      if (price > 0 && (price < effectivePrice[0] || price > effectivePrice[1])) return false;
      return true;
    });
  }, [properties, query, type, location, beds, baths, amenity, effectivePrice]);

  const resetFilters = () => {
    setQuery("");
    setType("all");
    setLocation("all");
    setBeds("any");
    setBaths("any");
    setAmenity("all");
    setPriceRange(null);
  };

  const activeCount =
    (query ? 1 : 0) +
    (type !== "all" ? 1 : 0) +
    (location !== "all" ? 1 : 0) +
    (beds !== "any" ? 1 : 0) +
    (baths !== "any" ? 1 : 0) +
    (amenity !== "all" ? 1 : 0) +
    (priceRange ? 1 : 0);

  const formatKES = (n: number) => `KES ${n.toLocaleString("en-US")}`;

  return (
    <div>
      {/* Filter Bar */}
      <div className="bg-smoky-1/60 border border-white/10 backdrop-blur-sm p-6 lg:p-8 mb-12">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, location or type..."
              className="pl-11 h-12 bg-background/40 border-white/10 focus-visible:ring-primary text-foreground"
            />
          </div>

          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="h-12 lg:w-48 bg-background/40 border-white/10">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {types.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="h-12 lg:w-52 bg-background/40 border-white/10">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAdvanced((s) => !s)}
            className="h-12 border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-widest text-xs"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters {activeCount > 0 && `(${activeCount})`}
          </Button>
        </div>

        {showAdvanced && (
          <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-primary mb-2 block">
                Bedrooms
              </label>
              <Select value={beds} onValueChange={setBeds}>
                <SelectTrigger className="bg-background/40 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}+ Beds
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-primary mb-2 block">
                Bathrooms
              </label>
              <Select value={baths} onValueChange={setBaths}>
                <SelectTrigger className="bg-background/40 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}+ Baths
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-primary mb-2 block">
                Amenity
              </label>
              <Select value={amenity} onValueChange={setAmenity}>
                <SelectTrigger className="bg-background/40 border-white/10">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  {amenities.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2 lg:col-span-1">
              <label className="text-xs uppercase tracking-widest text-primary mb-2 block">
                Price Range
              </label>
              <Slider
                min={priceBounds[0]}
                max={priceBounds[1]}
                step={Math.max(1, Math.round((priceBounds[1] - priceBounds[0]) / 100))}
                value={effectivePrice}
                onValueChange={(v) => setPriceRange([v[0], v[1]] as [number, number])}
                className="mt-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{formatKES(effectivePrice[0])}</span>
                <span>{formatKES(effectivePrice[1])}</span>
              </div>
            </div>
          </div>
        )}

        {activeCount > 0 && (
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              <X className="w-3 h-3" /> Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-center text-muted-foreground py-12">Loading properties…</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">No properties match your filters.</p>
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
            Showing {filtered.length} {filtered.length === 1 ? "property" : "properties"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
