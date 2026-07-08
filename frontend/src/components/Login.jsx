import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import api from "../api/axios";
import GoogleSignIn from "./GoogleSignIn";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useAuth } from "@/context/AuthProvider";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await api.post("/api/user/login", {
        email: data.email,
        password: data.password,
      });

      toast.success("Login Successfully 🎉");

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      setAuthUser(res.data.user);
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Enter your email below to login</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  disabled={loading}
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  disabled={loading}
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    Password is required
                  </p>
                )}
              </div>

              {/* <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </button>
              </div> */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/forgot-password", {
                      state: {
                        email: watch("email"),
                      },
                    })
                  }
                  className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </button>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              <div className="mt-4">
                <GoogleSignIn />
              </div>

              <div className="text-center text-sm mt-4">
                Don’t have an account?{" "}
                <Link to="/signup" className="underline text-blue-600">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
