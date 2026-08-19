import { NextRequest, NextResponse } from 'next/server';
import { videoApi } from '@/lib/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');

  try {
    const data = await videoApi.category(category, page);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Video category error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil video kategori' },
      { status: 500 }
    );
  }
}