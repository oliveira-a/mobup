"use server"

import sql from '@/lib/db'

export async function deleteTask(id: string) {
    await sql`
        DELETE FROM task
        WHERE id = ${id}
    `
}