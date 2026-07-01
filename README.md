# ☁️ Cloudinary Showcase SaaS

A modern Software-as-a-Service (SaaS) web application built using **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **DaisyUI**, showcasing advanced integration with **Cloudinary** for image & video optimization and AI-driven media transformations. Secured with **Clerk Authentication** and powered by **Prisma** with a **PostgreSQL** database.

---

## 🚀 Key Features

### 🔐 Secure Authentication & Middleware
* **Clerk Auth Integration:** Dynamic registration, login, and profile pages.
* **Route Protection:** Custom middleware managing public access vs. restricted dashboards.

### 🎥 Intelligent Video Compressor
* **Smart Video Upload:** Accepts local videos and uploads them to Cloudinary dynamically via stream buffers.
* **Auto-Optimization:** Compresses videos into format-optimized `.mp4` files using Cloudinary's auto-quality engine.
* **Metadata Tracking:** Logs title, description, duration, and original vs. compressed file size comparison into a PostgreSQL database using Prisma ORM.

### 📱 Social Media Auto-Resizer & Cropper
* **Responsive Presets:** Automatically format, crop, and resize images for popular social media templates:
  - **Instagram Square** (1:1)
  - **Instagram Portrait** (4:5)
  - **Twitter Post** (16:9)
  - **Twitter Header** (3:1)
  - **Facebook Cover** (205:78)
* **Smart Gravity:** Utilizes Cloudinary's AI gravity cropping to keep the focal subject centered.

### 🤖 AI-Powered Image Transformations
Experience Cloudinary's state-of-the-art Generative AI features:
* **Image Recoloring:** Re-color specific items in an image using plain-text prompts.
* **Object Replacement:** Detect and replace objects in pictures seamlessly.
* **Blur Image:** Apply advanced blurring effects to upload assets.
* **Remove Element:** Erase unwanted components from the composition.
* **Restore Image:** Automatically enhance resolution, denoise, and restore quality.
* **Extract Object:** Isolate and extract key objects from your images.
* **Change Background Color:** Replace the background with any solid color palette.
* **Remove Background:** Cleanly remove backgrounds in one click.

---

## 🛠️ Tech Stack & Dependencies

* **Frontend Framework:** [Next.js 14](https://nextjs.org/) (App Router, React 18)
* **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI Components](https://daisyui.com/)
* **Media Handling:** [Cloudinary Node SDK](https://cloudinary.com/) + [Next Cloudinary](https://next-cloudinary.spacejelly.dev/)
* **Auth System:** [@clerk/nextjs](https://clerk.com/)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Database:** PostgreSQL
* **Other Utilities:** Axios, DayJS, Lucide Icons, Filesize

---

## 📂 Project Structure

```text
├── prisma/
│   ├── schema.prisma            # Database models (Video tracking)
│   └── migrations/              # Database migration history
├── public/                      # Static assets
└── src/
    ├── app/                     # Next.js App Router folders
    │   ├── (app)/               # Protected Dashboard routes
    │   │   ├── home/            # Dashboard main feed (view uploaded videos)
    │   │   ├── social-share/    # Social share dynamic auto-resizer
    │   │   ├── user-profile/    # User profile section
    │   │   └── video-upload/    # Video compressor and upload interface
    │   ├── (auth)/              # Sign-in and Sign-up paths
    │   ├── (imagetransform)/    # AI Image transform interfaces (Blur, Recolour, etc.)
    │   ├── api/                 # Next.js API Routes (image/video uploads and retrieval)
    │   ├── globals.css          # Tailwind CSS global styles
    │   └── layout.tsx           # Main root wrapper layout
    ├── components/              # Reusable UI components (VideoCard, etc.)
    ├── middleware.ts            # Clerk Authentication and route access matcher
    └── types/                   # TypeScript type definitions
```

---

## 🗄️ Database Schema

The database model tracking compressed video assets is managed through Prisma:

```prisma
model Video {
  id             String   @id @default(cuid())
  tittle         String   // Video Title
  description    String?  // Optional description
  publicId       String   // Provided by Cloudinary
  originalSize   String   // Original file size before upload
  compressedSize String   // Compressed size returned by Cloudinary
  duration       Float    // Video duration in seconds
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory and configure the following parameters based on your local settings and service API keys:

```bash
# PostgreSQL Database URL
DATABASE_URL="postgresql://username:password@localhost:5432/cloudinary_showcase?schema=public"

# Cloudinary Credentials
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"
```

---

## 🏃 Getting Started

Follow these steps to set up and run the application locally:

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database & ORM
Ensure your database is running, and push your schema:
```bash
# Generate the Prisma Client
npx prisma generate

# Push the schema changes directly to your database
npx prisma db push
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the application.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
