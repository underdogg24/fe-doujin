import { NextRequest, NextResponse } from 'next/server';
import { mangaApi } from '@/lib/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const data = await mangaApi.chapterImages(id);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Chapter images error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil gambar chapter' },
      { status: 500 }
    );
  }
}