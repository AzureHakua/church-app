interface R2Bucket {
  put(key: string, value: ArrayBuffer | ArrayBufferView | ReadableStream | string): Promise<R2Object>;
  get(key: string): Promise<R2Object | null>;
  delete(key: string): Promise<void>;
}

interface R2Object {
  key: string;
  size: number;
  etag: string;
  httpEtag: string;
  uploaded: Date;
}

interface EventContext<Env, P extends string, Data> {
  request: Request;
  env: Env;
  params: Record<P, string>;
  data: Data;
}
