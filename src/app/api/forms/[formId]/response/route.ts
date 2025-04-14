import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Validate AWS ENV variables
if (
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.AWS_REGION ||
  !process.env.AWS_BUCKET_NAME
) {
  throw new Error('Missing AWS configuration in environment variables');
}

// Configure S3
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

export async function POST(
  req: Request,
  context: { params: Promise<{ formId: string }> }
) {
  const { formId } = await context.params;

  try {
    const bodyData = await req.formData();
    const fileBlob = bodyData.get('image') as File | null;

    const responderName = bodyData.get('responderName') as string;
    const responderEmail = bodyData.get('responderEmail') as string;
    const questions = JSON.parse(bodyData.get('questions') as string);
    const answers = JSON.parse(bodyData.get('answers') as string);
    const improvementFeedback = bodyData.get('improvementFeedback') as string | null;
    const rating = parseInt(bodyData.get('rating') as string);

    let imageUrl: string | null = null;

    // Upload to S3 if image is present
    if (fileBlob) {
      const buffer = Buffer.from(await fileBlob.arrayBuffer());
      const fileName = `${uuidv4()}-${fileBlob.name}`;

      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: fileName,
        Body: buffer,
        ContentType: fileBlob.type,
      };

      await s3.send(new PutObjectCommand(uploadParams));

      imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    }

    if (!responderName || !responderEmail || !questions || !answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const form = await prisma.form.findUnique({ where: { id: formId } });
    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    const content = questions
      .map((q: string, i: number) => `Q: ${q}\nA: ${answers[i] ?? 'N/A'}`)
      .join('\n\n');

    const spamPrompt = `
      You are a spam detection system. Your task is to classify the provided content as "spam" or "not spam".
      The content consists of questions and answers from a form submission.
      Questions and Answers:
      ${content}
      Provide only "spam" or "not spam" as the result.
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const spamResult = await model.generateContent(spamPrompt);
    const spamText = (await spamResult.response).text().trim().toLowerCase();
    const isSpam = spamText === 'spam';

    const newResponse = await prisma.response.create({
      data: {
        formId,
        responderName,
        responderEmail,
        questions,
        answers,
        rating,
        spam: isSpam,
        imageUrl,
        createdAt: new Date(),
      },
    });

    if (improvementFeedback?.trim()) {
      await prisma.form.update({
        where: { id: formId },
        data: {
          improvements: {
            push: improvementFeedback,
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
