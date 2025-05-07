'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { TaskWithRelations } from '@/lib/types/task'
import { Trash } from 'lucide-react'
import { useState, useRef } from 'react'
import * as actions from '@/actions'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'
import { useRouter } from 'next/navigation'
import paths from '@/paths'
import { useClickOutside } from '@/hooks/use-click-outside'

export default function TaskView({ task, userIsTaskOwner }: { task: TaskWithRelations, userIsTaskOwner: boolean }) {
  const router = useRouter()

  const [deleteTaskAlertOpen, setDeleteTaskAlertOpen] = useState(false)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingSummary, setIsEditingSummary] = useState(false)
  const [titleInput, setTitleInput] = useState(task.title)
  const [summaryInput, setSummaryInput] = useState(task.summary)

  const titleRef = useRef<HTMLInputElement>(null)
  useClickOutside(titleRef, () => updateTitle())

  const summaryRef = useRef<HTMLTextAreaElement>(null)
  useClickOutside(summaryRef, () => updateSummary())

  async function updateTitle() {
    // todo
    setIsEditingTitle(false)
  }

  async function updateSummary() {
    // todo
    setIsEditingSummary(false)
  }

  async function deleteTask() {
    await actions.deleteTask(task.id)

    router.push(paths.dashboard())
  }

  function styleAsOwner(style: string): string {
    return userIsTaskOwner ? `hover:boder-solid hover:border-2 ${style}` : style
  }

  return (
    <>
    {/* Task view header information */}
      <Card className='ml-50 mr-50 mb-5'>
        <CardContent>
          <div className='flex flex-row justify-between items-center'>
            <h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-2xl'>
              Task #{task.id}
            </h1>
            <div>
              <span>Last updated 3 days ago</span>
              {/* todo: show this button if the user owns this task */}
              { userIsTaskOwner &&
                <Button
                  className='ml-3 '
                  variant='destructive'
                  onClick={() => setDeleteTaskAlertOpen(true)}
                >
                  <Trash />
                  Delete
                </Button>
              }
            </div>
          </div>
        </CardContent>
      </Card>

      {/* task properties */}
      <Card className='ml-50 mr-50'>
        <CardHeader>
        { isEditingTitle ?
          <Input
            name='titleInput'
            ref={titleRef}
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            autoFocus
          />
          : <CardTitle
              className={styleAsOwner('text-xl font-bold')}
              onClick={() => {setIsEditingTitle(true)}}
            >
              {titleInput}
            </CardTitle>
        }
          <CardDescription>by {task.user.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <h3 className='text-sm font-medium text-muted-foreground mb-2'>
              Summary
            </h3>
            { isEditingSummary ?
              <Textarea
                ref={summaryRef}
                value={summaryInput}
                onChange={(e) => setSummaryInput(e.target.value)}
                autoFocus
              />
              : <p
                  className={styleAsOwner('')}
                  onClick={() => setIsEditingSummary(true)}
                >
                  {summaryInput}
                </p>
            }
          </div>
        </CardContent>

        <CardFooter>
          <div>
            <h3 className='text-sm font-medium text-muted-foreground mb-2'>
              Tags
            </h3>
            <div className={styleAsOwner('flex flex-wrap gap-2')}>
            {/* todo: add editable input here */}
              {task.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant='secondary'
                  className='flex items-center gap-1'
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>

      <AlertDialog open={deleteTaskAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteTaskAlertOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteTask()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
