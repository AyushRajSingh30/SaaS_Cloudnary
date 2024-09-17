"use client";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";

function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedImage, setUpload] = useState<string>("");
  const [object, setObject]=useState("");
  const [uploading, setUploading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    console.log(typeof object);
    if (!file) {
      alert("Please upload an image");
      setUploading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/image-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const Data = response.data;
      setUpload(Data.publicId);
    } catch (error) {
      console.log(error);
      alert("Image uploading Failed try again..");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row gap-4">
      {/* Left section: Image Recolour */}
      <div className="card bg-base-300 shadow-xl rounded-lg h-auto p-6 w-full lg:w-1/3">
        <div className="container mx-auto p-4 text-center">
          <h1 className="text-3xl font-bold mb-6 text-primary">
            Remove object from image
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label">
                <span className="label-text text-lg">Upload Image</span>
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
                className="file-input file-input-bordered file-input-primary w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="label">
                <span className="label-text text-lg">Remove Object</span>
              </label>
              <input
                type="text"
                value={object}
                onChange={(e) => setObject(e.target.value)}
                placeholder="Object"
                className="input input-bordered w-full"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={uploading}
            >
              Remove
            </button>
          </form>
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
              crop="fill"
              remove={object}
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
