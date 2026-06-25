// import { useForm } from "react-hook-form";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// function AddBag() {
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       await axios.post("/api/bags", data);
//       toast.success("Bag added successfully");
//       navigate("/admin/manage-bags");
//     } catch (err) {
//       toast.error("Error adding bag");
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Add New Bag</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
//         <Input placeholder="Bag Name" {...register("name")} />
//         <Input placeholder="Price" {...register("price")} />
//         <Input placeholder="Image URL" {...register("image")} />

//         <Button type="submit" className="w-full">
//           Add Bag
//         </Button>
//       </form>
//     </div>
//   );
// }

// export default AddBag;

import { useState } from "react";
import { toast } from "react-hot-toast";
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
    category: "",
    stock: true,
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

    if (
      !data.name ||
      !data.price ||
      data.images.length === 0 ||
      !data.category
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    // try {
    //   const formData = new FormData();
    //   // Append scalar fields
    //   formData.append("name", data.name);
    //   formData.append("description", data.description);
    //   formData.append("price", data.price);
    //   formData.append("category", data.category);
    //   formData.append("stock", data.stock);

    //   // Append images with field name "images" to match backend
    //   data.images.forEach((file) => {
    //     formData.append("images", file);
    //   });

    //   const res = await api.post("/api/bags", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });

    //   if (res.data.success) {
    //     toast.success("Bag uploaded successfully!");
    //     navigate("/admin/manage-bags");
    //   } else {
    //     toast.error(res.data.message || "Something went wrong!");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Upload failed");
    // }

    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "images") {
          // Append each file individually under the 'images' field
          Array.from(value).forEach((file) => {
            formData.append("images", file);
          });
        } else {
          formData.append(key, value);
        }
      });

      const res = await api.post("/api/bags", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Bag uploaded successfully!");
        setData({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: true,
          images: [],
        });
        setPreviews([]);
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

            {/* Price & Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label>In stock</Label>
                <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm">
                  <input
                    id="stock"
                    type="checkbox"
                    name="stock"
                    disabled={loading}
                    checked={data.stock}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor="stock"
                    className="select-none text-sm text-foreground">
                    Available for purchase
                  </label>
                </div>
              </div>
            </div>

            {/* Category */}
            {/* <div className="space-y-2">
              <Label>Category</Label>
              <Input
                type="text"
                name="category"
                value={data.category}
                onChange={handleChange}
                placeholder="Travel, Laptop, School..."
              />
            </div> */}
            
            <div className="space-y-2">
              <label className="block font-medium mb-1">Category *</label>

              <select
                name="category"
                disabled={loading}
                value={data.category}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-white dark:bg-gray-700"
                required>
                <option value="">Select Category</option>
                <option value="bags">Bags</option>
                <option value="accessories">Accessories</option>
                <option value="home">Home</option>
              </select>
            </div>

            {/* Image */}
            <div className="space-y-2">
              <Label>Upload Images *</Label>
              <Input
                type="file"
                name="images"
                disabled={loading}
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />

              {previews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2">
                  {previews.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="h-28 w-28 rounded-md border object-cover bg-gray-50 shadow-sm"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading Bag...
                </>
              ) : (
                "Upload Bag"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBag;
