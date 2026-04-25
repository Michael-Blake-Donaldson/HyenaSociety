import jwt from "jsonwebtoken";

const TOKEN_EXPIRY = "7d";

type JwtPayload = {
  userId: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
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

export type { JwtPayload };
