import TaskView from '@/components/tasks/task-view'
import * as actions from '@/actions/getTaskWithRelationsById'
import getServerSession from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const task = await actions.getTaskWithRelationsById(Number(id))

  async function userOwnsThisTask() {
    const session = await getServerSession(authOptions)
    const auth = await session.auth()

    return auth.user.id === task.user.id
  }

  return (
    <>
      <TaskView task={task} userIsTaskOwner={await userOwnsThisTask()} />
    </>
  )
}
