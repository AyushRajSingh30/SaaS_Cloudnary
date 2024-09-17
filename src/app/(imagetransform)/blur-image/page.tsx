"use client";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import React, { ChangeEvent, useState } from "react";

function Page() {
  const [uploadedImage, setUpload] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

  const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUploading(true);
    const file = e.target.files?.[0];

    if (!file) {
      alert("Please upload an image");
      setUploading(false);
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file");
      setUploading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/image-upload", formData);
      const Data = response.data;
      setUpload(Data.publicId);
    } catch (error) {
      console.log(error);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row gap-4">
      {/* Left section: Image Upload */}
      <div className="card bg-base-300 shadow-xl rounded-lg h-auto p-6 w-full lg:w-1/3">
        <div className="container mx-auto p-4 text-center">
          <h1 className="text-3xl font-bold mb-6 text-primary">
           Blur Image
          </h1>
          <div>
            <label className="label">
              <span className="label-text text-lg">Upload Image</span>
            </label>
            <input
              type="file"
              onChange={handleSubmit}
              className="file-input file-input-bordered file-input-primary w-full"
            />
          </div>

          {uploading && (
            <div className="mt-4">
              <progress className="progress progress-primary w-full"></progress>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="divider lg:divider-horizontal text-lg font-semibold">
        OR
      </div>

      {/* Right section: Image Preview */}
      <div className="card bg-base-300 shadow-xl rounded-lg h-auto p-6 w-full lg:w-2/3 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Preview:</h2>
          {uploading ? (
            <div className="mt-4">
              <progress className="progress progress-primary w-full"></progress>
            </div>
          ) : uploadedImage ? (
            <CldImage
              width="960"
              height="600"
              src={uploadedImage}
              sizes="100vw"
              alt="Transformed image"
              blur="1200"
            />
          ) : (
            <p className="text-gray-500">No image uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
