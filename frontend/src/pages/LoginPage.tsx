import { LoginForm } from "@/components/login-form";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router";

const LoginPage = () => {
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

  return data ? (
    <Navigate to="/" replace />
  ) : (
    <div className="flex items-center justify-center min-h-screen w-full">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
