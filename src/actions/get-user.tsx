'use server'

import sql from '@/lib/db'
import { User } from '@/lib/dtos'

export async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User[]>`SELECT * FROM "user" WHERE email=${email}`;

        console.log(user)

        return user[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}
