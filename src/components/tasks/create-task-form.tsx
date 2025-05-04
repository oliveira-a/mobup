'use client'

import { SetStateAction, Dispatch, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import * as actions from '@/actions'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Toaster, toast } from 'sonner'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { X, Loader2 } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '../ui/alert'

const formSchema = yup.object({
  title: yup
    .string()
    .min(2, 'Title must be at least 2 characters.')
    .max(50, 'Title must not exceed 50 characters.')
    .required('Title is required.'),
  summary: yup
    .string()
    .min(10, 'Summary must be at least 10 characters.')
    .max(500, 'Summary must not exceeed 500 characters.')
    .required(),
  tags: yup
    .array()
    .of(yup.string())
    .min(1, 'Please add at least on tag.')
    .required('At least on tag must be provided.'),
})

type FormValues = yup.InferType<typeof formSchema>

type CreateTaskFormProps = {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

export const CreateTaskForm = ({
  modalOpen,
  setModalOpen,
}: CreateTaskFormProps) => {
  const [tagInput, setTagInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      title: '',
      summary: '',
      tags: [],
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    setServerError(null)

    try {
      await actions.createTask({
        title: data.title,
        summary: data.summary,
        tags: data.tags.filter((t) => t !== undefined),
      })

      form.reset()
      setModalOpen(false)

      toast.message('Your task has been added! 🎉')
    } catch (error) {
      const em =
        error instanceof Error ? error.message : 'An unexpected error occurred'
      setServerError(em)
      toast.error(em)
    } finally {
      setIsSubmitting(false)
    }
  }

  function addTag() {
    if (tagInput.trim() === '') return

    const currentTags = form.getValues('tags')
    if (!currentTags.includes(tagInput.trim())) {
      form.setValue('tags', [...currentTags, tagInput.trim()])
      form.trigger('tags')
    }

    setTagInput('')
  }

  function removeTag(tagToRemove: string | undefined) {
    const currentTags = form.getValues('tags')
    form.setValue(
      'tags',
      currentTags.filter((tag) => tag !== tagToRemove)
    )
    form.trigger('tags')
  }

  function handleTagKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new Task</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8 max-w-2xl'
            >
              {serverError && (
                <Alert variant='destructive' className='mb-6'>
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{serverError}</AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Task title' {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a clear and concise title for your task.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='summary'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Describe the task in detail...'
                        className='resize-y min-h-[120px]'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of what needs to be done.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='tags'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <div className='flex gap-2'>
                      <FormControl>
                        <Input
                          placeholder='Add a tag'
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={handleTagKeyDown}
                        />
                      </FormControl>
                      <Button
                        type='button'
                        variant='secondary'
                        onClick={addTag}
                      >
                        Add
                      </Button>
                    </div>
                    <FormDescription>
                      Add relevant tags to categorize your task.
                    </FormDescription>
                    <FormMessage />

                    <div className='flex flex-wrap gap-2 mt-3'>
                      {field.value.map((tag) => (
                        <div
                          key={tag}
                          className='flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm'
                        >
                          {tag}
                          <button
                            type='button'
                            onClick={() => removeTag(tag)}
                            className='text-secondary-foreground/70 hover:text-secondary-foreground'
                          >
                            <X size={14} />
                            <span className='sr-only'>Remove {tag} tag</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </FormItem>
                )}
              />

              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Creating...
                  </>
                ) : (
                  'Create Task'
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  )
}
