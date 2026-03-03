import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

function EditBag() {
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBag = async () => {
      const res = await axios.get(`/api/bags/${id}`);
      setValue("name", res.data.name);
      setValue("price", res.data.price);
      setValue("image", res.data.image);
    };
    fetchBag();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`/api/bags/${id}`, data);
      toast.success("Updated successfully");
      navigate("/admin/manage-bags");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit Bag</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <Input placeholder="Bag Name" {...register("name")} />
        <Input placeholder="Price" {...register("price")} />
        <Input placeholder="Image URL" {...register("image")} />

        <Button type="submit" className="w-full">
          Update Bag
        </Button>
      </form>
    </div>
  );
}

export default EditBag;