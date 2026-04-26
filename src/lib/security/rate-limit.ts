type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfter: number;
};

type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

const store = new Map<string, RateLimitEntry>();

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

export function applyRateLimit(request: Request, key: string, options: RateLimitOptions): RateLimitResult {
  const clientId = getClientIdentifier(request);
  const now = Date.now();
  const storeKey = `${key}:${clientId}`;
  const existing = store.get(storeKey);

  if (!existing || existing.resetAt <= now) {
    store.set(storeKey, {
      count: 1,
      resetAt: now + options.windowMs,
    });

    return {
      allowed: true,
      limit: options.limit,
      remaining: options.limit - 1,
      retryAfter: Math.ceil(options.windowMs / 1000),
    };
  }

  if (existing.count >= options.limit) {
    return {
      allowed: false,
      limit: options.limit,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  store.set(storeKey, existing);

  return {
    allowed: true,
    limit: options.limit,
    remaining: Math.max(0, options.limit - existing.count),
    retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}