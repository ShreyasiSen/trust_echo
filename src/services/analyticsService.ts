import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAnalyticsData = async () => {
  try {
    // Fetch average ratings for each form
    const formsWithRatings = await prisma.form.findMany({
      include: {
        responses: {
          select: {
            rating: true,
          },
        },
      },
    });

    const averageRatings = formsWithRatings.map((form) => {
      const totalRatings = form.responses.reduce((sum, response) => sum + (response.rating || 0), 0);
      const averageRating = form.responses.length > 0 ? totalRatings / form.responses.length : 0;
      return {
        formTitle: form.title,
        averageRating,
      };
    });

    // Fetch submission counts for each form
    const submissionCounts = formsWithRatings.map((form) => ({
      formTitle: form.title,
      submissionCount: form.responses.length,
    }));

    return { averageRatings, submissionCounts };
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    throw error;
  } finally {
    await prisma.$disconnect(); // Ensure the Prisma client disconnects after the query
  }
};