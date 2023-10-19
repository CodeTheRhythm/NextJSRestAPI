import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  const param1 = request.nextUrl.searchParams.get("param1");
  return NextResponse.json({ param1 });
}

export async function POST(request: NextRequest) {
  const headersList = headers();
  const apiKey = headersList.get('API-Key');

  return NextResponse.json({ apiKey });
}