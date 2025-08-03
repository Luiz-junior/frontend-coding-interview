"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { login } from "../lib/auth";
import axios from "axios";

interface SignInFormProps {
  setError: (error: string | null) => void;
  setUser: (user: any | null) => void;
}

export default function SigInForm({ setError, setUser }: SignInFormProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      const result = response.data;

      if (result.success) {
        const user = { email };
        login(email);
        setUser(user);
        setError(null);
        redirect("/photos");
      } else {
        setError(result.error || "Inválid Credentials");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.error || error.message || "Erro na autenticação";
      setError(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-bold">
          Username
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="mt-1 block w-full p-2 border rounded-md border-[#9CA3AF] h-[44px]"
          required
        />
      </div>
      <div>
        <div className="flex justify-between">
          <label htmlFor="password" className="block text-sm font-bold">
            Password
          </label>

          <Link href="#" className="block text-sm font-normal text-blue-600">
            Forgot password?
          </Link>
        </div>

        <input
          type="password"
          name="password"
          id="password"
          className="mt-1 block w-full p-2 border rounded-md border-[#9CA3AF] h-[44px]"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full h-[44px] mt-2 font-bold bg-[#0075EB] text-white p-2 rounded-lg hover:bg-blue-700"
      >
        Sign in
      </button>
    </form>
  );
}
