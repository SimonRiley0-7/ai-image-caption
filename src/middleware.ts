import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoutes = ["/", "/api/webhooks(.*)"];

function isPublicRoute(path: string) {
  return publicRoutes.some(pattern => {
    if (pattern.includes("(.*)")) {
      const basePattern = pattern.replace("(.*)", "");
      return path.startsWith(basePattern);
    }
    return path === pattern;
  });
}

export default clerkMiddleware((auth, req) => {
  const path = req.nextUrl.pathname;
  
  if (isPublicRoute(path)) {
    return NextResponse.next();
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};