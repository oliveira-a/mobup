import postgres from 'postgres'
import bcrypt from 'bcrypt'
import { User } from '@/lib/dtos'
import * as crypto from 'crypto'

const sql = postgres(process.env.POSTGRES_CONN_STRING!)

const users: User[] = [
  {
    id: crypto.randomUUID(),
    name: 'Jane Doe',
    email: 'jane@mobup.inc',
    password: await bcrypt.hash('jane123', 1),
  },
  {
    id: crypto.randomUUID(),
    name: 'Joe Doe',
    email: 'joe@mobup.inc',
    password: await bcrypt.hash('joe123', 1),
  },
  {
    id: crypto.randomUUID(),
    name: 'Andre Brasil',
    email: 'andre@mobup.inc',
    password: await bcrypt.hash('andre123', 1),
  },
]

async function seedTasks() {
  await sql`
        CREATE TABLE IF NOT EXISTS task (
            id serial,
            owner_id text not null,
            title text not null,
            summary text not null,
            tags text[]
        )`

  await sql`
        INSERT INTO task (owner_id, title, summary, tags)
        VALUES
        (
            ${users[0].id},
            'Implement a new endpoint in the ODS API',
            'This task involves writing some typespec and some database querying!',
            ARRAY['C#', '.NET', 'SQL']
        ),
        (
            ${users[1].id},
            'Sort out Jane''s stuff so she can start development',
            'Involves setting up local environment on the teriyaki project.',
            ARRAY['Next.js', 'Docker', 'Windows']
        ),
        (
            ${users[2].id},
            'Display a warning message when viewing performance/valuation history of a new portfolio/account',
            'You''re welcome to pair up with me on this task which involves some front-end work.',
            ARRAY['Next.js', 'TypeScript']
        )`
}

async function createUser() {
  await sql`
        CREATE TABLE IF NOT EXISTS "user" (
            id text not null primary key,
            name text not null,
            email text not null,
            password text not null
        )`

  users.forEach(async (u) => {
    console.log(u)
    await sql`
          INSERT INTO "user"(id, name, email, password)
          VALUES (${u.id}, ${u.name}, ${u.email}, ${u.password})
      `
  })
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
