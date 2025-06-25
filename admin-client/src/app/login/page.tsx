"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "../services/page";

const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await adminLogin(email, password);

      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#74C044]">
            Herald Sync{" "}
            <span className="font-light text-xl font-serif">Admin</span>
          </h1>
        </div>

        {error && (
          <p className="text-red-600 mb-4 text-center font-semibold">{error}</p>
        )}

        <div className="flex flex-col space-y-6 mb-8">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#74C044]"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#74C044]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#74C044] text-white py-3 rounded-md text-lg font-semibold hover:bg-[#5e9c35] transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default page;
