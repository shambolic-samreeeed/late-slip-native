"use client";

import { useFormik } from "formik";
import React from "react";
import { loginValidation } from "../schemas/loginSchema";
import { login } from "../services/authService";

const Page = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: async (values) => {
      try {
        const result = await login(values);
        if (result.success) {
          console.log("Login success");
          window.location.href = "/lateSlips";
        } else {
          console.log("Error while logging in");
        }
      } catch (err: any) {
        console.error(err);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="border p-2"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-">{formik.errors.email}</div>
        )}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="border p-2"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500">{formik.errors.password}</div>
        )}
      </div>

      <button type="submit" className="bg-red text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
};

export default Page;
