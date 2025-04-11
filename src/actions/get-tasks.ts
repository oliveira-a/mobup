'use server'

import { Task } from '@/lib/dtos'
import sql from '@/lib/db'

export async function getTasks() {
  const tasks = await sql<Task[]>`
    SELECT id, title, summary, created_by as createdBy, tags FROM task
  `

  return tasks
}