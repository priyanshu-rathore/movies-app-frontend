"use client";

import Image from "next/image";
import React from "react";
import Button from "../base-comp/Button";
import Pagination from "./Pagination";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";

interface Movie {
  _id: string;
  title: string;
  publishingYear: number;
  poster: string;
}

interface MovieListProps {
  movies: Movie[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLogout?: () => void;
  onAddMovie?: () => void;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  currentPage,
  totalPages,
  onPageChange,
  onLogout,
  onAddMovie,
}) => {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-2 sm:px-4 md:px-6 py-6 sm:py-12 overflow-y-auto">
      {/* Header row */}
      <div className="flex w-full flex-row justify-between items-center mb-8 max-w-7xl">
        <h1 className="text-white text-xl sm:text-2xl md:text-[2.3rem] flex items-center gap-4">
          My movies
          <button
            type="button"
            className="w-8 h-8 flex items-center cursor-pointer justify-center rounded-full border-2 border-white bg-transparent hover:bg-white hover:text-[#0E2C36] transition-all p-0"
            onClick={onAddMovie}
          >
            <span className="text-lg font-bold">+</span>
          </button>
        </h1>
        {/* Logout icon/button: shown only on mobile (block on xs, hidden sm+), hidden on larger screens */}
        <button
          type="button"
          className="flex sm:hidden items-center p-2"
          onClick={onLogout}
          aria-label="Logout"
        >
          <MdLogout size={24} className="text-white" />
        </button>
        {/* Logout button (text+icon): shown only on sm+ */}
        <Button
          variant="secondary"
          type="button"
          className="min-w-max items-center justify-center gap-3 hidden sm:flex"
          onClick={onLogout}
        >
          Logout <MdLogout />
        </Button>
      </div>
      {/* Movie grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-10 max-w-7xl w-full">
        {movies.map((movie) => (
          <div
            key={movie._id}
            onClick={() => router.push(`/edit-movie/${movie._id}`)}
            className="bg-input rounded-2xl overflow-hidden shadow-lg flex flex-col transition-all border-2 border-transparent hover:border-[#6e57ff] cursor-pointer"
          >
            <div className="relative w-full h-36 xs:h-48 sm:h-60 md:h-64">
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-cover rounded-t-2xl"
                sizes="100%"
              />
            </div>
            <div className="p-3 sm:p-4 min-h-[56px] xs:min-h-[65px] sm:min-h-[85px] flex flex-col">
              <h2 className="text-white text-xs xs:text-sm sm:text-lg font-semibold mb-1">
                {movie.title}
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm">{movie.publishingYear}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default MovieList;
