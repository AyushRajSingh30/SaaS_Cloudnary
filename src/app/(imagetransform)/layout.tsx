"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  const userProfile = () => {
    router.push("/user-profile");
  };

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-gray-800 flex justify-between">
          <Link href="/home" className="btn btn-ghost text-xl">
            Cloudnary Showcase
          </Link>
          <div className="hidden lg:flex space-x-4">
            <Link href={"/home"} className="btn btn-ghost">
              Home
            </Link>
            <Link href={"/social-share"} className="btn btn-ghost">
              Social Share
            </Link>
            <Link href={"/video-upload"} className="btn btn-ghost">
              Video Upload
            </Link>
            <details className="dropdown dropdown-hover relative z-10">
              <summary className="btn btn-ghost">Image-Transform</summary>
              <ul className="dropdown-content p-2 shadow bg-gray-800 rounded-box">
                <li className="hover:bg-gray-700">
                  <Link href={"/image-recolour"}>Image Recolour</Link>
                </li>
                <li className="hover:bg-gray-700">
                  <Link href={"/Object-replace"}>Object Replace</Link>
                </li>
                <li className="hover:bg-gray-700">
                  <Link href={"/blur-image"}>Blur Image</Link>
                </li>
                <li className="hover:bg-gray-700">
                  <Link href={"/removeElement"}>Remove Element</Link>
                </li>
                <li className="hover:bg-gray-700">
                  <Link href={"Restore-image"}>Restore Image</Link>
                </li>
                <li className="hover:bg-gray-700">
                  <Link href={"/Extract-Object_fromImage"}>Extract Object</Link>
                </li>
                <li className="hover:bg-gray-700">
                  <Link href={"change-backgroundColour"}>Change BG Colour</Link>
                </li>
                <li className="hover:bg-gray-700">
                  <Link href={"/remove-background"}>Remove Background</Link>
                </li>
              </ul>
            </details>
          </div>

          {/* User Profile and Logout */}
          <div className="flex items-center space-x-4">
            <div className="avatar">
              <div className="w-10 rounded-full online">
                <img
                  src={user?.imageUrl}
                  alt={user?.firstName || user?.emailAddresses[0]?.emailAddress}
                  onClick={userProfile}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <button onClick={handleSignOut} className="btn btn-ghost">
              <LogOutIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        {/* Page content */}
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
