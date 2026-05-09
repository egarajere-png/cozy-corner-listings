import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface PropertyAmenity {
  icon: string;
  label: string;
}

export interface PropertyDetail {
  id: string;
  title: string;
  location: string;
  locationDescription: string;
  price: string;
  type: string;
  image: string;
  gallery: string[];
  bedrooms: number;
  bathrooms: number;
  area: string;
  overview: string[];
  features: string[];
  amenities: PropertyAmenity[];
  featured: boolean;
  available: boolean;
  agentName?: string;
  agentPhone?: string;
  agentEmail?: string;
}

const formatPrice = (price: string | null | undefined): string => {
  if (!price) return "";
  // If it looks like a plain number, format it as KES
  if (/^\d+(\.\d+)?$/.test(price.trim())) {
    const n = Number(price);
    return `KES ${n.toLocaleString("en-US")}`;
  }
  return price;
};

export const mapRow = (row: any): PropertyDetail => ({
  id: row.id,
  title: row.title,
  location: row.location ?? "",
  locationDescription: row.location_description ?? "",
  price: formatPrice(row.price),
  type: row.type,
  image: row.cover_image ?? (Array.isArray(row.gallery) && row.gallery[0]) ?? "",
  gallery: Array.isArray(row.gallery) ? row.gallery : [],
  bedrooms: row.bedrooms ?? 0,
  bathrooms: row.bathrooms ?? 0,
  area: row.area ?? "",
  overview: Array.isArray(row.overview) ? row.overview : [],
  features: Array.isArray(row.features) ? row.features : [],
  amenities: Array.isArray(row.amenities) ? row.amenities : [],
  featured: !!row.is_featured,
  available: row.is_available !== false,
  agentName: row.agent_name ?? undefined,
  agentPhone: row.agent_phone ?? undefined,
  agentEmail: row.agent_email ?? undefined,
});

export const useProperties = () => {
  const [data, setData] = useState<PropertyDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchAll = async () => {
      const { data: rows, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });
      if (!active) return;
      if (!error && rows) setData(rows.map(mapRow));
      setLoading(false);
    };
    fetchAll();

    const channel = supabase
      .channel("properties-public")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "properties" },
        () => fetchAll(),
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return { properties: data, loading };
};

export const useProperty = (id: string | undefined) => {
  const [data, setData] = useState<PropertyDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    let active = true;
    const fetchOne = async () => {
      const { data: row, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (!active) return;
      if (!error && row) setData(mapRow(row));
      else setData(null);
      setLoading(false);
    };
    fetchOne();
  }, [id]);

  return { property: data, loading };
};
