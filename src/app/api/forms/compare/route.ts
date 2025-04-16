import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clerkUserId = searchParams.get('clerkUserId');

  if (!clerkUserId) {
    return new Response(JSON.stringify({ message: 'clerkUserId is required' }), { status: 400 });
  }

  try {
    // Step 1: Fetch the MongoDB _id of the user from the Clerk ID
    const user = await prisma.user.findUnique({
      where: {
        clerk_id: clerkUserId, // this is the Clerk ID
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    // Step 2: Find forms created by this user (_id)
    const forms = await prisma.form.findMany({
      where: {
        userId: user.id, // this is the MongoDB ObjectId
      },
      include: {
        responses: true,
      },
    });

    if (forms.length === 0) {
      return new Response(JSON.stringify({ message: 'No forms found for this user' }), { status: 404 });
    }

    const formComparisonData = forms.map((form) => {
      const totalResponses = form.responses.length || 1;

      const avgRating =
        form.responses
          .filter((r) => r.rating !== null)
          .reduce((sum, r) => sum + (r.rating ?? 0), 0) / totalResponses;

      const spamCount = form.responses.filter((r) => r.spam === true).length;
      const spamPercentage = (spamCount / totalResponses) * 100;

      const avgResponseLength =
        form.responses
          .filter((r) => r.answers && r.answers.length > 0)
          .reduce((sum, r) => sum + r.answers.join(' ').length, 0) / totalResponses;
    
      return {
        id: form.id,
        name: form.title,
        avgRating,
        totalResponses: form.responses.length,
        spamPercentage,
        avgResponseLength,
      };
    });
    console.log('Form Comparison Data:', formComparisonData); // Log the form comparison data

    return new Response(JSON.stringify(formComparisonData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching form comparison data:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    });
  }
}
