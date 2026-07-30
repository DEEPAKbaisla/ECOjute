import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthProvider";

import api from "@/api/axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Loader2, Leaf, Mail } from "lucide-react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthUser } = useAuth();

  const email = location.state?.email || "";
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await api.post("/api/user/verify-otp", {
        email,
        otp: data.otp,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setAuthUser(res.data.user);
      sessionStorage.removeItem("verifyEmail");
      toast.success(res.data.message);
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      const res = await api.post("/api/user/resend-otp", {
        email: sessionStorage.getItem("verifyEmail"),
      });
      toast.success(res.data.message || "OTP sent successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  useEffect(() => {
    if (!email) {
      navigate("/signup", { replace: true });
    }
  }, [email, navigate]);

  if (!email) return null;

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
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Verify Your Email</CardTitle>
            <CardDescription>
              We&apos;ve sent a{" "}
              <span className="font-semibold text-foreground">6-digit code</span> to
            </CardDescription>
            <p className="text-sm font-semibold text-foreground">{email}</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex justify-center">
                <Controller
                  name="otp"
                  control={control}
                  rules={{ required: true, minLength: 6 }}
                  render={({ field }) => (
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  )}
                />
              </div>

              <Button className="w-full" disabled={loading} type="submit">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Didn&apos;t receive the OTP?
              </div>

              <Button
                variant="outline"
                className="w-full"
                type="button"
                disabled={resendLoading}
                onClick={handleResendOtp}
              >
                {resendLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Resend OTP"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default VerifyOtp;
