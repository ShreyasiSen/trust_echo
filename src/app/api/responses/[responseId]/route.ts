import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'; // Ensure you have a Prisma client instance
const prisma = new PrismaClient();
export async function GET(req: Request, { params }: { params: Promise<{ responseId: string }> }) {
  try {
    // Await the params Promise to resolve the responseId
    const { responseId } = await params;

    // Fetch the testimonial from the database using Prisma
    const testimonial = await prisma.response.findUnique({
      where: { id: responseId },
    });

    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}   