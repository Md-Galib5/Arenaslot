"use client";

import { authClient } from "../../lib/auth-client";
import { FaGoogle } from "react-icons/fa";

import {
  Button,
  Card,
  Description,
  FieldError,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUpPage() {
  const router = useRouter();

  // REGISTER
  const onSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const toastId = toast.loading("Creating account...");

    try {
      const res = await authClient.signUp.email({
        name,
        email,
        password,
        image,
      });

      console.log("REGISTER RESPONSE:", res);

      if (res?.error) {
        toast.update(toastId, {
          render: res.error.message || "Registration failed ❌",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });

        return;
      }

      toast.update(toastId, {
        render: "Registration successful 🎉",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push("/login");
      }, 1500);

    } catch (err) {
      console.log("ERROR:", err);

      toast.update(toastId, {
        render: "Something went wrong ❌",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  // GOOGLE LOGIN
  const handleGoogleSignin = async () => {
    const toastId = toast.loading("Redirecting to Google...");

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      toast.update(toastId, {
        render: "Google sign-in successful 🎉",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

    } catch (error) {
      console.error(error);

      toast.update(toastId, {
        render: "Google sign-in failed ❌",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-100 px-6">

        <Card className="w-full max-w-md rounded-3xl border border-emerald-200 shadow-2xl bg-white/90 px-8 py-7">

          {/* HEADER */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">
              Create Account
            </h1>

            <p className="text-xs text-gray-500 mt-2">
              Register and continue
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4"
          >

            {/* NAME */}
            <TextField name="name" isRequired>
              <Label>Full Name</Label>

              <Input className="w-full h-11 rounded-xl border border-emerald-200" />

              <FieldError />
            </TextField>

            {/* IMAGE */}
            <TextField name="image" isRequired>
              <Label>Image URL</Label>

              <Input className="w-full h-11 rounded-xl border border-emerald-200" />

              <FieldError />
            </TextField>

            {/* EMAIL */}
            <TextField
              name="email"
              isRequired
              type="email"
            >
              <Label>Email</Label>

              <Input className="w-full h-11 rounded-xl border border-emerald-200" />

              <FieldError />
            </TextField>

            {/* PASSWORD */}
            <TextField
              name="password"
              isRequired
              type="password"
              validate={(value) => {
                if (value.length < 6) {
                  return "At least 6 characters required";
                }

                if (!/[A-Z]/.test(value)) {
                  return "Must include 1 uppercase letter";
                }

                if (!/[a-z]/.test(value)) {
                  return "Must include 1 lowercase letter";
                }

                return null;
              }}
            >
              <Label>Password</Label>

              <Input className="w-full h-11 rounded-xl border border-emerald-200" />

              <Description>
                At least 6 characters,
                1 uppercase & 1 lowercase
              </Description>

              <FieldError />
            </TextField>

            {/* REGISTER BUTTON */}
            <Button
              type="submit"
              className="w-full h-11 bg-emerald-600 text-white rounded-xl"
            >
              Register
            </Button>

          </form>

          {/* GOOGLE BUTTON */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleSignin}
              className="w-full h-11 border rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <FaGoogle className="text-red-500" />

              Continue with Google
            </button>
          </div>

        </Card>
      </div>

      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
      />
    </>
  );
}