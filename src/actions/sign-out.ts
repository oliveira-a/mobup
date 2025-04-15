'use server'

import { signOut as serverSignOut } from '@/auth'

export async function signOut() {
    await serverSignOut()
    //    redirect(paths.logout())
}