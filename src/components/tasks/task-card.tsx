'use client'

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn, getInitials } from '@/lib/utils'
import { Tag } from '@/components/tag'
import { Task } from '@/lib/dtos'

interface TaskCardProps {
  task: Task
  onTitleClick?: (task: Task) => void
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
      <CardFooter className='text-sm flex flex-col'>
        <div className='flex flex-row'>
          <Avatar className='h-5 w-5 mr-1 grayscale'>
            <AvatarFallback className='text-xs'>
              {getInitials(task.owner.name)}
            </AvatarFallback>
          </Avatar>
          <span className='font-medium'>{task.owner.name}</span>
        </div>
        <div className='block flex flex-wrap gap-2 mt-2'>
          {task.tags.map((tag, i) => (
            <Tag key={i} name={tag} />
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}
