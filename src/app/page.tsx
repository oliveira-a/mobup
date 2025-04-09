'use client'

import { CreateTaskCard } from "@/components/create-task";
import { FloatingButton } from "@/components/floating-button";
import { Task } from "@/components/task"
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Task {
  createdBy: string,
  title: string,
  summary: string,
  tags: string[]
}

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      createdBy: "John Doe",
      title: "Implement a new endpoint in the ODS API",
      summary: "This tasks involves writing some typespec and some database querying!",
      tags: ["C#", ".NET", "SQL"],
    },
    {
      createdBy: "Jane Doe",
      title: "Sort out Jane's stuff so she can start development",
      summary: "Involves setting up local environemnt on the teriyaki project.",
      tags: ["Next.js", "Docker", "Windows"],
    },
    {
      createdBy: "Rob Smith",
      title: "Display a warning message when viewing performance/valuation history of a new portfolio/account",
      summary: "You're welcome to pair up with me on this task which involves some front-end work.",
      tags: ["Next.js", "TypeScript"],
    },
    {
      createdBy: "John Doe",
      title: "Implement a new endpoint in the ODS API",
      summary: "This tasks involves writing some typespec and some database querying!",
      tags: ["C#", ".NET", "SQL"],
    },
    {
      createdBy: "Jane Doe",
      title: "Sort out Jane's stuff so she can start development",
      summary: "Involves setting up local environemnt on the teriyaki project.",
      tags: ["Next.js", "Docker", "Windows"],
    },
    {
      createdBy: "Rob Smith",
      title: "Display a warning message when viewing performance/valuation history of a new portfolio/account",
      summary: "You're welcome to pair up with me on this task which involves some front-end work.",
      tags: ["Next.js", "TypeScript"],
    },
  ])
  
  const [addTask, toggleCreateTaskCard] = useState(false);

  const handleCreateTask = (createdBy: string, title: string, summary: string, tags: string[]) => {
    console.log(`createdBy: ${createdBy}, title: ${title}, summary: ${summary}, tags: ${tags}`)
    setTasks(prevTasks => [
      ...prevTasks,
      {
        createdBy,
        title,
        summary,
        tags,
      }
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
            <Task key={i}
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
