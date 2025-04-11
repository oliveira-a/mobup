import { Task } from "@/lib/dtos"
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_CONN_STRING!)

export async function GET() {
    // We need to create something to get all tasks

    const tasks = await sql<Task[]>`
        SELECT id, title, summary, created_by, tags FROM task
    `
    return Response.json(tasks)
}

export async function POST(req: Request) {
    // We need to create something that will
    // Listen to a form submission
    // Do the post
    // Automagically refresh the page so you see your new task appear

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