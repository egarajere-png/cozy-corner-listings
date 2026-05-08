import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, Search } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PropertyRow {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  cover_image: string | null;
  is_featured: boolean;
  is_available: boolean;
  created_at: string;
}

const AdminProperties = () => {
  const [items, setItems] = useState<PropertyRow[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("properties")
      .select("id, title, location, price, type, cover_image, is_featured, is_available, created_at")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this property? This cannot be undone.")) return;
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Property deleted");
    load();
  };

  const toggleFlag = async (id: string, field: "is_featured" | "is_available", value: boolean) => {
    const { error } = await supabase.from("properties").update({ [field]: value }).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  const filtered = items.filter(
    (i) =>
      i.title.toLowerCase().includes(q.toLowerCase()) ||
      i.location.toLowerCase().includes(q.toLowerCase()) ||
      i.type.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <AdminLayout title="Properties">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search properties..."
            className="w-full bg-eerie-2 border border-white/10 pl-10 pr-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
          />
        </div>
        <Link
          to="/admin/properties/new"
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-primary/90 transition-all"
        >
          <Plus className="w-4 h-4" />
          New Property
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground text-sm">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-eerie-2 border border-white/10">
          <p className="text-muted-foreground mb-4">No properties yet.</p>
          <Link
            to="/admin/properties/new"
            className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-widest hover:underline"
          >
            <Plus className="w-4 h-4" />
            Add your first property
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-eerie-2 border border-white/10 hover:border-primary/30 transition-all flex flex-col md:flex-row gap-4 p-4"
            >
              <div className="w-full md:w-32 h-32 md:h-24 bg-eerie-3 flex-shrink-0 overflow-hidden">
                {p.cover_image ? (
                  <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                    No image
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase tracking-wider bg-white/5 text-muted-foreground px-2 py-0.5">
                    {p.type}
                  </span>
                  {p.is_featured && (
                    <span className="text-[10px] uppercase tracking-wider bg-primary/20 text-primary px-2 py-0.5">
                      Featured
                    </span>
                  )}
                  {!p.is_available && (
                    <span className="text-[10px] uppercase tracking-wider bg-destructive/20 text-destructive px-2 py-0.5">
                      Unavailable
                    </span>
                  )}
                </div>
                <h3 className="font-forum text-lg text-foreground truncate">{p.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{p.location}</p>
                <p className="text-sm text-primary mt-1">{p.price}</p>
              </div>

              <div className="flex items-center gap-2 md:flex-col md:justify-center">
                <button
                  onClick={() => toggleFlag(p.id, "is_featured", !p.is_featured)}
                  title="Toggle featured"
                  className="p-2 border border-white/10 hover:border-primary hover:text-primary transition-all"
                >
                  <Star className={`w-4 h-4 ${p.is_featured ? "fill-primary text-primary" : ""}`} />
                </button>
                <button
                  onClick={() => toggleFlag(p.id, "is_available", !p.is_available)}
                  title="Toggle availability"
                  className="p-2 border border-white/10 hover:border-primary hover:text-primary transition-all"
                >
                  {p.is_available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <Link
                  to={`/admin/properties/${p.id}`}
                  title="Edit"
                  className="p-2 border border-white/10 hover:border-primary hover:text-primary transition-all"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  title="Delete"
                  className="p-2 border border-white/10 hover:border-destructive hover:text-destructive transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProperties;
