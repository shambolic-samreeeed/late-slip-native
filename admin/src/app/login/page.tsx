"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FiMail } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
import { useState } from "react";
import authService from "@/services/authService"; // ✅ using your existing service

const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(4).required("Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await authService.adminLoginService(
        values.email,
        values.password
      );

      if (res.success && res.token) {
        localStorage.setItem("token", res.token);
        toast.success("Login successful!");
        router.replace("/");
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Toaster position="top-right" />

      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-[#74C044]">
          Herald Sync{" "}
          <span className="text-lg font-light text-gray-700">Admin</span>
        </h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
        >
          {() => (
            <Form className="space-y-5">
              {/* Email */}
              <div>
                <div className="flex items-center border rounded-md border-gray-300 px-3 py-2">
                  <FiMail className="text-gray-500 mr-2" />
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full outline-none"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center border rounded-md border-gray-300 px-3 py-2">
                  <IoLockClosedOutline className="text-gray-500 mr-2" />
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full outline-none"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-md py-2 font-semibold text-white transition ${
                  loading ? "bg-gray-400" : "bg-[#74C044] hover:bg-[#64a73a]"
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
