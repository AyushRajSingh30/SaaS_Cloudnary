import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
  "/",
  "/home",
]);

const isPublicApiRoute = createRouteMatcher(["/api/video"]);

// This function runs on every request👇

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();

  const currentUrl = new URL(req.url);
  // console.log("Req.URL: ", req.url);
  // console.log("CurrentURL", currentUrl.pathname);

  const isAccessingDashboard = currentUrl.pathname === "/home";

  const isApiRequest = currentUrl.pathname.startsWith("/api");

  //  console.log(isPublicApiRoute(req),"  ", isPublicRoute(req));
  //  console.log("UserId:", userId);

  //If User login
  if (userId && isPublicRoute(req) && !isAccessingDashboard) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  //If user is not logged
  if (!userId) {
    //If user is not logged in and trying to access a protected route
    if (!isPublicApiRoute(req) && !isPublicRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    //if the request is for a proctected  API and the user is not logged in
    if (isApiRequest && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
