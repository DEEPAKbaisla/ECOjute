import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Package, ShoppingCart, TrendingUp, Users, Leaf } from "lucide-react";

function AdminDashboard() {
  const stats = [
    { label: "Total Products", value: 25, icon: Package, change: "+3 this month" },
    { label: "Total Orders", value: 14, icon: ShoppingCart, change: "+5 this month" },
    { label: "Total Revenue", value: "₹12,450", icon: TrendingUp, change: "+18% vs last month" },
    { label: "Total Users", value: 8, icon: Users, change: "+2 this month" },
  ];

  const recentOrders = [
    { id: "ORD001", user: "Rahul", total: "₹1,200", status: "Delivered" },
    { id: "ORD002", user: "Aman", total: "₹900", status: "Pending" },
    { id: "ORD003", user: "Riya", total: "₹1,500", status: "Shipped" },
  ];

  const statusColor = (status) => {
    switch (status) {
      case "Delivered": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300";
      case "Shipped": return "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300";
      default: return "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Leaf className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-serif font-bold text-foreground">Dashboard Overview</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:-translate-y-0.5 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="pb-5">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-[11px] text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider">
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs uppercase tracking-wider">Order ID</TableHead>
                <TableHead className="text-xs uppercase tracking-wider">User</TableHead>
                <TableHead className="text-xs uppercase tracking-wider">Total</TableHead>
                <TableHead className="text-xs uppercase tracking-wider">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="text-sm font-medium">{order.id}</TableCell>
                  <TableCell className="text-sm">{order.user}</TableCell>
                  <TableCell className="text-sm">{order.total}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
