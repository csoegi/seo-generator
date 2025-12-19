import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlToDelete = searchParams.get('url');

  if (!urlToDelete) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    // Perform the deletion using the secret BLOB_READ_WRITE_TOKEN
    await del(urlToDelete);
    
    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error("Vercel deletion error:", error);
    return NextResponse.json(
      { error: (error as Error).message }, 
      { status: 500 }
    );
  }
}