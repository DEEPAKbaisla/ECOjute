import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { LayoutDashboard, Menu, Package, PlusCircle } from "lucide-react";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen">
      <Navbar />

      {/* Mobile hamburger */}
      <Button
        variant="ghost"
        className="absolute left-3 top-20 z-20 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        size="icon"
        aria-label="Toggle admin menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "block" : "hidden"} md:block fixed inset-y-0 left-0 z-10 mt-16 w-64 border-r bg-background p-6 space-y-4`}
      >
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <Button asChild className="flex w-full items-center justify-start gap-2">
          <Link to="/admin/dashboard">
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </Button>
        <Button asChild className="flex w-full items-center justify-start gap-2">
          <Link to="/admin/manage-bags">
            <Package className="h-4 w-4" />
            <span>Manage Bags</span>
          </Link>
        </Button>
        <Button asChild className="flex w-full items-center justify-start gap-2">
          <Link to="/admin/add-bag">
            <PlusCircle className="h-4 w-4" />
            <span>Add Bag</span>
          </Link>
        </Button>
      </div>

      {/* Overlay for mobile when open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 px-4 pb-8 pt-24 md:ml-64 md:px-8 md:pb-10 md:pt-24">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
