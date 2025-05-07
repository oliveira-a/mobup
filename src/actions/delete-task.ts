'use server'

import paths from '@/paths'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/db'

export async function deleteTask(id: number) {
  await prisma.task.delete({
    where: {
      id: id,
    },
  })

  revalidatePath(paths.dashboard())
}
