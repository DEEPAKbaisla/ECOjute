import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import GoogleSignIn from "../GoogleSignIn";
import api from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Loader2, Leaf } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { Eye, EyeOff } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await api.post("/api/user/send-otp", {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
      });

      toast.success(res.data.message);
      sessionStorage.setItem("verifyEmail", data.email);
      navigate("/verify-otp", {
        state: { email: data.email },
      });
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
            <p className="text-sm text-muted-foreground mt-2">Join the movement</p>
          </div>

          <Card>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl">Create your account</CardTitle>
              <CardDescription>Enter your details to get started</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    disabled={loading}
                    {...register("fullname", { required: true })}
                  />
                  {errors.fullname && (
                    <p className="text-red-500 text-sm mt-1">Full name is required</p>
                  )}
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    disabled={loading}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    disabled={loading}
                    className="pr-10"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/,
                        message: "Password must be strong",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create My Account"
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
                  Already have an account?{" "}
                  <Link to="/login" className="font-semibold text-foreground hover:text-primary transition-colors">
                    Login
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

export default Signup;
