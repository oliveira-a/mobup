import type { NextAuthConfig } from 'next-auth'
import Github from 'next-auth/providers/github'
import prisma from '@/lib/db'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import paths from '@/paths'

export const authOptions = {
  session: {
    strategy: 'database',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID ?? '',
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? '',
    }),
  ],
  pages: {
    signIn: paths.login(),
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return `${baseUrl}${paths.dashboard()}`
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth } = NextAuth(authOptions)
