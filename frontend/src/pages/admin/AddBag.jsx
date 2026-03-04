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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const AddBag = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: true,
    images: [],
  });

  const [preview, setPreview] = useState(null);

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
    setPreview(files[0] ? URL.createObjectURL(files[0]) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.price || data.images.length === 0) {
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
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await api.post("/api/bags/add-bag",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Bag uploaded successfully!");
        setData({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          image: "",
        });
        setPreview(null);
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Upload failed..");
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
                  checked={data.stock}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <label
                  htmlFor="stock"
                  className="select-none text-sm text-foreground"
                >
                  Available for purchase
                </label>
              </div>
            </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                type="text"
                name="category"
                value={data.category}
                onChange={handleChange}
                placeholder="Travel, Laptop, School..."
              />
            </div>

            {/* Image */}
            <div className="space-y-2">
              <Label>Upload Images *</Label>
              <Input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-md mt-3 border"
                />
              )}
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full">
              Upload Bag
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBag;