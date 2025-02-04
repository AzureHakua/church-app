import { writeFile, unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const bulletinPath = path.join(process.cwd(), 'public', 'bulletins', 'current-bulletin.pdf');

    // Delete existing file if it exists
    try {
      await unlink(bulletinPath);
    } catch (error) {
      // Ignore error if file doesn't exist
    }

    // Write new file
    await writeFile(bulletinPath, buffer);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
