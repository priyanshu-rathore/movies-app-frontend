"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "../base-comp/Button";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import MovieList from "./MovieList";
import { useAuth } from "@/context/AuthContext";
import Spinner from "../base-comp/Spinner";
import { apiUrl } from "@/constants";

const PAGE_SIZE = 8; // Or whatever your backend supports

const Movies = () => {
  const router = useRouter();
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { setIsAuthenticated } = useAuth();

  // Utility: get token/userId from secureLocalStorage or sessionStorage
  const getSessionValue = (key: string) => {
    return secureLocalStorage.getItem(key) || sessionStorage.getItem(key);
  };

  const removeSessionValue = (key: string) => {
    secureLocalStorage.removeItem(key);
    sessionStorage.removeItem(key);
  };

  const fetchMovies = async (page = 1) => {
    try {
      const token = getSessionValue("accessToken");
      const userId = getSessionValue("user_id");

      if (!token || !userId) {
        toast.error("Session expired. Please log in again.");
        router.push("/");
        setIsAuthenticated(false);
        return;
      }

      setLoading(true);
      const { data } = await axios.get(
        `${apiUrl}/movies/user/${userId}?page=${page}&limit=${PAGE_SIZE}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMovies(data.movies || []);
      setTotalPages(data.totalPages || 1);
    } catch (error: any) {
      console.error("Error fetching movies:", error);
      toast.error(error.response?.data?.message || "Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    removeSessionValue("accessToken");
    removeSessionValue("user_id");
    setIsAuthenticated(false);
    router.push("/");
  };

  const handleAddMovie = () => {
    router.push("/create-movie");
  };

  if (loading) {
    return <Spinner />;
  }

  if (!movies.length) {
    return (
      <div className="w-full min-h-screen flex flex-col gap-5 items-center justify-center px-4 py-8 sm:px-8 sm:py-16">
        <h1 className="text-h3 md:text-h2 text-white text-center">
          Your movie list is empty
        </h1>
        <Button onClick={handleAddMovie}>Add a new movie</Button>
      </div>
    );
  }

  return (
    <MovieList
      movies={movies}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      onLogout={handleLogout}
      onAddMovie={handleAddMovie}
    />
  );
};

export default Movies;
