'use server'

import prisma from '@/lib/db'
import * as yup from 'yup'
import { revalidatePath } from 'next/cache'
import paths from '@/paths'

const schema = yup.object({
  id: yup
    .number()
    .integer()
    .required('The task id was not provided'),
  title: yup
    .string()
    .trim()
    .required('You need to provide a title for your task'),
  summary: yup
    .string()
    .trim()
    .required('You need to provide a summary for your task'),
  tags: yup
    .array()
    .of(yup.string())
    .required("You need to provide some tags"),
})

export async function updateTask(task: {
  id: number
  title: string
  summary: string
  tags: string[]
}) {
  const data = await schema.validate(task)
  const { id, title, summary, tags } = data

  await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      summary: summary,
      tags: {
        set: [],
        connectOrCreate: tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
  })

  revalidatePath(paths.dashboard())
}
