'use client'

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Task } from '@prisma/client'

interface TaskCardProps {
  task: Task
  onTitleClick?: (task: Task) => void
}

export function TaskCard({ task, onTitleClick }: TaskCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle
            className='hover:underline cursor-pointer text-xl'
            onClick={() => onTitleClick(task)}
        >{task.title}</CardTitle>
        {task.user.name && <p className="text-sm text-muted-foreground mt-1">By {task.user.name}</p>}
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{task.summary}</p>
        <div className="flex flex-wrap gap-2">
          {task.tags.map((tag) => (
            <Badge key={tag.name} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
