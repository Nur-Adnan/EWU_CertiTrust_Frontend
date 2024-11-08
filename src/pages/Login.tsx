"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { magic } from "./../utils/Magic.js";
import {
  LoginWithEmailOTPEventOnReceived,
  LoginWithEmailOTPEventEmit,
} from "magic-sdk";
import api from "./../api.js";
import { useNavigate } from "react-router-dom";

export default function Component() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [handler, setHandler] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    try {
      const stdExists = await api.get("/users/is-exist-role", {
        params: { email },
      });

      if (!stdExists) {
        setLoginError("User does not exist.");
        setLoading(false);
      } else {
        const handle = magic.auth.loginWithEmailOTP({
          email,
          showUI: false,
        });

        handle.on(LoginWithEmailOTPEventOnReceived.EmailOTPSent, () => {
          setIsOtpSent(true);
          setLoading(false);
          setHandler(handle);
        });

        handle.on(LoginWithEmailOTPEventOnReceived.InvalidEmailOtp, () => {
          setLoginError("Invalid OTP. Please try again.");
          setLoading(false);
        });

        handle.on("error", (error) => {
          setLoginError(error.message || "An error occurred during login.");
          setLoading(false);
        });
      }
    } catch (error) {
      setLoginError("User does not exist." || error.message);
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    try {
      handler?.emit(LoginWithEmailOTPEventEmit.VerifyEmailOtp, otp);

      handler?.on("done", (result) => {
        const didToken = result;
        navigate("/dashboard");
        setLoading(false);
      });

      handler?.on(LoginWithEmailOTPEventOnReceived.InvalidEmailOtp, () => {
        setLoginError("Invalid OTP. Please try again.");
        setLoading(false);
      });

      handler?.on("error", (error) => {
        setLoginError(error.message || "An error occurred during login.");
        setLoading(false);
      });
    } catch (error) {
      setLoginError("Error verifying OTP.");
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center mt-60">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">
            {isOtpSent ? "Verify OTP" : "Login"}
          </CardTitle>
          <CardDescription className="text-center pt-2">
            {isOtpSent
              ? "Enter the OTP sent to your email."
              : "Enter your email to receive an OTP."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={isOtpSent ? handleOtpSubmit : handleSubmit}
            className="space-y-6"
          >
            {!isOtpSent ? (
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm font-medium">
                  OTP
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter the OTP"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            )}
            <Button
              type="submit"
              className="w-full text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : isOtpSent
                ? "Verify OTP"
                : "Send OTP"}
            </Button>
            {loginError && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {loginError}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
