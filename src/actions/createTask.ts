'use server'

import { revalidatePath } from 'next/cache'
import paths from '@/paths'
import db from '@/lib/db'
import getServerSession from 'next-auth'
import { authOptions } from '@/lib/auth'

async function getUserId(): Promise<string> {
  const session = await getServerSession(authOptions)
  const auth = await session.auth()

  if (!auth?.user) {
    throw new Error('User could not be obtained from session.')
  }

  return auth.user.id!
}

export async function createTask(task: {
  title: string
  summary: string
  tags: string[]
}) {
  await db.task.create({
    data: {
      title: task.title,
      summary: task.summary,
      userId: await getUserId(),
      tags: {
        connectOrCreate: task.tags.map((t) => ({
          where: { name: t },
          create: { name: t },
        })),
      },
    },
  })

  revalidatePath(paths.dashboard())
}
