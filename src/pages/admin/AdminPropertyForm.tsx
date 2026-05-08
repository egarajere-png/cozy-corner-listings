import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, Upload, X, ArrowLeft, Star } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const PROPERTY_TYPES = ["Mansionette", "Penthouse", "Apartment", "Villa", "House", "Plot", "Land", "Commercial"];
const AMENITY_ICONS = ["Car", "Wifi", "Shield", "TreePine", "Building2", "Utensils", "Waves", "Dumbbell", "Info"];

interface Amenity { icon: string; label: string }

const schema = z.object({
  title: z.string().trim().min(2).max(200),
  location: z.string().trim().min(2).max(200),
  price: z.string().trim().min(1).max(60),
  type: z.string().trim().min(1).max(50),
});

const AdminPropertyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [price, setPrice] = useState("");
  const [priceNumeric, setPriceNumeric] = useState<string>("");
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [area, setArea] = useState("");
  const [type, setType] = useState(PROPERTY_TYPES[0]);
  const [overview, setOverview] = useState(""); // newline-separated paragraphs
  const [features, setFeatures] = useState(""); // newline-separated
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<string>("");
  const [agentName, setAgentName] = useState("");
  const [agentPhone, setAgentPhone] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      const { data, error } = await supabase.from("properties").select("*").eq("id", id).maybeSingle();
      if (error || !data) {
        toast.error("Property not found");
        navigate("/admin/properties");
        return;
      }
      setTitle(data.title);
      setLocation(data.location);
      setLocationDescription(data.location_description ?? "");
      setPrice(data.price);
      setPriceNumeric(data.price_numeric?.toString() ?? "");
      setBedrooms(data.bedrooms);
      setBathrooms(data.bathrooms);
      setArea(data.area ?? "");
      setType(data.type);
      setOverview((data.overview as string[] | null)?.join("\n\n") ?? "");
      setFeatures((data.features as string[] | null)?.join("\n") ?? "");
      setAmenities((data.amenities as unknown as Amenity[] | null) ?? []);
      setGallery((data.gallery as string[] | null) ?? []);
      setCoverImage(data.cover_image ?? "");
      setAgentName(data.agent_name ?? "");
      setAgentPhone(data.agent_phone ?? "");
      setAgentEmail(data.agent_email ?? "");
      setIsAvailable(data.is_available);
      setIsFeatured(data.is_featured);
      setLoading(false);
    })();
  }, [id, isEdit, navigate]);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from("property-images").upload(path, file);
        if (error) throw error;
        const { data: pub } = supabase.storage.from("property-images").getPublicUrl(path);
        uploaded.push(pub.publicUrl);
      }
      const next = [...gallery, ...uploaded];
      setGallery(next);
      if (!coverImage && uploaded[0]) setCoverImage(uploaded[0]);
      toast.success(`${uploaded.length} image(s) uploaded`);
    } catch (err: any) {
      toast.error(err.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (url: string) => {
    setGallery(gallery.filter((g) => g !== url));
    if (coverImage === url) setCoverImage(gallery.find((g) => g !== url) ?? "");
  };

  const addAmenity = () => setAmenities([...amenities, { icon: "Info", label: "" }]);
  const updateAmenity = (i: number, patch: Partial<Amenity>) =>
    setAmenities(amenities.map((a, idx) => (idx === i ? { ...a, ...patch } : a)));
  const removeAmenity = (i: number) => setAmenities(amenities.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ title, location, price, type });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSaving(true);
    const payload = {
      title: title.trim(),
      location: location.trim(),
      location_description: locationDescription.trim() || null,
      price: price.trim(),
      price_numeric: priceNumeric ? Number(priceNumeric) : null,
      bedrooms,
      bathrooms,
      area: area.trim() || null,
      type,
      cover_image: coverImage || null,
      gallery,
      overview: overview.split("\n\n").map((s) => s.trim()).filter(Boolean),
      features: features.split("\n").map((s) => s.trim()).filter(Boolean),
      amenities: amenities.filter((a) => a.label.trim()),
      agent_name: agentName.trim() || null,
      agent_phone: agentPhone.trim() || null,
      agent_email: agentEmail.trim() || null,
      is_available: isAvailable,
      is_featured: isFeatured,
    };

    const { error } = isEdit
      ? await supabase.from("properties").update(payload as any).eq("id", id!)
      : await supabase.from("properties").insert(payload as any);

    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(isEdit ? "Property updated" : "Property created");
    navigate("/admin/properties");
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  const inputCls =
    "w-full bg-transparent border border-white/10 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors";
  const labelCls = "block text-xs uppercase tracking-wider text-muted-foreground mb-2";

  return (
    <AdminLayout title={isEdit ? "Edit Property" : "New Property"}>
      <button
        onClick={() => navigate("/admin/properties")}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to properties
      </button>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic */}
        <section className="bg-eerie-2 border border-white/10 p-6 space-y-5">
          <h2 className="font-forum text-xl text-foreground">Basic Info</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className={labelCls}>Title *</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Type *</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className={inputCls}>
                {PROPERTY_TYPES.map((t) => <option key={t} value={t} className="bg-eerie-2">{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Price (display) *</label>
              <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="KES 54,000,000" className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Price (numeric, for sorting)</label>
              <input type="number" value={priceNumeric} onChange={(e) => setPriceNumeric(e.target.value)} placeholder="54000000" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Area</label>
              <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="8,500 sq ft" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Bedrooms</label>
              <input type="number" min={0} value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Bathrooms</label>
              <input type="number" min={0} value={bathrooms} onChange={(e) => setBathrooms(Number(e.target.value))} className={inputCls} />
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="bg-eerie-2 border border-white/10 p-6 space-y-5">
          <h2 className="font-forum text-xl text-foreground">Location</h2>
          <div>
            <label className={labelCls}>Location *</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Karen, Nairobi" className={inputCls} required />
          </div>
          <div>
            <label className={labelCls}>Location Description</label>
            <textarea
              value={locationDescription}
              onChange={(e) => setLocationDescription(e.target.value)}
              rows={3}
              className={inputCls}
            />
          </div>
        </section>

        {/* Images */}
        <section className="bg-eerie-2 border border-white/10 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-forum text-xl text-foreground">Gallery</h2>
            <label className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs uppercase tracking-widest font-bold cursor-pointer hover:bg-primary/90 transition-all">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              Upload
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                disabled={uploading}
                onChange={(e) => handleUpload(e.target.files)}
              />
            </label>
          </div>
          {gallery.length === 0 ? (
            <p className="text-sm text-muted-foreground">No images uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {gallery.map((url) => (
                <div key={url} className="relative group aspect-square bg-eerie-3 overflow-hidden">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCoverImage(url)}
                      title="Set as cover"
                      className={`p-2 border ${coverImage === url ? "bg-primary text-primary-foreground border-primary" : "border-white/30 text-white hover:border-primary"}`}
                    >
                      <Star className={`w-4 h-4 ${coverImage === url ? "fill-current" : ""}`} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(url)}
                      className="p-2 border border-white/30 text-white hover:border-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {coverImage === url && (
                    <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-[9px] uppercase tracking-wider px-1.5 py-0.5">
                      Cover
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Overview */}
        <section className="bg-eerie-2 border border-white/10 p-6 space-y-5">
          <h2 className="font-forum text-xl text-foreground">Overview</h2>
          <div>
            <label className={labelCls}>Paragraphs (separate with blank line)</label>
            <textarea value={overview} onChange={(e) => setOverview(e.target.value)} rows={6} className={inputCls} />
          </div>
        </section>

        {/* Features */}
        <section className="bg-eerie-2 border border-white/10 p-6 space-y-5">
          <h2 className="font-forum text-xl text-foreground">Key Features</h2>
          <div>
            <label className={labelCls}>One feature per line</label>
            <textarea value={features} onChange={(e) => setFeatures(e.target.value)} rows={6} className={inputCls} />
          </div>
        </section>

        {/* Amenities */}
        <section className="bg-eerie-2 border border-white/10 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-forum text-xl text-foreground">Amenities</h2>
            <button
              type="button"
              onClick={addAmenity}
              className="text-xs uppercase tracking-widest text-primary hover:underline"
            >
              + Add amenity
            </button>
          </div>
          {amenities.length === 0 ? (
            <p className="text-sm text-muted-foreground">No amenities yet.</p>
          ) : (
            <div className="space-y-3">
              {amenities.map((a, i) => (
                <div key={i} className="grid grid-cols-[140px_1fr_auto] gap-3">
                  <select value={a.icon} onChange={(e) => updateAmenity(i, { icon: e.target.value })} className={inputCls}>
                    {AMENITY_ICONS.map((ic) => <option key={ic} value={ic} className="bg-eerie-2">{ic}</option>)}
                  </select>
                  <input
                    value={a.label}
                    onChange={(e) => updateAmenity(i, { label: e.target.value })}
                    placeholder="e.g. 4 Parking Spaces"
                    className={inputCls}
                  />
                  <button
                    type="button"
                    onClick={() => removeAmenity(i)}
                    className="p-2 border border-white/10 hover:border-destructive hover:text-destructive transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Agent */}
        <section className="bg-eerie-2 border border-white/10 p-6 space-y-5">
          <h2 className="font-forum text-xl text-foreground">Agent (optional)</h2>
          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <label className={labelCls}>Name</label>
              <input value={agentName} onChange={(e) => setAgentName(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input value={agentPhone} onChange={(e) => setAgentPhone(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <input type="email" value={agentEmail} onChange={(e) => setAgentEmail(e.target.value)} className={inputCls} />
            </div>
          </div>
        </section>

        {/* Status */}
        <section className="bg-eerie-2 border border-white/10 p-6 flex flex-wrap gap-6">
          <label className="inline-flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} className="accent-primary w-4 h-4" />
            <span className="text-sm text-foreground">Available (visible on site)</span>
          </label>
          <label className="inline-flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="accent-primary w-4 h-4" />
            <span className="text-sm text-foreground">Featured on homepage</span>
          </label>
        </section>

        <div className="flex gap-3 sticky bottom-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 sm:flex-none bg-primary text-primary-foreground px-8 py-4 text-xs uppercase tracking-widest font-bold hover:bg-primary/90 transition-all disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {isEdit ? "Save Changes" : "Create Property"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/properties")}
            className="px-8 py-4 text-xs uppercase tracking-widest font-bold border border-white/10 text-muted-foreground hover:border-white/30 hover:text-foreground transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AdminPropertyForm;
