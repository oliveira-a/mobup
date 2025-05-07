'use server'

import prisma from '@/lib/db'
import * as yup from 'yup'
import { revalidatePath } from 'next/cache'
import paths from '@/paths'

const schema = yup.object({
  id: yup.string().trim().required('The task id was not provided'),
  title: yup
    .string()
    .trim()
    .required('You need to provide a title for your task'),
  summary: yup
    .string()
    .trim()
    .required('You need to provide a summary for your task'),
  tags: yup
    .string()
    .required('Please provide some tags as comma separated values'),
})

export async function updateTask(task: {
  id: string
  title: string
  summary: string
  tags: string
}): Promise<UpdateTaskFormState> {
  const data = await schema.validate(task)
  const normalizedTags = data.tags.split(',').filter(Boolean)
  const { id, title, summary } = data

  try {
    const task = prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        summary: summary,
        tags: {
          set: [],
          connectOrCreate: normalizedTags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
        include: {
          tags: true,
        },
      },
    })

    revalidatePath(paths.dashboard())

    return {
      type: 'success',
      data: {
        id: task.id,
        title: task.title,
        summary: task.summary,
        tags: task.tags,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      errors: {
        title: 'Error updating task',
      },
    }
  }
}
