import { NextRequest, NextResponse } from 'next/server';
import { videoApi } from '@/lib/api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');

  if (!query) {
    return NextResponse.json(
      { error: 'Query pencarian diperlukan' },
      { status: 400 }
    );
  }

  try {
    const data = await videoApi.search(query, page);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Video search error:', error);
    return NextResponse.json(
      { error: 'Gagal mencari video' },
      { status: 500 }
    );
  }
}