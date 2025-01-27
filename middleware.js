import { betterFetch } from "@better-fetch/fetch";
import { NextResponse } from "next/server";

export default async function authMiddleware(request) {
  const { pathname } = request.nextUrl;

  const { data: session } = await betterFetch("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  // If user is trying to access the login page and already has a session, redirect to /dashboard
  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is trying to access the dashboard but does not have a session, redirect to /login
  if (pathname === "/dashboard" && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
  
}

export const config = {
  matcher: ["/dashboard", "/login"], // Apply middleware to both /dashboard and /login routes
};




// import { betterFetch } from "@better-fetch/fetch";
// import { NextResponse } from "next/server";

// export default async function authMiddlware(request) {
//   const { data: session } = await betterFetch("/api/auth/get-session", {
//     baseURL: request.nextUrl.origin,
//     headers: {
//       cookie: request.headers.get("cookie") || "",
//     },
//   });

//   if (!session) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   } 
//   return NextResponse.next();

// }

// export const config = {
//   matcher: ["/dashboard"],
// };
