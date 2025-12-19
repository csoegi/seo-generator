import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request): Promise<NextResponse> {
  
  const body = (await request.json()) as HandleUploadBody;

  try 
  {
    const jsonResponse = await handleUpload({body,request, onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif', 'image/x-icon'],
          addRandomSuffix: true,
        };
      }
    }); 

    return NextResponse.json(jsonResponse);    

  } catch (error) {
    console.error("Vercel upload error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }, // The webhook will retry 5 times waiting for a 200
    );
  }
}