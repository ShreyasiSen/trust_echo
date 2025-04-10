import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: Promise<{ responseId: string }>  }) {
  const { responseId } =  await params;

  try {
   
    const response = await prisma.response.findUnique({
      where: { id: responseId },
      include: {
        form: {
          select: {
            questions: true, 
          },
        },
      },
    });

    if (!response) {
      return NextResponse.json({ error: 'Response not found' }, { status: 404 });
    }

    return NextResponse.json({
      response: {
        id: response.id,
        responderName: response.responderName,
        responderEmail: response.responderEmail,
        answers: response.answers,
        createdAt: response.createdAt,
        rating: response.rating,
        spam: response.spam,
      },
      questions: response.form.questions, // Include the questions from the form
    });
  } catch (error) {
    console.error('Error fetching response:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}