import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { toast } from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const EditBag = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
  });
  const [preview, setPreview] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBag = async () => {
      try {
        setFetching(true);
        const res = await api.get(`/api/bags/${id}`);
        const bag = res.data.bag;
        setData({
          name: bag?.name || "",
          price: bag?.price || "",
          category: bag?.category || "",
        });
        setPreview(bag?.images?.[0] || null);
      } catch (err) {
        toast.error("Failed to load bag");
      } finally {
        setFetching(false);
      }
    };
    fetchBag();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.price || !data.category) {
      toast.error("Please fill all required fields!");
      return;
    }
    try {
      setLoading(true);
      const res = await api.put(`/api/bags/${id}`, data);
      if (res.data.success) {
        toast.success("Bag updated successfully!");
        navigate("/admin/manage-bags");
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-full p-4 mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Bag</CardTitle>
        </CardHeader>
        <CardContent>
          {fetching ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-green-700 mb-2" />
              <p className="text-sm text-muted-foreground">Loading bag details...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="space-y-2">
                <Label>Bag Name *</Label>
                <Input
                  type="text"
                  name="name"
                  disabled={loading}
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Enter bag name"
                />
              </div>
              <div className="space-y-2">
                <Label>Price *</Label>
                <Input
                  type="number"
                  name="price"
                  disabled={loading}
                  value={data.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                />
              </div>

              <div className="space-y-2">
                <Label>Category *</Label>

                <select
                  name="category"
                  disabled={loading}
                  value={data.category}
                  onChange={handleChange}
                  className="w-full rounded-md border px-3 py-2 bg-background">
                  <option value="">Select Category</option>
                  <option value="bags">Bags</option>
                  <option value="accessories">Accessories</option>
                  <option value="home">Home</option>
                </select>
              </div>

              {preview && (
                <div className="space-y-2">
                  <Label>Current Image</Label>
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-1 h-40 w-40 rounded-md border object-cover"
                  />
                </div>
              )}
              <Button type="submit" className="w-full md:w-auto" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating Bag...
                  </>
                ) : (
                  "Update Bag"
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBag;
