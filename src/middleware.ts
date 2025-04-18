import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/create-form(.*)',
  '/forms/[formId]/responses(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  // ✅ Skip authentication for embed API route
  if (pathname.startsWith('/api/responses')) return;
  if (pathname.startsWith('/responses')) return;

  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // ✅ Make sure /api/embed is excluded here too
    '/((?!_next|api/embed|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};