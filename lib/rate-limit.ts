type RateLimitOptions = {
  maxRequests: number;
  windowMs: number;
};

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __bsFurnitureRateLimits: Map<string, RateLimitRecord> | undefined;
}

const rateLimits = globalThis.__bsFurnitureRateLimits ?? new Map<string, RateLimitRecord>();

if (!globalThis.__bsFurnitureRateLimits) {
  globalThis.__bsFurnitureRateLimits = rateLimits;
}

function pruneExpiredEntries(now: number) {
  for (const [key, record] of rateLimits.entries()) {
    if (record.resetAt <= now) {
      rateLimits.delete(key);
    }
  }
}

export function checkRateLimit(key: string, options: RateLimitOptions) {
  const now = Date.now();
  pruneExpiredEntries(now);

  const currentRecord = rateLimits.get(key);

  if (!currentRecord || currentRecord.resetAt <= now) {
    rateLimits.set(key, {
      count: 1,
      resetAt: now + options.windowMs
    });

    return {
      allowed: true,
      remaining: options.maxRequests - 1,
      retryAfterMs: options.windowMs
    };
  }

  if (currentRecord.count >= options.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: Math.max(0, currentRecord.resetAt - now)
    };
  }

  currentRecord.count += 1;
  rateLimits.set(key, currentRecord);

  return {
    allowed: true,
    remaining: Math.max(0, options.maxRequests - currentRecord.count),
    retryAfterMs: Math.max(0, currentRecord.resetAt - now)
  };
}
