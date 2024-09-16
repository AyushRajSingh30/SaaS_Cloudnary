import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUplodResult {
  public_id: string;
  bytes: number;
  duration?: number;
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  //Cheak User login or not
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorization" }, { status: 400 });
  }

  try {
    const formData = await request.formData();
    console.log(" request.formData(); ", formData);

    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const originalSize = formData.get("originalSize") as string;

    if (!file) {
      return NextResponse.json({ error: "file not found" }, { status: 400 });
    }

    //arrayBuffer() is a raw block of memory store binary data it encode and decode file into binary data and Buffer (tempory stroge) stream bytes over network or transfer bytes over network.
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUplodResult>(
      (resolve, reject) => {
        const uplodeStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "video",
            folder: "video-uploads",
            transformation: [{ quality: "auto", fetch_format: "mp4" }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUplodResult);
          }
        );
        uplodeStream.end(buffer);
      }
    );
    const video = await prisma.video.create({
      data: {
        tittle: title,
        description,
        publicId: result.public_id,
        originalSize,
        compressedSize: String(result.bytes),
        duration: result.duration || 0,
      },
    });
    return NextResponse.json(video);
  } catch (error) {
    console.log("Uplode video Failed", error);
    return NextResponse.json({ message:"Uplode video Failed" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
