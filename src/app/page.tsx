import { Task } from "@/components/task"
import { cn } from "@/lib/utils";

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
      tags: ["Next.js", "Docker", "Windows"],
      jiraTicketUrl: new URL("https://quilter.atlassian.net/browse/D3IDEP-2496")
    },
    {
      createdBy: "Rob Smith",
      title: "Display a warning message when viewing performance/valuation history of a new portfolio/account",
      summary: "You're welcome to pair up with me on this task which involves some front-end work.",
      tags: ["Next.js", "TypeScript"]
    },
]
  return (
    <div className={cn("flex", "flex-row", "flex-wrap")}>
      {
        tasks.map((t, i) => (
          <Task key={i}
            createdBy={t.createdBy}
            title={t.title}
            summary={t.summary}
            tags={t.tags}
            jiraTicketUrl={t.jiraTicketUrl ?? null}
          />
        ))
      }
    </div>
  );
}
