import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params; // Await the params Promise to extract userId

  try {
    const forms = await prisma.form.findMany({
      where: { userId },
    });

    return NextResponse.json(forms, { status: 200 });
  } catch (err) {
    console.error('Error fetching forms:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}