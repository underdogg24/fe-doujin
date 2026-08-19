import { NextRequest, NextResponse } from 'next/server';
import { videoApi } from '@/lib/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  try {
    const data = await videoApi.detail(slug);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Video detail error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil detail video' },
      { status: 500 }
    );
  }
}