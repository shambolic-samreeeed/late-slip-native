"use client";

import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import React from "react";

const page = () => {
  // const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email Is Invalid.")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, setStatus }: any
  ) => {
    try {
      const response = await axios.post("api/login", values);
      if (response.status === 200) {
        // router.push("/dashboard");
      }
    } catch (error: any) {
      setStatus(error?.response?.data?.message || "Login Failed");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <div>
        <h3>Herald Sync Admin Login</h3>

        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
          {({isSubmitting, status})=>(
            <Form>
              
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default page;
