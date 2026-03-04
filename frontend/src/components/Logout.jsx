import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      setAuthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem("user");
      toast.success("Logout successfully");
      setTimeout(() => {
        window.location.reload();
        navigate("/");
      },2000);
    } catch (error) {
      toast.error(error.message);
      setTimeout(()=>{},2300)
    }
  };
  return (
    <div>
      <button
        className="px-3 py-2 bg-red-600 text-white rounded-md cursor-pointer"
        onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
