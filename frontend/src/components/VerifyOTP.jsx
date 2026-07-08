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

import { Loader2 } from "lucide-react";

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
  console.log("VerifyOtp mounted");
  console.log(sessionStorage.getItem("verifyEmail"));

  const { control, handleSubmit } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  //   const onSubmit = async (data) => {
  //     try {
  //       setLoading(true);

  //       const res = await api.post("/api/user/verify-otp", {
  //         email,
  //         otp: data.otp,
  //       });

  //       toast.success(res.data.message || "Email verified successfully");

  //       navigate("/login", { replace: true });
  //     } catch (error) {
  //       toast.error(error.response?.data?.message || "Invalid OTP");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

//   const onSubmit = async (data) => {
//     try {
//       setLoading(true);

//       const res = await api.post("/api/user/verify-otp", {
//         email,
//         otp: data.otp,
//       });

//       toast.success(res.data.message);

//       sessionStorage.removeItem("verifyEmail");

//       navigate("/login", { replace: true });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

const onSubmit = async (data) => {
  try {
    setLoading(true);

    const res = await api.post("/api/user/verify-otp", {
      email,
      otp: data.otp,
    });

    // Save token
    localStorage.setItem("token", res.data.token);

    // Save user
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // Update auth context
    setAuthUser(res.data.user);

    // Remove temporary email
    sessionStorage.removeItem("verifyEmail");

    toast.success(res.data.message);

    // Redirect to home
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
    <div className="flex h-screen items-center justify-center dark:bg-slate-900 p-6">
      <Card className="w-full max-w-md">
        {/* <CardHeader>
          <CardTitle>Verify Email</CardTitle>

          <CardDescription>
            Enter the 6-digit OTP sent to
            <br />
            <span className="font-semibold">{email}</span>
          </CardDescription>
        </CardHeader> */}

        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Verify Your Email
          </CardTitle>

          <CardDescription className="text-sm text-muted-foreground">
            We've sent a{" "}
            <span className="font-semibold">6-digit verification code</span> to
          </CardDescription>

          <div className="disabled text-sm text-muted-foreground font-semibold">
            {email}
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center">
              <Controller
                name="otp"
                control={control}
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field }) => (
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}>
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

            <div className="text-center text-sm">Didn't receive the OTP?</div>

            <Button
              variant="outline"
              className="w-full"
              type="button"
              disabled={resendLoading}
              onClick={handleResendOtp}>
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
  );
}

export default VerifyOtp;
