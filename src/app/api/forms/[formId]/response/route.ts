import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request, context: { params: Promise<{ formId: string }> }) {
  const { formId } = await context.params; 

  try {
    const body = await req.json();
    const { responderName, responderEmail, answers, improvementFeedback, rating } = body;

    // Validate request body
    if (!responderName || !responderEmail || !answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // Fetch the form to ensure it exists
    const form = await prisma.form.findUnique({
      where: { id: formId },
    });

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    // Save the response
    const newResponse = await prisma.response.create({
      data: {
        formId,
        responderName,
        responderEmail,
        answers,
        rating, // Store only the answers to the questions
        createdAt: new Date(),
      },
    });

    // If improvement feedback is provided, add it to the form's improvements array
    if (improvementFeedback && improvementFeedback.trim() !== '') {
      await prisma.form.update({
        where: { id: formId },
        data: {
          improvements: {
            push: improvementFeedback, // Add the improvement feedback to the array
          },
        },
      });
    }

    return NextResponse.json(newResponse, { status: 201 });
  } catch (err) {
    console.error('Error saving response:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}