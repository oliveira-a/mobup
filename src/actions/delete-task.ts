"use server"

import sql from '@/lib/db'
import paths from '@/paths'
import { revalidatePath } from 'next/cache'

export async function deleteTask(id: string) {
    await sql`
        DELETE FROM task
        WHERE id = ${id}
    `

    revalidatePath(paths.home())
}