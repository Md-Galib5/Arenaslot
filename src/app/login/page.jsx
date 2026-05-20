"use client";

import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        toast.error(error.message || "Login failed ❌");
        return;
      }

      toast.success("Login successful 🎉");
      router.push("/");
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong ❌");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({ provider: "google" });
      toast.success("Google login successful 🎉");
      setTimeout(() => router.push("/"), 800);
    } catch {
      toast.error("Google login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-100 px-6 py-16">

      <Card className="
        w-full max-w-md
        rounded-3xl
        border-2 border-emerald-200
        shadow-2xl
        bg-white/90 backdrop-blur-md
        px-10 py-12
      ">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 mt-3">
            Login to manage your sports facilities
          </p>
        </div>

        {/* FORM */}
        <Form className="flex flex-col gap-6 w-full" onSubmit={onSubmit}>

          {/* EMAIL */}
          <TextField isRequired name="email" type="email" className="w-full">
            <Label>Email Address</Label>

            <Input
              placeholder="you@example.com"
              className="w-full h-12 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition"
            />

            <FieldError />
          </TextField>

          {/* PASSWORD */}
          <TextField
            isRequired
            name="password"
            type="password"
            className="w-full"
            validate={(value) => {
              if (value.length < 6) {
                return "At least 6 characters required";
              }
              if (!/[A-Z]/.test(value)) {
                return "Must include at least 1 uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Must include at least 1 lowercase letter";
              }
              return null;
            }}
          >
            <Label>Password</Label>

            <Input
              placeholder="••••••••"
              className="w-full h-12 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition"
            />

            <Description className="text-xs text-gray-400 mt-2">
              At least 6 characters, 1 uppercase & 1 lowercase letter required
            </Description>

            <FieldError />
          </TextField>

          {/* BUTTONS */}
          <div className="flex flex-col gap-4 mt-4 w-full">

            <Button
              type="submit"
              disabled={loading}
              className="
                w-full h-12
                bg-gradient-to-r from-emerald-500 to-green-600
                text-white font-semibold
                rounded-xl
                shadow-lg shadow-emerald-200
                hover:scale-[1.02]
                transition
              "
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <Button
              type="reset"
              variant="bordered"
              className="w-full h-12 border border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50"
            >
              Reset
            </Button>

          </div>
        </Form>

        {/* DIVIDER */}
        <div className="flex items-center my-8 w-full">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-4 text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* GOOGLE */}
        <button
          onClick={handleGoogleSignIn}
          className="
            w-full h-12
            flex items-center justify-center gap-3
            border border-emerald-200
            rounded-xl
            bg-white hover:bg-emerald-50
            transition shadow-sm font-medium
          "
        >
          <FaGoogle className="text-red-500" />
          Continue with Google
        </button>

      </Card>
    </div>
  );
}