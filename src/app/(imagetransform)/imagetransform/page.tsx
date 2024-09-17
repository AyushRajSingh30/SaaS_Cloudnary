"use client";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";

function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedImage, setUpload] = useState("");
  const [object, SetObject] = useState("");
  const [Recolour, SetRecolour] = useState("");
  const [arr, setArr] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload an image");
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

      const Array = [object, Recolour];
      setArr(Array);
    } catch (error) {
      console.log(error);
      alert("Failed to upload image");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row gap-4">
      {/* Left section: Image Recolour */}
      <div className="card bg-base-300 shadow-xl rounded-lg h-auto p-6 w-full lg:w-1/3">
        <div className="container mx-auto p-4 text-center">
          <h1 className="text-3xl font-bold mb-6 text-primary">
            Image Recolour
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label">
                <span className="label-text text-lg">Upload Image</span>
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="file-input file-input-bordered file-input-primary w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="label">
                <span className="label-text text-lg">Recolour</span>
              </label>
              <input
                type="text"
                value={object}
                onChange={(e) => SetObject(e.target.value)}
                placeholder="Primary Colour"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                value={Recolour}
                onChange={(e) => SetRecolour(e.target.value)}
                placeholder="Secondary Colour"
                className="input input-bordered w-full"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Apply Recolour
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
          {uploadedImage ? (
            <CldImage
              width="960"
              height="600"
              src={uploadedImage}
              sizes="100vw"
              alt="Transformed image"
              crop="fill"
              recolor={arr}
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
