import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import { authConfig } from './auth.config'
import * as yup from 'yup'
import bcrypt from 'bcrypt'
import { getUser } from '@/actions/get-user'

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
    }),
    Credentials({
      async authorize(credentials) {
        const schema = new yup.ObjectSchema({
          email: yup.string().email().required(),
          password: yup.string().min(6).required(),
        })

        try {
          await schema.validate(credentials)
          const { email, password } = schema.cast(credentials)
          const user = await getUser(email)
          if (!user) {
            console.log('User does not exist.')
            return null
          }

          const passwordMatch = await bcrypt.compare(password, user.password)
          if (passwordMatch) {
            return user
          }
        } catch (err) {
          console.error(err)
        }

        return null
      },
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
  },
})
