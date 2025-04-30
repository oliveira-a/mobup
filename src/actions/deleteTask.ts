'use server'

import paths from '@/paths'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/db'

export async function deleteTask(id: int): Promise<boolean> {
  await prisma.task.delete({
    where: {
      id: id,
    },
  })

  revalidatePath(paths.dashboard())

  return true
}
