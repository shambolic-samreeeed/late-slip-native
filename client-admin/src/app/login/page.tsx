"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { login } from "../services/authService";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleLogin = async (
    values: any,
    { setSubmitting, setStatus }: any
  ) => {
    try {
      const data = await login(values);
      localStorage.setItem("token", data.token);

      toast.success(" Logged in successfully!", {
        position: "top-right",
        autoClose: 2500,
      });

      router.push("/dashboard");
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";

      toast.error(`Login failed: ${message}`, {
        position: "top-right",
        autoClose: 3000,
      });

      setStatus("Login failed. Check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-4xl font-semibold mb-4 text-center text-[#74BF43]">
          Herald Sync Admin
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            isSubmitting,
            errors,
            touched,
            status,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status && (
                <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
                  {status}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {touched.email && errors.email && (
                  <div className="text-sm text-red-500 mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {touched.password && errors.password && (
                  <div className="text-sm text-red-500 mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#74BF43] text-white py-2 rounded hover:bg-[#5fa933] transition"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
