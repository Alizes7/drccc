// Simple in-memory sliding-window rate limiter.
// NOTE: in-memory state does not survive across serverless instances/regions.
// For production on multi-instance deployments, back this with Redis
// (e.g. Upstash) instead — the interface below is intentionally minimal
// so it can be swapped without touching the API route.

interface Bucket {
  timestamps: number[];
}

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { timestamps: [] };

  bucket.timestamps = bucket.timestamps.filter((t) => now - t < WINDOW_MS);

  if (bucket.timestamps.length >= MAX_REQUESTS) {
    buckets.set(key, bucket);
    return true;
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);
  return false;
}
