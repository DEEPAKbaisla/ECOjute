import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { toast } from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, X } from "lucide-react";

const EditBag = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
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
          description: bag?.description || "",
          price: bag?.price || "",
          category: bag?.category || "",
        });
        setExistingImages(bag?.images || []);
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setNewImages((prev) => [...prev, ...files]);
  };

  const handleRemoveExisting = (index) => {
    setExistingImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleRemoveNew = (index) => {
    setNewImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.price || !data.category) {
      toast.error("Please fill all required fields!");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);

      formData.append("existingImages", JSON.stringify(existingImages));

      if (newImages.length > 0) {
        newImages.forEach((file) => {
          formData.append("images", file);
        });
      }

      const res = await api.put(`/api/bags/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
              {/* Name */}
              <div className="space-y-2">
                <Label>Bag Name *</Label>
                <Input
                  type="text"
                  name="name"
                  disabled={loading}
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Enter bag name"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  name="description"
                  disabled={loading}
                  value={data.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label>Price *</Label>
                <Input
                  type="number"
                  name="price"
                  disabled={loading}
                  value={data.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category *</Label>
                <select
                  name="category"
                  disabled={loading}
                  value={data.category}
                  onChange={handleChange}
                  className="w-full rounded-md border px-3 py-2 bg-background"
                  required>
                  <option value="">Select Category</option>
                  <option value="bags">Bags</option>
                  <option value="accessories">Accessories</option>
                  <option value="home">Home</option>
                </select>
              </div>

              {/* Image upload */}
              <div className="space-y-2">
                <Label>Add More Images</Label>
                <Input
                  type="file"
                  name="images"
                  disabled={loading}
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </div>

              {/* Previews and Image Manager Grid */}
              {(existingImages.length > 0 || newImages.length > 0) && (
                <div className="space-y-2">
                  <Label>Current Images & New Uploads</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2">
                    {/* Existing Images */}
                    {existingImages.map((src, index) => (
                      <div key={`existing-${index}`} className="relative border rounded-md overflow-hidden aspect-square h-28 w-28 bg-gray-50 shadow-sm">
                        <img
                          src={src}
                          alt={`Existing ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => handleRemoveExisting(index)}
                          className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-90 transition shadow cursor-pointer flex items-center justify-center h-5 w-5"
                          title="Remove existing image"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] px-1 rounded">Saved</span>
                      </div>
                    ))}

                    {/* New Images */}
                    {newImages.map((file, index) => {
                      const url = URL.createObjectURL(file);
                      return (
                        <div key={`new-${index}`} className="relative border rounded-md overflow-hidden aspect-square h-28 w-28 bg-gray-50 shadow-sm">
                          <img
                            src={url}
                            alt={`New ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            disabled={loading}
                            onClick={() => handleRemoveNew(index)}
                            className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-90 transition shadow cursor-pointer flex items-center justify-center h-5 w-5"
                            title="Remove selected image"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <span className="absolute bottom-1 left-1 bg-emerald-700 text-white text-[9px] px-1 rounded">New</span>
                        </div>
                      );
                    })}
                  </div>
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
