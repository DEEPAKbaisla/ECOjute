import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import api from "../api/axios";
import GoogleSignIn from "./GoogleSignIn";
import { useNavigate } from "react-router-dom";
import { Loader2, Leaf, Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
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
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <a href="/" className="garamond text-3xl font-bold text-foreground inline-flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              EcoJute
            </a>
            <p className="text-sm text-muted-foreground mt-2">Welcome back</p>
          </div>

          <Card>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl">Login to your account</CardTitle>
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

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    disabled={loading}
                    className="pr-10"
                    {...register("password", { required: true })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      Password is required
                    </p>
                  )}
                </div>

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
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors">
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

                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-card px-2 text-muted-foreground">or continue with</span>
                  </div>
                </div>

                <GoogleSignIn />

                <p className="text-center text-xs text-muted-foreground mt-4">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="font-semibold text-foreground hover:text-primary transition-colors">
                    Sign up
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
