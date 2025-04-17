import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define protected app routes
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/create-form(.*)',
  '/forms/[formId]/responses(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;


  if (pathname.startsWith('/api/responses')) return;
  if (pathname.startsWith('/api/embed')) return;
  if (pathname.startsWith('/utils/customEmbed.js')) return;


  if (isProtectedRoute(req)) await auth.protect();
});


export const config = {
  matcher: [
    '/((?!_next|api/responses|api/embed|utils/customEmbed\\.js|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
