/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, {
  useRef,
  useState,
  ChangeEvent,
  DragEvent,
  useEffect,
} from "react";
import Image from "next/image";

interface DropPickImageProps {
  onFileSelected: (file: File) => void;
  imageUrl?: string; // existing image for edit mode
}

const DropPickImage: React.FC<DropPickImageProps> = ({
  onFileSelected,
  imageUrl,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(imageUrl || null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(imageUrl || null);
  }, [imageUrl]);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onFileSelected(file);
  };

  return (
    <div
      className={`w-96 h-96 mx-auto my-12 rounded-lg border-2 border-dashed border-blue-200 bg-input flex items-center justify-center relative cursor-pointer transition-colors overflow-hidden ${
        dragActive ? "bg-blue-800 bg-opacity-40" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleChange}
      />

      {/* Preview or placeholder */}
      {preview ? (
        <div className="relative w-full h-full">
          <Image
            src={preview}
            alt="Selected"
            fill
            style={{ objectFit: "cover", borderRadius: "0.5rem" }}
            sizes="100%"
          />
          <div className="absolute inset-0 bg-input bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center text-white font-semibold transition-opacity">
            Change Image
          </div>
        </div>
      ) : (
        <div className="text-center text-white z-10 select-none">
          <div className="text-3xl mb-2">&#8681;</div>
          <div>Drop an image here</div>
          <div className="mt-1 text-blue-200 text-sm">or click to select</div>
        </div>
      )}

      {dragActive && (
        <div className="absolute inset-0 bg-blue-900 bg-opacity-20 rounded-lg pointer-events-none" />
      )}
    </div>
  );
};

export default DropPickImage;
