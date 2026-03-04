import { useAuth } from "@/context/AuthProvider";
import { LayoutDashboard } from "lucide-react";

function Dashboard() {
  const { authUser } = useAuth();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <LayoutDashboard className="h-5 w-5 text-primary" />
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <p className="text-sm text-muted-foreground">
        Welcome Admin <span className="font-semibold">{authUser?.fullname || "Admin"}</span> 👋
      </p>
    </div>
  );
}

export default Dashboard;