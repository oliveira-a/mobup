'use client'

import { CreateTaskCard } from "@/components/create-task";
import { FloatingButton } from "@/components/floating-button";
import { TaskCard } from "@/components/task-card"
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Task } from "@/lib/dtos/task";

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([])
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("/api/tasks")
      const data = await res.json()

      setTasks(data)
    }

    fetchTasks()
  }, []);

  const [addTask, toggleCreateTaskCard] = useState(false)
  const handleCreateTask = async (createdBy: string, title: string, summary: string, tags: string[]) => {
    const newTask: Task = {
      createdBy: createdBy,
      title: title,
      summary: summary,
      tags: tags,
    }

    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    setTasks(prevTasks => [
      ...prevTasks,
      newTask
    ]);

    toggleCreateTaskCard(false)
  };

  return (
    <div>
      {addTask && (
        <div className="fixed inset-0 bg-gray-100 opacity-75 z-40" />
      )}
      <div className={cn("flex", "flex-row", "flex-wrap", "z-1")}>
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
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-50">
      {
          addTask ? <CreateTaskCard
            onCancelClick={() => toggleCreateTaskCard(false)}
            onCreateClick={handleCreateTask}
          /> : null
      }
      </div>
      <FloatingButton className="z-1" onClick={() => toggleCreateTaskCard(true)} />
    </div>
  );
}
