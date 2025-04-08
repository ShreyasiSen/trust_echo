import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: Promise<{ clerkId: string }> }) {
  const { clerkId } = await params; // Await the params Promise to extract clerkId

  try {
    const user = await prisma.user.findUnique({
      where: { clerk_id: clerkId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ id: user.id }, { status: 200 });
  } catch (err) {
    console.error('Error fetching user:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}