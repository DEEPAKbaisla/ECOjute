import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const AddBag = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    mrp: "",
    category: "",
    stock: 1,
    material: "Organic Jute",
    weight: "",
    dimensionsWidth: "",
    dimensionsHeight: "",
    dimensionsDepth: "",
    images: [],
  });

  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setData({ ...data, images: files });
    const objectUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.price || data.images.length === 0 || !data.category) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("mrp", data.mrp || data.price);
      formData.append("category", data.category);
      formData.append("stock", data.stock);
      formData.append("material", data.material);
      formData.append("weight", data.weight);
      formData.append("dimensions", JSON.stringify({
        width: data.dimensionsWidth,
        height: data.dimensionsHeight,
        depth: data.dimensionsDepth,
      }));
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });

      const res = await api.post("/api/bags", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success("Bag uploaded successfully!");
        navigate("/admin/manage-bags");
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Upload failed..");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-full p-4">
      <Card className="mt-4 md:mt-6">
        <CardHeader>
          <CardTitle>Add New Bag</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="space-y-2">
              <Label>Bag Name *</Label>
              <Input type="text" name="name" disabled={loading} value={data.name} onChange={handleChange} placeholder="Enter bag name" />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea name="description" disabled={loading} value={data.description} onChange={handleChange} placeholder="Enter description" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Price (Selling) *</Label>
                <Input type="number" name="price" disabled={loading} value={data.price} onChange={handleChange} placeholder="Selling price" />
              </div>
              <div className="space-y-2">
                <Label>MRP (Original)</Label>
                <Input type="number" name="mrp" disabled={loading} value={data.mrp} onChange={handleChange} placeholder="Original price" />
              </div>
              <div className="space-y-2">
                <Label>Stock *</Label>
                <select name="stock" disabled={loading} value={data.stock} onChange={(e) => setData({ ...data, stock: Number(e.target.value) })} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-background" required>
                  <option value={1}>In Stock</option>
                  <option value={0}>Out of Stock</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <select name="category" disabled={loading} value={data.category} onChange={handleChange} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-background" required>
                  <option value="">Select Category</option>
                  <option value="bags">Bags</option>
                  <option value="accessories">Accessories</option>
                  <option value="home">Home</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Material</Label>
                <Input type="text" name="material" disabled={loading} value={data.material} onChange={handleChange} placeholder="e.g. Organic Jute" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Weight</Label>
                <Input type="text" name="weight" disabled={loading} value={data.weight} onChange={handleChange} placeholder="e.g. 420 g" />
              </div>
              <div className="space-y-2">
                <Label>Width</Label>
                <Input type="text" name="dimensionsWidth" disabled={loading} value={data.dimensionsWidth} onChange={handleChange} placeholder='e.g. 18.5"' />
              </div>
              <div className="space-y-2">
                <Label>Height</Label>
                <Input type="text" name="dimensionsHeight" disabled={loading} value={data.dimensionsHeight} onChange={handleChange} placeholder='e.g. 14.2"' />
              </div>
              <div className="space-y-2">
                <Label>Depth</Label>
                <Input type="text" name="dimensionsDepth" disabled={loading} value={data.dimensionsDepth} onChange={handleChange} placeholder='e.g. 6.7"' />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Upload Images *</Label>
              <Input type="file" name="images" disabled={loading} accept="image/*" multiple onChange={handleImageChange} />
              {previews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2">
                  {previews.map((src, index) => (
                    <img key={index} src={src} alt={`Preview ${index + 1}`} className="h-28 w-28 rounded-md border object-cover bg-gray-50 shadow-sm" />
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading Bag...</>
              ) : "Upload Bag"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBag;
