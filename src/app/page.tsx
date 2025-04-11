import { TaskCard } from "@/components/task-card"
import * as actions from '@/actions'
import { CreateTaskForm } from "@/components/tasks/create-task-form";

export default async function Page() {
  const tasks = await actions.getTasks()

  return (
    <div>
      <div className="flex flex-row flex-wrap z-1">
        {
          tasks.map((t, i) => (
            <TaskCard key={i}
              createdBy={t.createdBy}
              title={t.title}
              summary={t.summary}
              tags={t.tags}
            />
          ))
        }
      </div>
      <CreateTaskForm />
    </div>
  );
}
