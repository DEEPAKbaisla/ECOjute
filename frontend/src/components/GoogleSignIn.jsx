import { useRef, useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const GoogleSignIn = () => {
  const { authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [width, setWidth] = useState(300);

  useEffect(() => {
    if (containerRef.current) {
      const w = containerRef.current.offsetWidth;
      if (w > 0) setWidth(Math.min(w, 400));
    }
  }, []);

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/google-login`,
        {
          token: credentialResponse.credential,
        },
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setAuthUser(res.data.user);
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
        theme="outline"
        size="large"
        text="continue_with"
        shape="rectangular"
        width={width}
      />
    </div>
  );
};

export default GoogleSignIn;
