import { useState } from "react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsLoading(false);
          toast.success("Logged out successfully");
        },
        onError: () => {
          setIsLoading(false);
          toast.error("Failed to logout, please try again.");
        },
      },
    });
  };
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold">Note-taking App</h2>
          </div>
          <Button size="sm" onClick={handleLogout} disabled={isLoading}>
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
