import { NextRequest, NextResponse } from 'next/server';
import { videoApi } from '@/lib/api';

export async function GET() {
  try {
    const data = await videoApi.categories();
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Video categories error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil kategori video' },
      { status: 500 }
    );
  }
}