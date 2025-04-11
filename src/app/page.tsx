import { TaskCard } from "@/components/task-card"
import * as actions from '@/actions'
import { Task } from "@/lib/dtos";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "dashboard"
}

export default async function Page() {
  const tasks: Task[] = await actions.getTasks()

  return (
    <div className="flex flex-row flex-wrap z-1">
      {
        tasks.map((t, i) => (
          <TaskCard key={i}
            task={t}
          />
        ))
      }
    </div>
  );
}
