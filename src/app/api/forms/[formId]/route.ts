import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params; // Await the params Promise to extract formId

  // Validate formId
  if (!formId || formId.length !== 24) {
    return NextResponse.json({ error: 'Invalid form ID' }, { status: 400 });
  }

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

export async function DELETE(req: Request, { params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params; // Await the params Promise to extract formId

  // Validate formId
  if (!formId || formId.length !== 24) {
    return NextResponse.json({ error: 'Invalid form ID' }, { status: 400 });
  }

  try {
    // Delete all responses associated with the form
    await prisma.response.deleteMany({
      where: { formId },
    });

    // Delete the form
    await prisma.form.delete({
      where: { id: formId },
    });

    return NextResponse.json({ message: 'Form and associated responses deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error deleting form and responses:', err);
    return NextResponse.json({ error: 'Failed to delete form and responses' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params; // Await the params Promise to extract formId

  // Validate formId
  if (!formId || formId.length !== 24) {
    return NextResponse.json({ error: 'Invalid form ID' }, { status: 400 });
  }

  try {
    // Parse the request body to get the updated form data
    const body = await req.json();
    const { questions } = body;

    // Prepare updated data for the form
  
    // Check if new questions are provided, and add them
    const updatedFormData = {
      ...body,
      questions: questions ? questions : undefined,
    };

    // Update the form with the new title, description, and potentially new questions
    const updatedForm = await prisma.form.update({
      where: { id: formId },
      data: updatedFormData,
    });

    // Return the updated form with the new questions
    return NextResponse.json(updatedForm, { status: 200 });
  } catch (err) {
    console.error('Error updating form:', err);
    return NextResponse.json({ error: 'Failed to update form' }, { status: 500 });
  }
}