import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request, context: { params: { formId: string } }) {
  const { params } = context;
  const { formId } = await params;
  try {
    const body = await req.json();
    const { responderName, responderEmail, answers } = body;


    if (!responderName || !responderEmail || !answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }


    const form = await prisma.form.findUnique({
      where: { id: formId },
    });

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    const newResponse = await prisma.response.create({
      data: {
        formId,
        responderName,
        responderEmail,
        answers,
        createdAt: new Date()
      },
    });

    return NextResponse.json(newResponse, { status: 201 });
  } catch (err) {
    console.error('Error saving response:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}