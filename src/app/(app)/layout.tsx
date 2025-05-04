import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import getServerSession from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import paths from '@/paths'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const serverSession = await getServerSession(authOptions)
  const authSession = await serverSession.auth()
  if (!authSession) {
    redirect(paths.login())
  }

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar user={authSession?.user} />
          <main className='w-full'>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  )
}
