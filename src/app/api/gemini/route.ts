import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { responseId, questions, answers } = await req.json();

    console.log('Questions:', questions);
    console.log('Answers:', answers);

    // Combine questions and answers for context
    const content = questions
      .map((q: string, i: number) => `Q: ${q}\nA: ${answers[i] ?? 'N/A'}`)
      .join('\n\n');
    console.log('Content for classification:', content);

    // Spam classification prompt
    const spamPrompt = `
      Determine if the answers provided are related to the questions asked.
      If any answer is not related to its corresponding question, classify the response as "spam".
      Otherwise, classify it as "not spam".
      Questions and Answers:
      ${content}
      Provide only "spam" or "not spam" as the result.
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Use a free or lower-tier model

    // Spam classification
    const spamResult = await model.generateContent(spamPrompt);
    const spamText = (await spamResult.response).text().trim().toLowerCase();
    const isSpam = spamText === 'spam';

    // Update the response in the database
    await prisma.response.update({
      where: { id: responseId },
      data: {
        spam: isSpam,
      },
    });

    return NextResponse.json({ spam: isSpam }, { status: 200 });
  } catch (err) {
    console.error('Error processing response:', err);
    return NextResponse.json({ error: 'Failed to process response' }, { status: 500 });
  }
}