import { clerkClient } from '@clerk/clerk-sdk-node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Verifies Clerk session token and attaches user to req
// Also auto-creates the User row in our DB on first request
export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing auth token' });
    }

    const token = authHeader.split(' ')[1];

    // Verify the token with Clerk
    const payload = await clerkClient.verifyToken(token);
    const clerkUserId = payload.sub;

    // Fetch Clerk user details
    const clerkUser = await clerkClient.users.getUser(clerkUserId);

    // Upsert into our DB — creates user on first login
    const user = await prisma.user.upsert({
      where: { id: clerkUserId },
      update: {},
      create: {
        id: clerkUserId,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim(),
      },
    });

    req.user = user; // Now available in all route handlers
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}