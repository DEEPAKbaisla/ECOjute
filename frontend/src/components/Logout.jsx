import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    try {
      setLoading(true);

      // Remove stored data
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Clear auth state
      setAuthUser(null);

      toast.success("Logout successfully");

      // Redirect to home
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <button
        className="px-3 py-2 bg-red-600 text-white rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleLogout}
        disabled={loading}>
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}

export default Logout;
