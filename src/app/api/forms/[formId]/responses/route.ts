import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: Promise<{ formId: string }> }) {
  const { formId } = await context.params; // Await the params Promise to extract formId
  if(!formId) {
    return NextResponse.json({ error: 'Form ID is required' }, { status: 400 });
  }
  try {
    const responses = await prisma.response.findMany({
      where: { formId },
    });

    if (!responses || responses.length === 0) {
      return NextResponse.json({ message: 'No responses found for this form.' }, { status: 404 });
    }

    return NextResponse.json(responses, { status: 200 });
  } catch (err) {
    console.error('Error fetching responses:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}