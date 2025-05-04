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
import { TaskWithRelations } from '@/lib/types/task'
import { Pencil, Trash, Save } from 'lucide-react'
import { useState } from 'react'
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

export default function TaskView({ task }: { task: TaskWithRelations }) {
  const [deleteTaskAlertOpen, setDeleteTaskAlertOpen] = useState(false)
  const userIsTaskOwner = true

  const router = useRouter()

  async function deleteTask() {
    await actions.deleteTask(task.id)

    router.push(paths.dashboard())
  }

  function styleAsOwner(style: string): string {
    return userIsTaskOwner ? `hover:boder-solid hover:border-2 ${style}` : style
  }

  return (
    <>
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
      <Card className='ml-50 mr-50'>
        <CardHeader>
          <CardTitle
            className={styleAsOwner('text-xl font-bold')}
          >
          {task.title}
          </CardTitle>
          <CardDescription>by {task.user.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <h3 className='text-sm font-medium text-muted-foreground mb-2'>
              Summary
            </h3>
            <p className={styleAsOwner('')}>{task.summary}</p>
          </div>
        </CardContent>
        <CardFooter>
          <div>
            <h3 className='text-sm font-medium text-muted-foreground mb-2'>
              Tags
            </h3>
            <div className={styleAsOwner('flex flex-wrap gap-2')}>
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
