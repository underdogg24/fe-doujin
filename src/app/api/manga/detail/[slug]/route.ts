import { NextRequest, NextResponse } from 'next/server';
import { mangaApi } from '@/lib/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  try {
    const data = await mangaApi.detail(slug);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Manga detail error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil detail manga' },
      { status: 500 }
    );
  }
}