"use client";

import Input from "@/components/base-comp/Input";
import Button from "@/components/base-comp/Button";
import CheckBox from "@/components/base-comp/CheckBox";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { apiUrl } from "@/constants";

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const Register = () => {
  const router = useRouter();

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
      terms: Yup.boolean()
        .oneOf([true], "You must accept the Terms & Conditions"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(`${apiUrl}/auth/register`, {
          email: values.email,
          password: values.password,
        });
        toast.success("Registration successful!");
        router.push("/"); // Navigate to login page
      } catch (error: any) {
        console.error(error);
        toast.error(error.response?.data?.message || "Registration failed");
      }
    },
  });

  return (
    <div className="relative min-h-screen w-screen bg-background flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-20 w-full max-w-sm px-6">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <h1 className="text-white text-4xl font-bold text-center">
            Register
          </h1>

          <Input
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}

          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}

          <Input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
          )}

          <div className="flex justify-center">
            <CheckBox
              label="I agree to the Terms & Conditions"
              checked={formik.values.terms}
              onChange={(e) => formik.setFieldValue("terms", e.target.checked)}
            />
          </div>
          {formik.touched.terms && formik.errors.terms && (
            <p className="text-red-500 text-sm text-center">{formik.errors.terms}</p>
          )}

          <Button
            type="submit"
            className="w-full py-4 text-2xl font-semibold"
          >
            Sign Up
          </Button>

          <p className="text-center text-white/70 text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-primary hover:underline font-medium cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
