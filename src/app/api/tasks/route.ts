import { Task } from "@/lib/dtos/task"
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_CONN_STRING!)

const tasks: Task[] = [
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
    ]

export async function GET() {
    const tasks = await sql<Task[]>`
        SELECT title, summary, created_by, tags FROM task
    `
    return Response.json(tasks)
}

export async function POST(req: Request) {
    const body = await req.json()
    const task = {
        createdBy: body.createdBy,
        title: body.title,
        summary: body.summary,
        tags: body.tags,
    }

    await sql`
        INSERT INTO task(title, summary, created_by, tags)
        VALUES (${task.title}, ${task.summary}, ${task.createdBy}, ${task.tags})
    `

    return new Response(null, {
        status: 204
    })
}