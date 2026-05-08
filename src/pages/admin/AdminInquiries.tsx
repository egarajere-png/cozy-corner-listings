import { useEffect, useState } from "react";
import { Mail, Phone, Trash2, Check } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
  property_id: string | null;
}

const AdminInquiries = () => {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<"all" | "new" | "read">("all");

  const load = async () => {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => {
    const { error } = await supabase.from("inquiries").update({ status: "read" }).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    const { error } = await supabase.from("inquiries").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  const filtered = items.filter((i) => filter === "all" || i.status === filter);

  return (
    <AdminLayout title="Inquiries">
      <div className="flex gap-2 mb-6">
        {(["all", "new", "read"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all ${
              filter === f
                ? "border-primary text-primary bg-primary/10"
                : "border-white/10 text-muted-foreground hover:border-white/30"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-eerie-2 border border-white/10 text-muted-foreground text-sm">
          No inquiries.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((i) => (
            <div key={i.id} className="bg-eerie-2 border border-white/10 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-forum text-lg text-foreground">{i.name}</h3>
                    <span
                      className={`text-[10px] uppercase tracking-wider px-2 py-0.5 ${
                        i.status === "new"
                          ? "bg-primary/20 text-primary"
                          : "bg-white/5 text-muted-foreground"
                      }`}
                    >
                      {i.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <a href={`mailto:${i.email}`} className="inline-flex items-center gap-1 hover:text-primary">
                      <Mail className="w-3 h-3" /> {i.email}
                    </a>
                    {i.phone && (
                      <a href={`tel:${i.phone}`} className="inline-flex items-center gap-1 hover:text-primary">
                        <Phone className="w-3 h-3" /> {i.phone}
                      </a>
                    )}
                    <span>{new Date(i.created_at).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {i.status === "new" && (
                    <button
                      onClick={() => markRead(i.id)}
                      className="p-2 border border-white/10 hover:border-primary hover:text-primary transition-all"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => remove(i.id)}
                    className="p-2 border border-white/10 hover:border-destructive hover:text-destructive transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {i.subject && <p className="text-sm text-primary mb-2">{i.subject}</p>}
              <p className="text-sm text-foreground whitespace-pre-wrap">{i.message}</p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminInquiries;
