import { NextResponse } from "next/server";
import { z } from "zod";
import { comparePassword } from "@/lib/auth/password";
import { signAuthToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/db/prisma";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = loginSchema.parse(json);

    const user = await prisma.user.findUnique({ where: { email: data.email.toLowerCase() } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await comparePassword(data.password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signAuthToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid login payload", details: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to sign in" }, { status: 500 });
  }
}
