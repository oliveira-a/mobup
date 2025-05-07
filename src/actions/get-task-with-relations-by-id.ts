'use server'

import db from '@/lib/db'
import { TaskWithRelations } from '@/lib/types/task'

export async function getTaskWithRelationsById(
  taskId: number
): Promise<TaskWithRelations> {
  const task = await db.task.findFirstOrThrow({
    where: { id: taskId },
    include: {
      user: true,
      tags: true,
    },
  })

  return task
}
