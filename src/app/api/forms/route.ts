import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { userId, title, description, questions } = await req.json();
        console.log('Received data:', { userId, title, description, questions }); // Debugging line

        // Validate input
        if (!userId || !title || !questions || !Array.isArray(questions)) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Find the user by Clerk ID
        const user = await prisma.user.findUnique({
            where: { clerk_id: userId },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

      
        const newForm = await prisma.form.create({
            data: {
                title,
                description,
                questions,
                userId: user.id, 
                createdAt: new Date(),
            },
        });

        return NextResponse.json(newForm, { status: 201 });
    } catch (err) {
        console.error('Error creating form:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}