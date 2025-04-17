import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clerkUserId = searchParams.get('clerkUserId'); // Get Clerk user ID from query params

    if (!clerkUserId) {
      return NextResponse.json({ error: 'Clerk User ID is required' }, { status: 400 });
    }

    // Fetch MongoDB user ID using Clerk user ID
    const mongoUser = await prisma.user.findUnique({
      where: { clerk_id: clerkUserId },
    });

    if (!mongoUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const mongoUserId = mongoUser.id;

    // Fetch forms owned by the MongoDB user ID
    const formsWithResponses = await prisma.form.findMany({
      where: { userId: mongoUserId }, // Filter forms by MongoDB user ID
      include: {
        responses: {
          where: { spam: false }, // Include only non-spam responses
          select: {
            createdAt: true,
            rating: true,
          },
        },
      },
    });

    // Calculate average ratings for each form
    const averageRatings = formsWithResponses.map((form) => {
      const totalRatings = form.responses.reduce((sum, response) => sum + (response.rating || 0), 0);
      const averageRating = form.responses.length > 0 ? totalRatings / form.responses.length : 0;
      return {
        formTitle: form.title,
        averageRating,
      };
    });

    // Calculate submission counts for each form
    const submissionCounts = formsWithResponses.map((form) => ({
      formTitle: form.title,
      submissionCount: form.responses.length,
    }));

    // Calculate engagement over time for each form
    const engagementOverTime = formsWithResponses.map((form) => {
      const responseCounts = form.responses.reduce((acc, response) => {
        const date = response.createdAt?.toISOString().split('T')[0]; // Group by date (YYYY-MM-DD)
        if (date) {
          acc[date] = (acc[date] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      return {
        formTitle: form.title,
        responseCounts,
      };
    });

    return NextResponse.json({ averageRatings, submissionCounts, engagementOverTime });
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}