/**
 * Prevent opening multiple prisma clients when working in development,
 * due to hot reloading. It avoids unexpected problems.
 * This creates a singleton for the prisma client.
 */
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()
const globalForPrisma = global as unknown as {
  prisma: typeof client
}

export const db = globalForPrisma.prisma || client
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

export default db
