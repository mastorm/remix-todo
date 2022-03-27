import {PrismaClient} from '@prisma/client'

function createPrismaClient() {
  const client = new PrismaClient({})
  void client.$connect()
  return client
}

export const prisma = globalThis.__prisma || createPrismaClient()

// In development, we cache the database client on global.__prisma,
// otherwise Remix will recreate it on every hot-reload, causing
// many different copies of Prisma's server to be running at the
// same time, exhausting connections to the database.
//
// See: https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
declare global {
  var __prisma: PrismaClient | undefined
}

if (process.env.NODE_ENV !== 'production') globalThis.__prisma = prisma