import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'Parameter url diperlukan' },
      { status: 400 }
    );
  }

  // Validasi URL hanya untuk domain yang diizinkan
  try {
    const parsedUrl = new URL(url);
    const allowedHosts = ['amz-ch.desu.pics', 'doujin.desu.xxx', 'nekopoi.care'];
    const isAllowed = allowedHosts.some(host => 
      parsedUrl.hostname === host || parsedUrl.hostname.endsWith('.' + host)
    );
    
    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Domain tidak diizinkan' },
        { status: 403 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: 'URL tidak valid' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(url, {
      headers: {
        'Referer': 'https://doujin.desu.xxx/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Gagal mengambil gambar' },
        { status: response.status }
      );
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Cross-Origin-Resource-Policy': 'cross-origin',
      },
    });
  } catch (error) {
    console.error('Proxy image error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil gambar' },
      { status: 500 }
    );
  }
}