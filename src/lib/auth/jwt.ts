import jwt from "jsonwebtoken";

const TOKEN_EXPIRY = "7d";

type JwtPayload = {
  userId: string;
  email?: string;
  role?: "CUSTOMER" | "ADMIN";
  type?: string;
};

function getSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return secret;
}

export function signAuthToken(payload: JwtPayload) {
  return jwt.sign(payload, getSecret(), { expiresIn: TOKEN_EXPIRY });
}

export function verifyAuthToken(token: string) {
  return jwt.verify(token, getSecret()) as JwtPayload;
}

/**
 * Sign a token with custom expiry time
 * Expiry can be a number (seconds) or string (e.g., '1h', '7d')
 */
export function signToken(payload: JwtPayload, expiresIn: string | number = TOKEN_EXPIRY) {
  const options: any = { expiresIn };
  return jwt.sign(payload, getSecret(), options);
}

/**
 * Verify a token
 */
export function verifyToken(token: string) {
  return jwt.verify(token, getSecret()) as JwtPayload;
}

export type { JwtPayload };
