import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUplodResult {
  public_id: string;
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  console.log("Image-Upload Route");
  //Cheak User login or not
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorization" }, { status: 400 });
  }

  try {
    const formData = await request.formData();
    // console.log("formData", formData);
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "file not found" }, { status: 400 });
    }

    //arrayBuffer() is a raw block of memory store binary data it encode and decode file into binary data and Buffer (tempory storage) stream bytes over network or transfer bytes over network.
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // console.log("ArrayBuffer=> ", buffer);
    // console.log("buffer=> ", buffer);
    const result = await new Promise<CloudinaryUplodResult>(
      (resolve, reject) => {
        const uplodeStream = cloudinary.uploader.upload_stream(
          {
            folder: "next-cloudinary-uplods",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUplodResult);
          }
        );
        // End the stream with the buffer
        uplodeStream.end(buffer);
        console.log(uplodeStream);
      }
    );
    return NextResponse.json({ publicId: result.public_id }, { status: 200 });
  } catch (error) {
    console.log("Uplode image failed", error);
    return NextResponse.json({ error: "Uplode Image Failed" }, { status: 500 });
  }
}
