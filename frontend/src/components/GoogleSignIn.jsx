
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const GoogleSignIn = () => {
  const { authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/google-login",
        {
          token: credentialResponse.credential,
        }
      );

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Update context state
      setAuthUser(res.data.user);

      console.log("Login successful");

      // Redirect
      navigate("/");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Failed")}
    />
  );
};

export default GoogleSignIn;