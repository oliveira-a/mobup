'use server'

import prisma from '@/lib/db'
import { TaskWithRelations } from '@/lib/types/task'

export async function getTasksWithRelations(): Promise<TaskWithRelations[]> {
  const tasks = await prisma.task.findMany({
    include: {
      user: true,
      tags: true,
    },
  })

  return tasks
}
