import { NextRequest, NextResponse} from "next/server";



const protectedRoutes = [""];

export function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.some((route => path.startsWith(route)));
    const isPublicRoute = !isProtectedRoute;


    fetch("https://auth.hackclub.com/api/v1/me", {
        method: "GET",
        headers: {
            // "Authorization": `Bearer ${}`
        }
    })
    
}