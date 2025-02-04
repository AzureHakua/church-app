interface Env {
  BULLETIN_BUCKET: R2Bucket;
}

export async function onRequestPost(context: EventContext<Env, string, unknown>) {
  try {
    const formData = await context.request.formData();
    const file = formData.get('file');
    
    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Convert file to arrayBuffer for R2 storage
    const arrayBuffer = await file.arrayBuffer();
    
    // Store in R2 with a fixed name for the current bulletin
    await context.env.BULLETIN_BUCKET.put('current-bulletin.pdf', arrayBuffer);

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Upload failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
