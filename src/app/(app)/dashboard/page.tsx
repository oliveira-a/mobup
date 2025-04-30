import * as actions from '@/actions'
import { TasksDashboard } from '@/components/tasks/tasks-dashboard'

export default async function Page() {
  const tasks = await actions.getTasksWithRelations()

  return (
    <>
      <TasksDashboard tasks={tasks} />
    </>
  )
}
