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
    stock: "",
    image: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.price || !data.image) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await api.post(
        "/api/bags/add-bag",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Bag uploaded successfully!");
        navigate("/admin/manage-bags");
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Upload failed");
    }
  };

  return (
    <div className="max-w-3xl mt-15 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Bag</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

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
            <div className="grid grid-cols-2 gap-4">
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
                <Label>Stock</Label>
                <Input
                  type="number"
                  name="stock"
                  value={data.stock}
                  onChange={handleChange}
                  placeholder="Available quantity"
                />
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
              <Label>Upload Image *</Label>
              <Input
                type="file"
                accept="image/*"
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