'use server'

import prisma from '@/lib/db'
import { Task } from '@prisma/client'

export async function getTasks(): Promise<Task[]> {
  const tasks = await prisma.task.findMany({
    include: {
      user: true,
      tags: true
    }
  })
  
  return tasks
}
