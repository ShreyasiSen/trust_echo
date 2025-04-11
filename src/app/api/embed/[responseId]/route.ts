import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function GET(req: Request, { params }: { params: Promise<{ responseId: string }> }) {
  try {
    // Await the params to resolve the promise
    const { responseId } = await params;

    if (!responseId) {
      return NextResponse.json({ error: 'Invalid or missing responseId' }, { status: 400 });
    }

    // Fetch the response data from the database
    const response = await prisma.response.findUnique({
      where: { id: responseId },
      include: {
        form: true, // Include related form data if needed
      },
    });

    if (!response) {
      return NextResponse.json({ error: 'Response not found' }, { status: 404 });
    }

    // Extract query parameters from the request URL
    const url = new URL(req.url);
    const backgroundColor = url.searchParams.get('backgroundColor') || '#ffffff';
    const textColor = url.searchParams.get('textColor') || '#333333';
    const padding = parseInt(url.searchParams.get('padding') || '20', 10);
    const borderRadius = parseInt(url.searchParams.get('borderRadius') || '10', 10);
    const nameFont = url.searchParams.get('nameFont') || 'Arial';
    const nameFontSize = parseInt(url.searchParams.get('nameFontSize') || '20', 10);
    const emailFont = url.searchParams.get('emailFont') || 'Arial';
    const emailFontSize = parseInt(url.searchParams.get('emailFontSize') || '16', 10);
    const questionFont = url.searchParams.get('questionFont') || 'Arial';
    const questionFontSize = parseInt(url.searchParams.get('questionFontSize') || '14', 10);
    const ratingFont = url.searchParams.get('ratingFont') || 'Arial';
    const ratingFontSize = parseInt(url.searchParams.get('ratingFontSize') || '18', 10);
    const answerFont = url.searchParams.get('answerFont') || 'Arial';
    const answerFontSize = parseInt(url.searchParams.get('answerFontSize') || '14', 10);
    const borderWidth= parseInt(url.searchParams.get('borderWidth') || '1', 10);
    // Generate the HTML content for the iframe
   

    const borderColor= url.searchParams.get('borderColor') || '#333333';
    const html = `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Testimonial Embed</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
</head>

<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Inter', sans-serif;">
  <div style="
    background: ${backgroundColor};
    color: ${textColor};
    padding: ${padding}px;
    border-radius: ${borderRadius}px;
    border: ${borderWidth}px solid ${borderColor};
    max-width: 680px;
    margin: 40px auto;
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.05);
    animation: fadeIn 0.5s ease-in-out;
    transition: all 0.3s ease;
  ">

    <!-- Avatar + Name & Email Centered -->
    <div style="text-align: center; margin-bottom: 28px;">
      <div style="
        width: 72px;
        height: 72px;
        background-color: #3b82f6;
        color: white;
        margin: 0 auto 12px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 24px;
        box-shadow: 0 4px 10px rgba(59, 130, 246, 0.2);
      ">
        ${response.responderName.charAt(0).toUpperCase()}
      </div>
      <h2 style="
        font-family: ${nameFont};
        font-size: ${nameFontSize}px;
        font-weight: 700;
        margin: 0;
        color: ${textColor};
      ">${response.responderName}</h2>
      <p style="
        font-family: ${emailFont};
        font-size: ${emailFontSize}px;
        margin-top: 4px;
        color: ${textColor};
      ">${response.responderEmail}</p>
    </div>

    <!-- QA Section -->
    <div style="padding: 0 28px;">
      ${response.answers
        .map(
          (answer, idx) => `
          <div style="margin-bottom: 24px;">
            <p style="
              font-family: ${questionFont};
              font-size: ${questionFontSize}px;
              font-weight: 600;
              color: ${textColor};
              margin-bottom: 6px;
              display: flex;
              align-items: center;
              gap: 6px;
            "> Q${idx + 1}: <span>${response.form.questions[idx]}</span></p>
            <div style="
              font-family: ${answerFont};
              font-size: ${answerFontSize}px;
              background-color: #f1f5f9;
              padding: 14px 20px;
              border-left: 5px solid #3b82f6;
              border-radius: 8px;
              color: ${textColor};
              transition: background 0.3s;
            ">${answer}</div>
          </div>
        `
        )
        .join('')}
    </div>

    <!-- Rating -->
    <div style="margin: 30px auto 10px; text-align: center;">
      <span style="
        font-family: ${ratingFont};
        font-size: ${ratingFontSize}px;
        font-weight: 600;
        color: ${textColor};
        background: #fff7ed;
        padding: 8px 16px;
        border-radius: 50px;
        display: inline-block;
        box-shadow: 0 3px 10px rgba(0,0,0,0.05);
      ">${'⭐'.repeat(response.rating || 0)}</span>
    </div>
  </div>

  <style>
    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: translateY(10px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>
</body>
</html>
`;


    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Error fetching response:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}