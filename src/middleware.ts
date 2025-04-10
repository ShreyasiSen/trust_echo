import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/create-form(.*)',
  '/forms/[formId]/responses(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Set authorized parties for Clerk middleware
  const authorizedParties = ['https://www.fidefeed.com'];

  // Protect routes if they match the protected route matcher
  if (isProtectedRoute(req)) {
    await auth.protect();

    // Authenticate the request with authorized parties
    const client = await clerkClient();
    await client.authenticateRequest(req, {
      authorizedParties,
    });
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};