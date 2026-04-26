import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getSessionUser } from '@/lib/auth/session';

/**
 * DELETE /api/account
 * Deletes the authenticated user account and all associated data (GDPR compliance)
 * This is a destructive operation and cannot be undone.
 */
export async function DELETE(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Delete user (cascades to orders and order items via Prisma schema)
    await prisma.user.delete({
      where: { id: user.id },
    });

    // Create a response that clears the auth cookie
    const response = NextResponse.json(
      { message: 'Account deleted successfully' },
      { status: 200 }
    );

    // Clear the auth cookie
    response.cookies.set('hyena.auth.session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Delete cookie
    });

    return response;
  } catch (error) {
    console.error('[DELETE ACCOUNT ERROR]', error);
    return NextResponse.json(
      { error: 'An error occurred while deleting your account' },
      { status: 500 }
    );
  }
}
