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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Testimonial Embed</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js"></script>
  </head>

  <body style="margin: 0; padding: 0px;">
    <div style="background-color: ${backgroundColor}; color: ${textColor}; padding: ${padding}px; border-radius: ${borderRadius}px; border: ${borderWidth}px solid ${borderColor}; font-family: Arial, sans-serif; max-width: 600px; margin: auto; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

      <h2 style="font-family: ${nameFont}; font-size: ${nameFontSize}px; font-weight: bold; margin-bottom: 10px;">👤 ${response.responderName}</h2>
      <p style="font-family: ${emailFont}; font-size: ${emailFontSize}px; margin-bottom: 10px;">📧 ${response.responderEmail}</p>
      <div>
        ${response.answers
          .map(
            (answer, idx) => `
              <p style="font-family: ${questionFont}; font-size: ${questionFontSize}px;"><strong>Q${idx + 1}:</strong> ${response.form.questions[idx]}</p>
              <p style="font-family: ${answerFont}; font-size: ${answerFontSize}px;"><strong>A:</strong> ${answer}</p>
            `
          )
          .join('')}
      </div>
      <p style="font-family: ${ratingFont}; font-size: ${ratingFontSize}px; color: #ffcc00;">Rating: ${'⭐'.repeat(response.rating || 0)}</p>
    </div>
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