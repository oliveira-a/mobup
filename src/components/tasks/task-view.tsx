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
import { TaskWithRelations } from '@/lib/types/task'
import { Pencil } from 'lucide-react'
import { useState } from 'react'

export default function TaskView({ task }: { task: TaskWithRelations }) {
  const [isEditMode, setIsEditMode] = useState(false)
  // todo: allow for edit mode

  function editButtonOnClick() {
    if (!isEditMode) {
      setIsEditMode(true)
      return
    }

    // todo: ensure user has not messed up with input here

    setIsEditMode(false)
  }

  return (
    <>
      <Card className='ml-50 mr-50 mb-5'>
        <CardContent>
          <div className='flex flex-row justify-between items-center'>
            {/* todo: show how long ago this task was created */}
            <h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-2xl'>
              Task #{task.id}
            </h1>
            {/* todo: show this button if the user owns this task */}
            <Button variant='ghost' onClick={() => editButtonOnClick()}>
              <Pencil />
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className='ml-50 mr-50'>
        <CardHeader>
          <CardTitle className='text-xl font-bold'>{task.title}</CardTitle>
          <CardDescription>by {task.user.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <h3 className='text-sm font-medium text-muted-foreground mb-2'>
              Summary
            </h3>
            <p>{task.summary}</p>
          </div>
        </CardContent>
        <CardFooter>
          <div>
            <h3 className='text-sm font-medium text-muted-foreground mb-2'>
              Tags
            </h3>
            <div className='flex flex-wrap gap-2'>
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
    </>
  )
}
