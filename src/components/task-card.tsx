'use client'

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Tag } from './tag'
import { Task } from '@/lib/dtos'

interface TaskCardProps {
  task: Task
  onTitleClick?: () => void
}

export function TaskCard({ task, onTitleClick }: TaskCardProps) {
  return (
    <Card className='w-[300px] m-3 self-end'>
      <CardHeader>
        <div className='flex flex-row justify-between items-start text-sm'>
          <CardTitle
            className='hover:underline cursor-pointer'
            onClick={() => onTitleClick(task)}
          >
            {task.title}
          </CardTitle>
        </div>
        <CardDescription>{task.summary}</CardDescription>
      </CardHeader>
      <CardFooter className={cn('text-sm', 'flex', 'flex-col')}>
        <div className='block'>
          <p>
            Created by <b>{task.owner.name}</b>
          </p>
        </div>
        <div className={cn('block', 'flex', 'flex-wrap', 'gap-2', 'mt-2')}>
          {task.tags.map((tag, i) => (
            <Tag key={i} name={tag} />
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}
