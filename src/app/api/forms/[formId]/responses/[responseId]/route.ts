import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: Promise<{ formId: string; responseId: string }> }) {
  const { responseId } = await params; // Await the params Promise to extract responseId

  try {
    await prisma.response.delete({
      where: { id: responseId },
    });

    return NextResponse.json({ message: 'Response deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error deleting response:', err);
    return NextResponse.json({ error: 'Failed to delete response' }, { status: 500 });
  }
}
