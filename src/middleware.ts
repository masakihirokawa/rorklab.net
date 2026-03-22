import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Skip all internal paths (_next, etc.)
    "/((?!_next|_vercel|.*\\..*|api).*)",
    // Explicitly handle routes that might start with locale-like patterns
    "/:locale(en|ja)/:path*",
  ],
};
