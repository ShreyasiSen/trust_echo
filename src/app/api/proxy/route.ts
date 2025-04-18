import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const responseId = searchParams.get('responseId');

  if (!responseId) {
    return NextResponse.json({ error: 'Missing responseId parameter' }, { status: 400 });
  }

  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://www.fidefeed.com'
      : 'http://localhost:3000';

  try {
    const apiResponse = await fetch(`${API_URL}/api/responses/${responseId}`);
    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      return NextResponse.json({ error: data }, { status: apiResponse.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}