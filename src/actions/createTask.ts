'use server'

import * as yup from 'yup'
import { revalidatePath } from 'next/cache'
import {
  FormState,
  mapFormDataToSchema,
  getValidationErrors,
  hasValidationErrors,
} from '@/lib/utils'
import paths from '@/paths'
import prisma from '@/lib/db'

const schema = yup.object({
  ownerId: yup.string().trim().required('The owner id is missing.'),
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

type CreateTaskFormState =
  | {
      type: 'success'
      data: {
        id: string
      }
      errors?: never
    }
  | {
      type: 'error'
      data?: never
      errors: FormState<typeof schema>
    }
  | Record<string, never>

export async function createTask(
  formData: FormData
): Promise<CreateTaskFormState> {
  const data = mapFormDataToSchema({ schema, formData })
  const validationErrors = await getValidationErrors({ schema, data })

  if (hasValidationErrors(validationErrors)) {
    console.log(validationErrors)
    return {
      type: 'error',
      errors: validationErrors,
    }
  }

  try {
    const normalizedTags = data.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    const task = await prisma.task.create({
      data: {
        userId: data.ownerId,
        title: data.title,
        summary: data.summary,
        tags: {
          connectOrCreate: normalizedTags.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
    })

    revalidatePath(paths.dashboard())

    return {
      type: 'success',
      data: {
        id: task.id,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      type: 'error',
      errors: {
        title: 'This was unsuccessful',
      },
    }
  }
}
