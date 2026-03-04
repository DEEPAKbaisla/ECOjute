import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { toast } from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const EditBag = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    price: "",
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchBag = async () => {
      try {
        const res = await api.get(`/api/bags/${id}`);
        const bag = res.data.bag;
        setData({
          name: bag?.name || "",
          price: bag?.price || "",
        });
        setPreview(bag?.images?.[0] || null);
      } catch (err) {
        toast.error("Failed to load bag");
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
    if (!data.name || !data.price) {
      toast.error("Please fill all required fields!");
      return;
    }
    try {
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
    }
  };

  return (
    <div className="mx-auto max-w-full p-4 mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Bag</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="space-y-2">
              <Label>Bag Name *</Label>
              <Input
                type="text"
                name="name"
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
                value={data.price}
                onChange={handleChange}
                placeholder="Enter price"
              />
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
            <Button type="submit" className="w-full md:w-auto">
              Update Bag
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBag;