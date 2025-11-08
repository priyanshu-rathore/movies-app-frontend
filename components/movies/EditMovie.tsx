"use client";

import React, { useEffect, useState } from "react";
import DropPickImage from "./DropPickImage";
import Button from "../base-comp/Button";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../base-comp/Spinner";

const EditMovie = () => {
  const router = useRouter();
  const params = useParams();
  const movieId = params.id as string;

  const [title, setTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [posterUrl, setPosterUrl] = useState<string | undefined>(undefined);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:4000/movies/${movieId}`
        );
        setTitle(data.title);
        setPublishingYear(data.publishingYear?.toString() ?? "");
        setPosterUrl(data.poster);
      } catch (error: any) {
        toast.error("Failed to fetch movie.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  const onFileSelected = (file: File) => {
    setPosterFile(file);
    setPosterUrl(URL.createObjectURL(file)); // for preview purposes only
  };

  const handleCancel = () => router.push("/");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("publishingYear", publishingYear);
      if (posterFile) formData.append("poster", posterFile);

      await axios.patch(
        `http://localhost:4000/movies/${movieId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Movie updated!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Spinner />
    );
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen px-2 py-4 sm:px-8 sm:py-8 overflow-y-auto">
      <div className="flex flex-col justify-center w-full max-w-5xl p-4 sm:p-12">
        <h1 className="text-h3 md:text-h2 font-normal text-white mb-6 sm:mb-10">Edit</h1>
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 w-full">
          {/* Left: Drop Image */}
          <div className="w-full sm:w-auto flex justify-center items-center mb-8 sm:mb-0">
            <DropPickImage onFileSelected={onFileSelected} imageUrl={posterUrl} />
          </div>
          {/* Right: Form */}
          <form
            className="flex flex-col gap-4 sm:ml-20 sm:gap-6 justify-center w-full sm:w-[340px] pt-4 sm:pt-6"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <input
              type="text"
              value={title}
              placeholder="Title"
              className="rounded-md px-4 py-3 bg-[#294B55] placeholder:text-[#BFC9CB] text-white outline-none w-full"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              value={publishingYear}
              placeholder="Publishing year"
              className="rounded-md px-4 py-3 bg-[#294B55] placeholder:text-[#BFC9CB] text-white outline-none w-full"
              onChange={(e) => setPublishingYear(e.target.value)}
            />
            <div className="flex gap-4 mt-4 w-full justify-between">
              <Button
                variant="secondary"
                type="button"
                onClick={handleCancel}
                disabled={updating}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={updating}>
                {updating ? "Saving..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMovie;
