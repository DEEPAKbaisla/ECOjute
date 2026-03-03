import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function ManageBags() {
  const [bags, setBags] = useState([]);

  const fetchBags = async () => {
    const res = await axios.get("/api/bags");
    setBags(res.data);
  };

  useEffect(() => {
    fetchBags();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/bags/${id}`);
      toast.success("Deleted successfully");
      fetchBags();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Bags</h2>

      <div className="space-y-4">
        {bags.map((bag) => (
          <div
            key={bag._id}
            className="flex justify-between items-center border p-4 rounded"
          >
            <div>
              <h3 className="font-medium">{bag.name}</h3>
              <p>${bag.price}</p>
            </div>

            <div className="flex gap-3">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageBags;