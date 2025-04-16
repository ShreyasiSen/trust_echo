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
          select: {
            createdAt: true,
            rating: true,
            spam:false
          },
        },
      },
    });

    // Calculate average ratings over time for each form
    const ratingsOverTime = formsWithResponses.map((form) => {
      const ratingCounts = form.responses.reduce((acc, response) => {
        const date = response.createdAt?.toISOString().split('T')[0]; // Group by date (YYYY-MM-DD)
        if (date) {
          if (!acc[date]) {
            acc[date] = { totalRating: 0, count: 0 };
          }
          acc[date].totalRating += response.rating || 0;
          acc[date].count += 1;
        }
        return acc;
      }, {} as Record<string, { totalRating: number; count: number }>);

      // Calculate average rating for each date
      const averageRatings = Object.entries(ratingCounts).map(([date, { totalRating, count }]) => ({
        date,
        averageRating: count > 0 ? totalRating / count : 0,
      }));
     // console.log('Average Ratings:', averageRatings); // Log the average ratings data
      return {
        formTitle: form.title,
        averageRatings,
      };
    });
    console.log('Ratings Over Time:', ratingsOverTime); // Log the ratings over time data
    return NextResponse.json({ ratingsOverTime });
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}