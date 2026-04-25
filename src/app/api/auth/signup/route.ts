import { NextResponse } from "next/server";
import { z } from "zod";
import { signAuthToken } from "@/lib/auth/jwt";
import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/db/prisma";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
});

export async function POST(request: Request) {
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

    return NextResponse.json({ token, user }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid signup payload", details: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to create account" }, { status: 500 });
  }
}
