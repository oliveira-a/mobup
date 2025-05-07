'use client'

import * as React from 'react'
import { ArrowUpCircleIcon, LayoutDashboardIcon } from 'lucide-react'
import { NavMain } from '@/components/nav/nav-main'
import { NavUser } from '@/components/nav/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import paths from '@/paths'
import { User } from 'next-auth'
import Link from 'next/link'

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: paths.dashboard(),
      icon: LayoutDashboardIcon,
    },
  ],
}

export function AppSidebar({ user }: { user: User | undefined }) {
  return (
    <>
      <Sidebar collapsible='offcanvas'>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className='data-[slot=sidebar-menu-button]:!p-1.5 hover:!bg-transparent'
              >
                <Link href={paths.dashboard()}>
                  <img src="/logo.png" alt="Mobup logo" width={100} />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain user={user} items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
