import { NextRequest, NextResponse } from 'next/server';
import { videoApi } from '@/lib/api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');

  try {
    const data = await videoApi.list(page);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Video list error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil daftar video' },
      { status: 500 }
    );
  }
}