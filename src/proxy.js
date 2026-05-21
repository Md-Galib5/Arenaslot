import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; 

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers, 
  });

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
export const config = {
  matcher: [
    "/facilities/:path+",
    "/my-bookings",
    "/add-facilities",
    "/manage-facilities",
  ],
};