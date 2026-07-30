import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Leaf } from "lucide-react";

import api from "@/api/axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const res = await api.post("/api/user/forgot-password", {
        email: data.email,
      });

      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to send reset link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <a href="/" className="garamond text-3xl font-bold text-foreground inline-flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            EcoJute
          </a>
        </div>

        <Card>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl">Forgot Password</CardTitle>
            <CardDescription>
              Enter your registered email to receive a password reset link.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  disabled={loading}
                  {...register("email", {
                    required: "Email is required",
                  })}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <Button className="w-full" disabled={loading} type="submit">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  Back to Login
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ForgotPassword;
