import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/create-form(.*)',
 '/api/forms/:formId/responses',
 'responses/:responseId',



]);

export default clerkMiddleware(async (auth, req) => {
  //const pathname = req.nextUrl.pathname;

  //if (pathname.startsWith('/responses')) return;
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|api/embed|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
