"use client";

import { redirect } from "next/navigation";
import { useCallback, useEffect } from "react";
import SignInForm from "../components/SignInForm";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

export default function LoginPage() {
  const { user, error, setError, setUser } = useAuth();

  const showToast = useCallback(() => {
    if (error) {
      toast.error("Invalid credentials", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      redirect("/photos");
    }

    showToast();
    setError("");
  }, [user, showToast]);

  return (
    <div className="min-h-screen flex justify-center lg:items-center">
      <div className="rounded-lg w-full max-w-[320px] pt-10 lg:pt-0">
        <img
          src="/logo.svg"
          alt="Clever Logo"
          className="mx-auto mb-6 w-[75px]"
        />
        <h1
          className="text-2xl font-bold mb-10 text-center"
          style={{ fontSize: "24px" }}
        >
          Sign in to your account
        </h1>

        <SignInForm setError={setError} setUser={setUser} />
        <ToastContainer />
      </div>
    </div>
  );
}
