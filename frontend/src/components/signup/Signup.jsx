import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
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
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";

function Signup() {
  // const [redirect, setRedirect] = useState(false);
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await api.post("/api/user/signup", {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      // setRedirect(true);
      setAuthUser(res.data.user);
      toast.success("Signup successfully 🎉");
      Navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="flex h-screen items-center justify-center dark:bg-slate-900 p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
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
                  <p className="text-red-500 text-sm mt-1">
                    Full name is required
                  </p>
                )}
              </div>

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
              <GoogleSignIn />

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline text-blue-600">
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Signup;
