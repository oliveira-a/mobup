import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import * as yup from 'yup'

export function getInitials(name: string | null) {
  if (name == null) {
    return ""
  }

  const split = name.split(' ')
  return split[0][0] + split[split.length - 1][0]
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Validation Types
 */
export type FormState<T extends yup.Schema<any>> = Partial<FormSchema<T>>

export type FormSchema<T extends yup.Schema<any>> =
  T extends yup.Schema<infer U> ? U : never

/**
 * Validation Utils
 */
export async function getValidationErrors<T extends object>({
  schema,
  data,
}: {
  schema: yup.ObjectSchema<T>
  data: T
}): Promise<Partial<Record<keyof T, string>>> {
  try {
    await schema.validate(data, { abortEarly: false })
    return {}
  } catch (err) {
    const errors: Partial<Record<keyof T, string>> = {}
    if (err instanceof yup.ValidationError) {
      err.inner.forEach((error) => {
        if (error.path && error.path in data) {
          errors[error.path as keyof T] = error.message
        }
      })
    }
    return errors
  }
}

export function hasValidationErrors(validation: { [key: string]: string }) {
  return Object.keys(validation).length > 0
}

type InferSchemaType<T extends yup.Schema<any>> =
  T extends yup.Schema<infer U> ? U : never

export function mapFormDataToSchema<T extends yup.Schema<any>>({
  formData,
  schema,
}: {
  formData: FormData
  schema: T
}): InferSchemaType<T> {
  const data: Record<string, any> = {}

  formData.forEach((value, key) => {
    // Handle checkboxes
    if (data[key] !== undefined) {
      if (Array.isArray(data[key])) {
        data[key].push(value)
      } else {
        data[key] = [data[key], value]
      }
    } else {
      // Handle radio buttons and other inputs
      data[key] = value
    }
  })

  // Convert checkbox values to boolean if necessary
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key]) && data[key].length === 1) {
      data[key] = data[key][0]
    }
  })

  return schema.cast(data, { assert: false, stripUnknown: true })
}
