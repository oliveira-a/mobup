'use server'

import { Task } from '@/lib/dtos'
import sql from '@/lib/db'

export async function getTasks() {
  const rows = await sql<
    {
      id: string
      title: string
      summary: string
      tags: string[]
      owner_id: string
      owner_name: string
    }[]
  >`
    SELECT
      t.id,
      t.title,
      t.summary,
      t.tags,
      u.id as owner_id,
      u.name as owner_name
    FROM task t
    JOIN "user" u ON t.owner_id = u.id
  `

  const tasks: Task[] = rows.map((row) => ({
    id: row.id,
    title: row.title,
    summary: row.summary,
    tags: row.tags,
    owner: {
      id: row.owner_id,
      name: row.owner_name,
    },
  }))

  return tasks
}
