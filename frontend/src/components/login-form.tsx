import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

import { FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);

  const onSocial = (provider: "google") => {
    setLoading(true);
    authClient.signIn.social(
      {
        provider,
        callbackURL: `${import.meta.env.VITE_FRONTEND_URL}`,
      },
      {
        onSuccess: () => {
          setLoading(false);
          toast.success("Logged in successfully");
        },
        onError: () => {
          setLoading(false);
          toast.error("Failed to login");
        },
      }
    );
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  variant="secondary"
                  className="w-full cursor-pointer"
                  onClick={() => {
                    onSocial("google");
                  }}
                  disabled={loading}
                >
                  <FaGoogle className="size-4" />
                  Login with Google
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
