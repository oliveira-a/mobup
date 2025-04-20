'use server'

import sql from '@/lib/db'
import { User } from '@/lib/dtos'

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`
      SELECT id, name, email, password
      FROM "user"
      WHERE email=${email}`
    return user[0]
  } catch (error) {
    throw new Error('Failed to fetch user.')
  }
}
