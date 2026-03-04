import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { LayoutDashboard, Package, PlusCircle } from "lucide-react";


function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
    
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed inset-y-0 left-0 z-10 mt-16 w-64 border-r bg-background p-6 space-y-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>

        <Button
          asChild
          className="flex w-full items-center justify-start gap-2">
          <Link to="/admin/dashboard">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </Button>

        <Button
          asChild
          className="flex w-full items-center justify-start gap-2">
          <Link to="/admin/manage-bags">
            <Package className="h-4 w-4" />
            Manage Bags
          </Link>
        </Button>

        <Button
          asChild
          className="flex w-full items-center justify-start gap-2">
          <Link to="/admin/add-bag">
            <PlusCircle className="h-4 w-4" />
            Add Bag
          </Link>
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 pb-24 pt-24 md:ml-64 md:px-8 md:pb-10">
        <Outlet />
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t bg-background p-3 md:hidden">
        <Link
          to="/admin/dashboard"
          className="flex flex-col items-center text-sm">
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Link>

        <Link
          to="/admin/manage-bags"
          className="flex flex-col items-center text-sm">
          <Package className="h-5 w-5" />
          Bags
        </Link>

        <Link
          to="/admin/add-bag"
          className="flex flex-col items-center text-sm">
          <PlusCircle className="h-5 w-5" />
          Add
        </Link>
      </div>
    </div>
  );
}

export default AdminLayout;
