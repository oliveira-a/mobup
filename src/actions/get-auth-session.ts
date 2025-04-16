'use server'

import { auth } from '@/auth'

export async function getAuthSession() {
  const session = await auth()
  return session
}
