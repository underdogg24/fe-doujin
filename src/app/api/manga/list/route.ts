import { NextRequest, NextResponse } from 'next/server';
import { mangaApi } from '@/lib/api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const page = parseInt(searchParams.get('page') || '1');
  const query = searchParams.get('query') || '';
  const type = searchParams.get('type') || '';
  const genre = searchParams.get('genre') || '';
  const sort = searchParams.get('sort') || 'latest_chapter';
  const limit = parseInt(searchParams.get('limit') || '24');

  try {
    const data = await mangaApi.list({ page, query, type, genre, sort, limit });
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Manga list error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil daftar manga' },
      { status: 500 }
    );
  }
}