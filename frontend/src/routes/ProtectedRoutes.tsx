import { Navigate, Outlet } from "react-router";
import { authClient } from "../lib/auth-client";
import { Loader2 } from "lucide-react";

const ProtectedRoutes = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-6 h-6 text-sky-600 animate-spin" />
          <span className="text-sm text-gray-500">
            Checking authentication...
          </span>
        </div>
      </div>
    );
  }

  return data ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
