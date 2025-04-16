import postgres from 'postgres'
import bcrypt from 'bcrypt'

const sql = postgres(process.env.POSTGRES_CONN_STRING!)

async function seedTasks() {
  await sql`
        CREATE TABLE IF NOT EXISTS task (
            id uuid default gen_random_uuid() primary key,
            created_by text not null,
            title text not null,
            summary text not null,
            tags text[]
        )`

  await sql`
        INSERT INTO task (created_by, title, summary, tags)
        VALUES 
        (
            'John Doe',
            'Implement a new endpoint in the ODS API',
            'This task involves writing some typespec and some database querying!',
            ARRAY['C#', '.NET', 'SQL']
        ),
        (
            'Jane Doe',
            'Sort out Jane''s stuff so she can start development',
            'Involves setting up local environment on the teriyaki project.',
            ARRAY['Next.js', 'Docker', 'Windows']
        ),
        (
            'Rob Smith',
            'Display a warning message when viewing performance/valuation history of a new portfolio/account',
            'You''re welcome to pair up with me on this task which involves some front-end work.',
            ARRAY['Next.js', 'TypeScript']
        )`
}

async function createUser() {
  await sql`
        CREATE TABLE IF NOT EXISTS "user" (
            name text not null,
            email text not null primary key,
            password text not null
        )`

  const email = 'a@mobup.inc'
  const password = 'password123'
  const hashedPassword = await bcrypt.hash(password, 1)
  const name = 'Andre Brasil'
  await sql`
        INSERT INTO "user"(name, email, password)
        VALUES (${name}, ${email}, ${hashedPassword})
    `
}

export async function GET() {
  try {
    await seedTasks()
    await createUser()
    return Response.json({ message: 'Database seeded successfully' })
  } catch (error) {
    console.error(error)
    return Response.json({ error }, { status: 500 })
  }
}
