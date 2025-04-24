import NextAuth from 'next-auth'
import Github from 'next-auth/providers/github'
import { authConfig } from './auth.config'
import * as yup from 'yup'
import bcrypt from 'bcrypt'

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID ?? '',
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? '',
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    async signIn({ session }) {
      // todo: register the user into the database
      return session
    }
  },
})
