/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import sql from "@/lib/db"
import { Task } from "@/lib/dtos";
import * as yup from "yup";
import { revalidatePath } from 'next/cache'
import { FormState, mapFormDataToSchema, getValidationErrors, hasValidationErrors } from '@/lib/utils'
import paths from '@/paths'

const schema = yup.object({
  createdBy: yup
    .string()
    .trim()
    .required("You need to provide your name when creating a task"),
  title: yup
    .string()
    .trim()
    .required("You need to provide a title for your task"),
  summary: yup
    .string()
    .trim()
    .required("You need to provide a summary for your task"),
  tags: yup.string().required("Please provide some tags as comma separated values"),
});


type CreateTaskFormState =
  | {
    type: "success";
    data: Task;
    errors?: never;
  }
  | {
    type: "error";
    data?: never;
    errors: FormState<typeof schema>
  }
  | Record<string, never>;

// Form State: What you are going to return to the caller?
// Form Data: What did the user submit in their form?
export async function createTask(formState: CreateTaskFormState, formData: FormData): Promise<CreateTaskFormState> {
  const data = mapFormDataToSchema({ schema, formData })
  const validationErrors = await getValidationErrors({ schema, data })

  if (hasValidationErrors(validationErrors)) {
    return {
      type: 'error',
      errors: validationErrors
    }
  }

  try {
    const normalizedTags = data.tags.split(',').filter(Boolean)
    const { createdBy, title, summary } = data

    const task = (await sql`
        INSERT INTO task(created_by, title, summary, tags)
        VALUES(
          ${createdBy},
          ${title},
          ${summary}, 
          ${normalizedTags}
        )
        RETURNING id, title, created_by, summary, tags`)[0]

    revalidatePath(paths.home())

    return {
      type: 'success',
      data: {
        id: task.id,
        title: task.title,
        createdby: task.created_by,
        summary: task.summary,
        tags: task.tags
      }
    }
  } catch (err) {
    console.log(err)

    return {
      type: 'error',
      errors: {
        title: 'This was unsuccessful'
      }
    }
  }
}
