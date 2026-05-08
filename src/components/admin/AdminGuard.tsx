import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAdminAuth } from "@/lib/admin/useAdminAuth";
import { Loader2 } from "lucide-react";

export const AdminGuard = ({ children }: { children: ReactNode }) => {
  const { session, isAdmin, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/auth" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="font-forum text-3xl text-primary">Access Denied</h1>
          <p className="text-muted-foreground">
            You are signed in but your account does not have admin privileges. Contact the site
            owner to request access.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
