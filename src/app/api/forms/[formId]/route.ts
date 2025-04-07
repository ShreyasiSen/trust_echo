import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { formId: string } }) {
  const { formId } = await params;

  try {
    const form = await prisma.form.findUnique({
      where: { id: formId },
    });

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    return NextResponse.json(form, { status: 200 });
  } catch (err) {
    console.error('Error fetching form:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}