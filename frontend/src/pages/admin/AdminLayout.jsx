import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <Navbar />

      {/* Sidebar */}
      <div className="w-64 border-r p-6 space-y-4 mt-16">
        <h2 className="text-xl font-bold">Admin Panel</h2>

        <Button asChild className="w-full justify-start">
          <Link to="/admin/dashboard">Dashboard</Link>
        </Button>

        <Button asChild className="w-full justify-start">
          <Link to="/admin/manage-bags">Manage Bags</Link>
        </Button>

        <Button asChild className="w-full justify-start">
          <Link to="/admin/add-bag">Add Bag</Link>
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
