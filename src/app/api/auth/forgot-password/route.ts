import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { signToken } from '@/lib/auth/jwt';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

/**
 * POST /api/auth/forgot-password
 * Generates a password reset token and sends it via email
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = forgotPasswordSchema.parse(body);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Always return 200 for security (don't leak if email exists)
    if (!user) {
      return NextResponse.json(
        { message: 'If an account exists with that email, a reset link will be sent.' },
        { status: 200 }
      );
    }

    // Generate reset token (1 hour expiry)
    const resetToken = signToken({ userId: user.id, type: 'password-reset' }, '1h');
    const expiryTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Store reset token in database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpiry: expiryTime,
      },
    });

    // TODO: Send reset email via Resend (Phase B)
    // For now, just log it
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
    console.log(`[PASSWORD RESET] Reset link for ${email}: ${resetUrl}`);

    return NextResponse.json(
      { message: 'If an account exists with that email, a reset link will be sent.' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', details: error.flatten() },
        { status: 400 }
      );
    }

    console.error('[FORGOT PASSWORD ERROR]', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
