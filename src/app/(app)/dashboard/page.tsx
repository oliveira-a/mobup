import * as actions from '@/actions'
import { Task } from '@/lib/dtos'
import { TasksDashboard } from '@/components/tasks-dashboard'

export default async function Page() {
  const tasks: Task[] = await actions.getTasks()

  return (
    <>
      <TasksDashboard tasks={tasks} />
    </>
  )
}
