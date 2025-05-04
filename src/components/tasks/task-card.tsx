'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TaskWithRelations } from '@/lib/types/task'
import Link from 'next/link'

export const TaskCard = ({ task }: { task: TaskWithRelations }) => {
  return (
    <Card className='w-full'>
      <CardHeader>
        <Link href={`/tasks/${task.id}`}>
          <CardTitle className='hover:underline cursor-pointer text-xl'>
            {task.title}
          </CardTitle>
        </Link>
        {task.user.name && (
          <p className='text-sm text-muted-foreground mt-1'>
            By {task.user.name}
          </p>
        )}
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='text-sm text-muted-foreground'>{task.summary}</p>
        <div className='flex flex-wrap gap-2'>
          {task.tags.map((tag) => (
            <Badge key={tag.name} variant='secondary'>
              {tag.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
