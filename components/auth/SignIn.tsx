"use client";

import Link from "next/link";
import Input from "@/components/base-comp/Input";
import Button from "@/components/base-comp/Button";
import CheckBox from "@/components/base-comp/CheckBox";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import { useAuth } from "@/context/AuthContext";
import { apiUrl } from "@/constants";

interface SignInFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const SignIn = () => {
  const { setIsAuthenticated } = useAuth();

  const formik = useFormik<SignInFormValues>({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(`${apiUrl}/auth/login`, {
          email: values.email,
          password: values.password,
        });

        const accessToken = data.access_token;
        const userId = data.user_id;

        // Save securely only if remember me is checked, otherwise session storage
        if (values.remember) {
          secureLocalStorage.setItem("user_id", userId);
          secureLocalStorage.setItem("accessToken", accessToken);
        } else {
          sessionStorage.setItem("user_id", userId);
          sessionStorage.setItem("accessToken", accessToken);
        }

        setIsAuthenticated(true);

        toast.success("Login successful!");
      } catch (error: any) {
        console.error("Login failed:", error);
        toast.error(error.response?.data?.message || "Login failed");
      }
    },
  });

  return (
    <div className="relative w-screen h-screen p-4 flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col gap-5 w-full max-w-sm z-10">
        <h1 className="text-white text-h1 text-center">Sign in</h1>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <Input
            placeholder="Email"
            variant="default"
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

          <div className="flex justify-center">
            <CheckBox
              label="Remember me"
              checked={formik.values.remember}
              onChange={(e) =>
                formik.setFieldValue("remember", e.target.checked)
              }
            />
          </div>

          <Button type="submit" className="w-full py-4 text-2xl">
            Login
          </Button>

          <p className="text-center text-white/80 text-sm mt-2">
            Don’t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
