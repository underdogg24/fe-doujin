import { NextRequest, NextResponse } from 'next/server';
import { mangaApi } from '@/lib/api';

export async function GET() {
  try {
    const data = await mangaApi.genres();
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Genres error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil daftar genre' },
      { status: 500 }
    );
  }
}