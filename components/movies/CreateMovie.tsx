"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DropPickImage from "./DropPickImage";
import Button from "../base-comp/Button";
import axios from "axios";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/constants";

interface CreateMovieFormValues {
  title: string;
  publishingYear: number;
  poster?: File | null;
}

// Utility: get from secureLocal or sessionStorage
const getSessionValue = (key: string) =>
  secureLocalStorage.getItem(key) || sessionStorage.getItem(key);

const CreateMovie = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  // Formik validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    publishingYear: Yup.number()
      .required("Publishing year is required")
      .min(1900, "Enter a valid year")
      .max(new Date().getFullYear(), "Year cannot be in the future"),
  });

  const formik = useFormik<CreateMovieFormValues>({
    initialValues: {
      title: "",
      publishingYear: new Date().getFullYear(),
      poster: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const token = getSessionValue("accessToken");
        const userId = getSessionValue("user_id");

        if (!userId) {
          toast.error("User ID is missing. Please login again.");
          return; // stop submission
        }

        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("publishingYear", values.publishingYear.toString());

        if (selectedFile) {
          formData.append("poster", selectedFile);
        }

        formData.append("user_id", String(userId));

        const response = await axios.post(`${apiUrl}/movies`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Movie created successfully!");
        formik.resetForm();
        setSelectedFile(null);
        console.log("Movie created:", response.data);
        router.push("/");
      } catch (err) {
        console.error(err);
        toast.error("Failed to create movie");
      }
    },
  });

  const onFileSelected = (file: File) => {
    setSelectedFile(file);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen px-2 py-4 sm:px-8 sm:py-12 overflow-y-auto">
      <div className="flex flex-col justify-center w-full max-w-5xl p-4 sm:p-12">
        <h1 className="md:text-h2 text-h3 font-normal text-white mb-6 sm:mb-10">
          Create a new movie
        </h1>
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 w-full">
          {/* Left: Drop Image */}
          <div className="w-full sm:w-auto flex justify-center items-center mb-8 sm:mb-0">
            <DropPickImage onFileSelected={onFileSelected} />
          </div>

          {/* Right: Form */}
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 sm:ml-20 sm:gap-6 justify-center w-full sm:w-[340px] pt-4 sm:pt-6"
            encType="multipart/form-data"
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="rounded-md px-4 py-3 bg-input placeholder:text-white text-white outline-none w-full"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 text-sm">{formik.errors.title}</div>
            )}

            <input
              type="number"
              name="publishingYear"
              placeholder="Publishing year"
              value={formik.values.publishingYear}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="rounded-md px-4 py-3 bg-input placeholder:text-white text-white outline-none w-full"
            />
            {formik.touched.publishingYear && formik.errors.publishingYear && (
              <div className="text-red-500 text-sm">
                {formik.errors.publishingYear}
              </div>
            )}

            <div className="flex gap-4 mt-4 w-full justify-between">
              <Button
                variant="secondary"
                type="button"
                onClick={() => {
                  formik.resetForm();
                  setSelectedFile(null);
                  router.push("/");
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMovie;
