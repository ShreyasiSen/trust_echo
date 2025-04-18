import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}


export async function GET(req: Request, paramsPromise: Promise<{ params: { responseId: string } }>) {
  try {
    const { params } = await paramsPromise;
    const { responseId } = params;

    const testimonial = await prisma.response.findUnique({
      where: { id: responseId },
    });

    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, {
        status: 404,
        headers: corsHeaders(),
      });
    }

    return NextResponse.json(testimonial, {
      status: 200,
      headers: corsHeaders(),
    });
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, {
      status: 500,
      headers: corsHeaders(),
    });
  }
}

// OPTIONS handler for CORS preflight
export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}
