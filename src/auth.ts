import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
import * as yup from 'yup'
import bcrypt from 'bcrypt'
import { getUser } from '@/actions/get-user'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
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
})
