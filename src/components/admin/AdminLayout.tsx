import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Building2, MessageSquare, LogOut, Home } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/properties", label: "Properties", icon: Building2 },
  { to: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
];

export const AdminLayout = ({ children, title }: { children: ReactNode; title?: string }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/auth", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/10 bg-eerie-1 fixed inset-y-0 left-0">
        <div className="px-6 py-6 border-b border-white/10">
          <NavLink to="/admin" className="block">
            <h1 className="font-forum text-2xl text-primary leading-none">Lakashe</h1>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
              Admin Panel
            </p>
          </NavLink>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 text-sm uppercase tracking-wider transition-all",
                  "hover:bg-white/5 hover:text-primary",
                  isActive
                    ? "bg-primary/10 text-primary border-l-2 border-primary"
                    : "text-muted-foreground border-l-2 border-transparent"
                )
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10 space-y-1">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-sm uppercase tracking-wider text-muted-foreground hover:bg-white/5 hover:text-primary transition-all"
          >
            <Home className="w-4 h-4" />
            View Site
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm uppercase tracking-wider text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-40 bg-eerie-1 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <NavLink to="/admin" className="font-forum text-xl text-primary">
          Lakashe Admin
        </NavLink>
        <button onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-eerie-1 border-t border-white/10 grid grid-cols-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 py-3 text-[10px] uppercase tracking-wider",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Main */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 pb-20 lg:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="px-4 md:px-8 py-6 md:py-10 max-w-7xl mx-auto"
        >
          {title && (
            <div className="mb-8">
              <h1 className="font-forum text-3xl md:text-4xl text-foreground">{title}</h1>
              <div className="h-px w-16 bg-primary mt-3" />
            </div>
          )}
          {children}
        </motion.div>
      </main>
    </div>
  );
};
