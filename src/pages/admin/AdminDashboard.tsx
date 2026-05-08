import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, MessageSquare, Star, EyeOff, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  totalProperties: number;
  featured: number;
  unavailable: number;
  newInquiries: number;
  totalInquiries: number;
  byType: { type: string; count: number }[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const [{ data: props }, { data: inq }] = await Promise.all([
        supabase.from("properties").select("id, title, type, is_featured, is_available, created_at"),
        supabase.from("inquiries").select("id, name, subject, status, created_at").order("created_at", { ascending: false }).limit(5),
      ]);
      const properties = props ?? [];
      const inquiries = inq ?? [];
      const byTypeMap = new Map<string, number>();
      properties.forEach((p) => byTypeMap.set(p.type, (byTypeMap.get(p.type) ?? 0) + 1));

      setStats({
        totalProperties: properties.length,
        featured: properties.filter((p) => p.is_featured).length,
        unavailable: properties.filter((p) => !p.is_available).length,
        newInquiries: inquiries.filter((i) => i.status === "new").length,
        totalInquiries: inquiries.length,
        byType: Array.from(byTypeMap, ([type, count]) => ({ type, count })),
      });
      setRecent(inquiries);
    })();
  }, []);

  const cards = [
    { label: "Total Properties", value: stats?.totalProperties ?? "—", icon: Building2, link: "/admin/properties" },
    { label: "Featured", value: stats?.featured ?? "—", icon: Star, link: "/admin/properties" },
    { label: "Unavailable", value: stats?.unavailable ?? "—", icon: EyeOff, link: "/admin/properties" },
    { label: "New Inquiries", value: stats?.newInquiries ?? "—", icon: MessageSquare, link: "/admin/inquiries" },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Link
              to={c.link}
              className="group block bg-eerie-2 border border-white/10 p-5 hover:border-primary/40 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <c.icon className="w-5 h-5 text-primary" />
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="font-forum text-3xl text-foreground">{c.value}</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{c.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-eerie-2 border border-white/10 p-6">
          <h2 className="font-forum text-xl text-foreground mb-4">Properties by Type</h2>
          {stats && stats.byType.length > 0 ? (
            <div className="space-y-3">
              {stats.byType.map((t) => {
                const pct = stats.totalProperties ? (t.count / stats.totalProperties) * 100 : 0;
                return (
                  <div key={t.type}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">{t.type}</span>
                      <span className="text-muted-foreground">{t.count}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 overflow-hidden">
                      <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No properties yet.</p>
          )}
        </div>

        <div className="bg-eerie-2 border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-forum text-xl text-foreground">Recent Inquiries</h2>
            <Link to="/admin/inquiries" className="text-xs uppercase tracking-wider text-primary hover:underline">
              View all
            </Link>
          </div>
          {recent.length > 0 ? (
            <div className="space-y-3">
              {recent.map((r) => (
                <div key={r.id} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0">
                  <div>
                    <p className="text-sm text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.subject ?? "No subject"}</p>
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-1 ${
                      r.status === "new" ? "bg-primary/20 text-primary" : "bg-white/5 text-muted-foreground"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No inquiries yet.</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
