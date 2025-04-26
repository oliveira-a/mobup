import * as actions from '@/actions'
import { Task } from '@prisma/client'
import { TasksDashboard } from '@/components/tasks/tasks-dashboard'

export default async function Page() {
  const tasks: Task[] = await actions.getTasks()

  return (
    <>
      <TasksDashboard tasks={tasks} />
    </>
  )
}
