import TaskView from "@/components/tasks/task-view"
import * as actions from '@/actions/getTaskWithRelationsById'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const task = await actions.getTaskWithRelationsById(Number(id))

  return (
    <>
      <TaskView task={task} />
    </>
  )
}
