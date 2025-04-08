import { Task } from "@/components/task"

export default function Page() {
  const tasks = [
    {
      createdBy: "John Doe",
      title: "Implement a new endpoint in the ODS API",
      summary: "This tasks involves writing some typespec and some database querying!",
      tags: ["C#", ".NET", "SQL"]
    },
    {
      createdBy: "Jane Doe",
      title: "Sort out Jane's stuff so she can start development",
      summary: "Involves setting up local environemnt on the teriyaki project.",
      tags: ["Next.js", "Docker", "Windows"]
    },
    {
      createdBy: "Rob Smith",
      title: "Display a warning message when viewing performance/valuation history of a new portfolio/account.",
      summary: "You're welcome to pair up with me on this task which involves some front-end work.",
      tags: ["Next.js", "TypeScript"]
    },
]
  return (
    <div>
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
  );
}
