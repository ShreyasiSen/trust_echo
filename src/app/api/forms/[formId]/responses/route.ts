import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: { formId: string } }) {
  const { params } = context;
  const { formId } = await params; 

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