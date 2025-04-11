interface TaskViewPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function TaskViewPage(props: TaskViewPageProps) {
  const id = (await props.params).id

  return <h1>This is where my task will go for {id}</h1>
}