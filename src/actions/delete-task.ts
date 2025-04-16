'use server'

import sql from '@/lib/db'
import paths from '@/paths'
import { revalidatePath } from 'next/cache'

export async function deleteTask(id: string): Promise<boolean> {
  try {
    await sql`
      DELETE FROM task
      WHERE id = ${id}
  `
  } catch (err) {
    console.error(err)
    return false
  }
  revalidatePath(paths.dashboard())

  return true
}
