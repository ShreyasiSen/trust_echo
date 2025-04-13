import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request, context: { params: Promise<{ formId: string }> }) {
  const { formId } = await context.params;

  try {
    const body = await req.json();
    const { responderName, responderEmail,questions, answers, improvementFeedback, rating } = body;

    // Validate request body
    if (!responderName || !responderEmail || !questions || !answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // Fetch the form to ensure it exists
    const form = await prisma.form.findUnique({
      where: { id: formId },
    });

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    // Combine questions and answers for context
    const content = questions
      .map((q: string, i: number) => `Q: ${q}\nA: ${answers[i] ?? 'N/A'}`)
      .join('\n\n');

    // Spam classification prompt
    const spamPrompt = `
      You are a spam detection system. Your task is to classify the provided content as "spam" or "not spam".
      The content consists of questions and answers from a form submission.
      Questions and Answers:
      ${content}
      Provide only "spam" or "not spam" as the result.
    `;
    console.log('Spam classification prompt:', spamPrompt);
    // Send data to Gemini API for spam classification
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const spamResult = await model.generateContent(spamPrompt);
    const spamText = (await spamResult.response).text().trim().toLowerCase();
    const isSpam = spamText === 'spam';

    // Save the response
    const newResponse = await prisma.response.create({
      data: {
        formId,
        responderName,
        responderEmail,
        questions,
        answers,
        rating,
        spam: isSpam, // Save the spam classification result
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