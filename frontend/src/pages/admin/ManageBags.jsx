import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function ManageBags() {
  const [bags, setBags] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBags = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/bags");
      if (res.data.success) {
        setBags(res.data.data || []);
      } else {
        toast.error(res.data.message || "Failed to load bags");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load bags");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBags();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/api/bags/${id}`);
      if (res.data.success) {
        toast.success("Bag deleted successfully");
        fetchBags();
      } else {
        toast.error(res.data.message || "Delete failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  const handleToggleStock = async (id, currentStock) => {
    try {
      const res = await api.patch(`/api/bags/${id}/status`, {
        stock: !currentStock,
      });
      if (res.data.success) {
        toast.success("Stock status updated");
        fetchBags();
      } else {
        toast.error(res.data.message || "Stock update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Stock update failed");
    }
  };

  return (
    <div className="mx-auto max-w-full p-4">
      <div className="mb-4 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <h2 className="text-xl font-semibold">Manage Bags</h2>
        <Button asChild size="sm">
          <Link to="/admin/add-bag">+ Add New Bag</Link>
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading bags...</p>
      ) : bags.length === 0 ? (
        <p className="text-muted-foreground">No bags found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bags.map((bag) => (
            <Card
              key={bag._id}
              className="flex flex-col justify-between border p-4"
            >
              <CardContent className="flex flex-col gap-3 p-0">
                <div className="flex items-center gap-3">
                  {bag.images?.[0] && (
                    <img
                      src={bag.images[0]}
                      alt={bag.name}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-medium">{bag.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ₹{bag.price}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {bag.category || "Uncategorized"}
                    </p>
                  </div>
                </div>

                <span
                  className={`inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-semibold ${
                    bag.stock
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
                      : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200"
                  }`}
                >
                  {bag.stock ? "In stock" : "Out of stock"}
                </span>
              </CardContent>

              <CardFooter className="mt-3 flex flex-wrap items-center justify-end gap-2 p-0 pt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleStock(bag._id, bag.stock)}
                >
                  {bag.stock ? "Set Out of stock" : "Set In stock"}
                </Button>

                <Button size="sm" asChild>
                  <Link to={`/admin/edit-bag/${bag._id}`}>Edit</Link>
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(bag._id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageBags;