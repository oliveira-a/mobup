'use client'

import { TaskCard } from '@/components/tasks/task-card'
import { TaskWithRelations } from '@/lib/types/task'

export function TasksDashboard({ tasks }: { tasks: TaskWithRelations[] }) {
  return (
    <>
      <div className='m-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {tasks.map((t, i) => (
          <TaskCard key={i} task={t} />
        ))}
      </div>
    </>
  )
}
