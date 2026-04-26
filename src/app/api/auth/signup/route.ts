import { NextResponse } from "next/server";
import { z } from "zod";
import { signAuthToken } from "@/lib/auth/jwt";
import { hashPassword } from "@/lib/auth/password";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { applyRateLimit } from "@/lib/security/rate-limit";
import { sendWelcomeEmail } from "@/lib/email/service";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
});

export async function POST(request: Request) {
  const rateLimit = applyRateLimit(request, "auth-signup", { limit: 5, windowMs: 60_000 });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many signup attempts. Please try again shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfter),
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      },
    );
  }

  try {
    const json = await request.json();
    const data = signupSchema.parse(json);

    const existing = await prisma.user.findUnique({ where: { email: data.email.toLowerCase() } });
    if (existing) {
      return NextResponse.json({ error: "Account already exists" }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        passwordHash: await hashPassword(data.password),
        firstName: data.firstName,
        lastName: data.lastName,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    const token = signAuthToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({ user }, { status: 201 });

    response.cookies.set(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);
    response.headers.set("X-RateLimit-Limit", String(rateLimit.limit));
    response.headers.set("X-RateLimit-Remaining", String(rateLimit.remaining));

    // Send welcome email asynchronously (don't block signup)
    sendWelcomeEmail({
      recipientEmail: user.email,
      customerName: user.firstName || user.email.split('@')[0],
    }).catch(error => {
      console.error('[SIGNUP] Failed to send welcome email:', error);
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid signup payload", details: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to create account" }, { status: 500 });
  }
}
