'use client'

import { TaskCard } from '@/components/task-card'
import { Task } from '@/lib/dtos'
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
  SheetTitle
} from '@/components/ui/sheet'

interface TaskDashboardProps {
  tasks: Task[]
}

export function TasksDashboard(props: TaskDashboardProps) {
  return (
    <>
    <div className='flex flex-row flex-wrap z-1'>
      {props.tasks.map((t, i) => (
        <TaskCard key={i} task={t} />
      ))}
    </div>
    <Sheet>
    <SheetTrigger>Open</SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
  </>
  )
}
