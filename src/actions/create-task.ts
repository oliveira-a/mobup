'use server'

import sql from '@/lib/db'
import * as yup from 'yup'
import { revalidatePath } from 'next/cache'
import {
  FormState,
  mapFormDataToSchema,
  getValidationErrors,
  hasValidationErrors,
} from '@/lib/utils'
import paths from '@/paths'

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
  formState: CreateTaskFormState,
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
    const normalizedTags = data.tags.split(',').filter(Boolean)
    const { ownerId, title, summary } = data

    const task = (
      await sql`
        INSERT INTO task(owner_id, title, summary, tags)
        VALUES(
          ${ownerId},
          ${title},
          ${summary},
          ${normalizedTags}
        )
        RETURNING id`
    )[0]

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
